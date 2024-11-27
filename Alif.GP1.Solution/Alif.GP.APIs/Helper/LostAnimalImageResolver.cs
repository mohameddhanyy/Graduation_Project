using Alif.API.UserDto;
using Alif.Core.Entities;
using AutoMapper;

namespace Alif.GP.APIs.Helper
{
    public class LostAnimalImageResolver:IValueResolver<LostAnimal,LostAnimalDTO,string>
    {
        private readonly IConfiguration _configuration;

        public LostAnimalImageResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Resolve(LostAnimal source, LostAnimalDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.LostAnimalImage))
                return $"{_configuration["ApiBaseUrl"]}/images/{source.LostAnimalImage}";

            return string.Empty;
        }
    }
}

