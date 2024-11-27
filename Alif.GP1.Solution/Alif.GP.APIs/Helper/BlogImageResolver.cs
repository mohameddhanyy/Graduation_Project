using Alif.API.DTOs;
using Alif.Core.DTOs;
using Alif.Core.Entities;
using Alif.GP.APIs.DTOs;
using AutoMapper;

namespace Alif.GP.APIs.Helper
{
    public class BlogImageResolver : IValueResolver<Blog, BlogDto, string>
    {

        private readonly IConfiguration configuration;

        public BlogImageResolver(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public string Resolve(Blog source, BlogDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.BImage))
                return $"{configuration["ApiBaseUrl"] + "/images"}/{source.BImage}";
            return string.Empty;
        }
    }
}
