using Alif.API.DTOs;
using Alif.Core.DTOs;
using Alif.Core.Entities;
using AutoMapper;

namespace Alif.GP.APIs.Helper
{
    public class ShelterImageResolver : IValueResolver<Shelter, ShelterDTO, string>
    {
        private readonly IConfiguration configuration;

        public ShelterImageResolver(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public string Resolve(Shelter source, ShelterDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Image))
                return $"{configuration["ApiBaseUrl"] + "/images"}/{source.Image}";
            return string.Empty;
        }
    }
}
