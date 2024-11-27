using Alif.Core.Entities;
using Alif.Core.ServiceContract;
using Alif.Repository.Data;
using Alif.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Alif.GP.APIs.Extinsion
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration configuration ) 
        {
            services.AddScoped(typeof(IAuthService), typeof(AuthService));

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                //options.Password.RequiredUniqueChars = 2;
                //options.Password.RequireNonAlphanumeric = true;
                // options.Password.RequireLowercase = true;
                // options.Password.RequireUppercase = true;
                //options.Password.RequireDigit  = false;     

            }).AddEntityFrameworkStores<AlifContext>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;// عشان مش كل مره هحدد shcema قوق api
            }) // UserManger  //SigninManger / RoleManger
               //Bearer is default schem a
                  .AddJwtBearer(options =>
                  {
                      // Configure Authentication Handler  for schema
                      options.TokenValidationParameters = new TokenValidationParameters()
                      {
                          ValidateAudience = true,
                          ValidAudience = configuration["JWT:ValidAudience"],
                          ValidateIssuer = true,
                          ValidIssuer = configuration["JWT:ValidIssuer"],
                          ValidateIssuerSigningKey = true,
                          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(configuration["JWT:SecretKey"])),
                          ValidateLifetime = true,
                          ClockSkew = TimeSpan.FromHours(double.Parse(configuration["JWT:DurationInHours"]))

                      };
                  });
            return services;

            

        }
       
    }
}
