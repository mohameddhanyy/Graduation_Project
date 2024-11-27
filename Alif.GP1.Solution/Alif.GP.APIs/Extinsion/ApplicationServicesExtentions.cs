using Alif.Core.RepositoryContract;
using Alif.GP.APIs.Errors;
using Alif.GP.APIs.Helper;
using Alif.Repository;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Extentions
{
    public static class ApplicationServicesExtentions
    {
        public static  IServiceCollection AddApplicationSevice( this IServiceCollection services)
        {
            //builder.Services.AddScoped<IGenericRepository<Animal>,GenericRepository<Animal>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped(typeof(IUserAdaptRepo<>), typeof(UserAdaptRepo<>));
            //builder.Services.AddAutoMapper(M => M.AddProfile(new MappingProfile()));
            services.AddAutoMapper(typeof(MappingProfile));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (actionContext) =>
                {
                    var error = actionContext.ModelState.Where(p => p.Value.Errors.Count() > 0).SelectMany(p => p.Value.Errors).Select(E => E.ErrorMessage).ToArray();
                    var validationError = new ApiValidationErrorResponse()
                    {
                        Errors = error
                    };

                    return new BadRequestObjectResult(validationError);


                };
            }); ; // validation error configuration change default behavior
            return services;
        
        }

    }
}
