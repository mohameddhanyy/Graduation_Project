using Alif.API.UserDto;
using Alif.Core.Entities;
using Alif.GP.APIs.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace Alif.GP.APIs.Helper
{
    public class AnimalImagesResolver : IValueResolver<Animals, AnimalDto, string>
    {
        private readonly IConfiguration configuration;

        public AnimalImagesResolver(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string Resolve(Animals source, AnimalDto destination, string destMember, ResolutionContext context)
        {
            //var userIdFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(source.AnimalIamge))
                return $"{configuration["ApiBaseUrl"]+"/images"}/{source.AnimalIamge}";
            return string.Empty ;
        }
        

    }
}
