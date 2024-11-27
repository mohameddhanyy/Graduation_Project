using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.ServiceContract;
using Alif.GP.APIs.Extinsion;
using Alif.Repository;
using Alif.Repository.Data;
using Alif.Service;
using E_Commerce.Extentions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using System.Security.Principal;

namespace Admin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddDbContext<AlifContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });


            builder.Services.AddScoped<IGenericRepository<BaseEntity>, GenericRepository<BaseEntity>>();

            builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                        .AddEntityFrameworkStores<AlifContext>();

            //builder.Services.AddIdentityServices(builder.Configuration);
            builder.Services.AddApplicationSevice();

            var app = builder.Build();



            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();//requet
            app.UseAuthorization();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Account}/{action=TestLogIn}/{id?}");

            app.Run();
        }
    }
}