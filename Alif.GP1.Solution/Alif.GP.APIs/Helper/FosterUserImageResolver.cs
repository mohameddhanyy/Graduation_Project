using Alif.API.DTOs;
using Alif.API.UserDto;
using Alif.Core.Entities;
using AutoMapper;

namespace Alif.GP.APIs.Helper
{
    public class FosterUserImageResolver : IValueResolver<Foster, FosterDTO, string>
    {
        private readonly IConfiguration configuration;

        public FosterUserImageResolver(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public string Resolve(Foster source, FosterDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Image))
                return $"{configuration["ApiBaseUrl"] + "/images"}/{source.Image}";
            return string.Empty;
        }
    }
}