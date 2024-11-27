using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.ServiceContract;
using Alif.GP.APIs.Errors;
using Alif.GP.APIs.Extinsion;
using Alif.GP.APIs.Helper;
using Alif.GP.APIs.Middleware;
using Alif.Repository;
using Alif.Repository.Data;
using Alif.Service;
using E_Commerce.Extentions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;

namespace Alif.GP.APIs
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            
            var builder = WebApplication.CreateBuilder(args);
            
           

            // Add services to the container.

            builder.Services.AddControllers();
            // Register Required Web APIs Services to the DI Contaier



            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AlifContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            builder.Services.AddAutoMapper(typeof(StartupBase));
            builder.Services.AddIdentityServices(builder.Configuration);
            builder.Services.AddApplicationSevice();
            //builder.Services.AddScoped(IUserAdaptRepo<UserAdaptRepo>, UserAdaptRepo<UserAdaptRepo>();
            builder.Services.AddTransient<IImageAnalysisService, ImageAnalysisService>();
            builder.Services.AddMemoryCache();

            builder.Services.AddCors(options => 
            {
                options.AddPolicy("MyPolicy", options =>
                {
                    options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(builder.Configuration["FrontBaseUrl"]);
                });

            });
                 var app = builder.Build();
            //await ApplaySeeding.ApplaySeedingAsync(app);
            using var scope =app.Services.CreateScope();

            var services =scope.ServiceProvider;

            var _AlifContext = services.GetRequiredService<AlifContext>();
            //ask clr for creating obj from db Explicity
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger<Program>();
            try
            {
                
                await _AlifContext.Database.MigrateAsync();
                var _usermanager = services.GetRequiredService<UserManager<ApplicationUser>>();
                await AppIdentityContextSeed.SeedUserAsync(_usermanager);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "an error has been occured during apply the migration");
            }

            #region middlware

            app.UseMiddleware<ExceptionMiddleware>();
            // Configure the HTTP request pipeline.
            /*app.Use(async (httpContext, next) =>
            {
                try
                {
                    await next(httpContext);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, ex.Message);
                    // Log  Exception in Database [Production]
                    httpContext.Response.ContentType = "appliction/json";
                    httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    var response = builder.Environment.IsDevelopment() ?
                        new ApiExceptionResponse((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString())

                       : new ApiExceptionResponse((int)HttpStatusCode.InternalServerError);
                    var option = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }; // to make it camelcase  so javaScript can read it

                    var json = JsonSerializer.Serialize(response, option);

                    await httpContext.Response.WriteAsync(json);
                }

            });*/
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseStatusCodePagesWithReExecute("/errors/{0}");
            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseCors("MyPolicy");

            app.MapControllers();

            app.UseAuthentication();

            app.UseAuthorization();


            #endregion

            app.Run();
        }
    }
}