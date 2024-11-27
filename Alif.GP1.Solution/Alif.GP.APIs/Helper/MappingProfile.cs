using Alif.API.DTOs;
using Alif.API.UserDto;
using Alif.Core.DTOs;
using Alif.Core.Entities;
using Alif.GP.APIs.DTOs;
using AutoMapper;

namespace Alif.GP.APIs.Helper
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<Animals, AnimalDto>()
                //destination           //source 
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Type.Name))
                .ForMember(a => a.User, o => o.MapFrom(s => s.User.UserName))
                //.ForMember(d => d.AnimalImages, o => o.MapFrom(s => $"{"https://localhost:7195"}/{s.AnimalImages}"));
                .ForMember(d => d.AnimalIamge, o => o.MapFrom<AnimalImagesResolver>());


            CreateMap<CreateAnimalDto, Animals>()
                .ForMember(dest => dest.AnimalIamge, opt => opt.Ignore()); // Ignoring LostAnimalImage here if handled separately
            //.ForMember(dest=>dest.AppUserId,opt=>opt.MapFrom(src=>src.User.Claims.FirstOrDefault(c => c.Type == C))
            CreateMap<UserAdaptAnimalDto, AdaptAnimal>()
              //.ForMember(d => d.AnimalId, opt => opt.MapFrom(s => s.AnimalId))
              //.ForMember(dest=>dest.AppUserId,opt=>opt.MapFrom(src=>src.User.Claims.FirstOrDefault(c => c.Type == C))
              .ReverseMap();
            CreateMap<LostAnimal, LostAnimalDTO>()
                .ForMember(
                    dest => dest.LostAnimalImage,
                    opt => opt.MapFrom<LostAnimalImageResolver>()
                )
                .ForMember(
                    dest => dest.user,
                    opt => opt.MapFrom(src => src.user.UserName)
                );

            // Mapping from CreatedLostAnimal to LostAnimal
            CreateMap<CreatedLostAnimal, LostAnimal>()
                .ForMember(dest => dest.LostAnimalImage, opt => opt.Ignore()); // Ignoring LostAnimalImage here if handled separately

            CreateMap<Foster, FosterDTO>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.User.UserName))
                .ForMember(d => d.Image, o => o.MapFrom<FosterUserImageResolver>())
                .ReverseMap();

            CreateMap<CreateFosterDto, Foster>()

                .ReverseMap();

            CreateMap<Blog, BlogDto>()

               .ForMember(d => d.Image, o => o.MapFrom<BlogImageResolver>());



            CreateMap<Shelter, ShelterDTO>()
               .ForMember(d => d.ShelterName, o => o.MapFrom(s => s.SName))
               .ForMember(d => d.Image, o => o.MapFrom<ShelterImageResolver>());
        }


    }


}
