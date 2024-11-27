using Alif.Core.DTOs;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Alif.GP.APIs.Controllers
{
    
    public class ShelterController : BaseApiController
    {
        
        
            private readonly IGenericRepository<Shelter> _shelterRepository;
            private readonly IMapper _mapper;

            public ShelterController(IGenericRepository<Shelter> shelterRepository, IMapper mapper)
            {
                _shelterRepository = shelterRepository;
                _mapper = mapper;
            }

            // GET: api/shelter

            [HttpGet]
            public async Task<ActionResult<IEnumerable<ShelterDTO>>> GetAll()
            {

                var shelter = await _shelterRepository.GetAllAsync();
                return Ok(_mapper.Map<IEnumerable<Shelter>, IEnumerable<ShelterDTO>>(shelter));


            }



            // GET api/shelter/3
            [HttpGet("{id}")]
            public async Task<ActionResult<ShelterDTO>> GetById(int id)
            {
                var shelter = await _shelterRepository.GetAsync(id);

                if (shelter == null)
                    return NotFound();


                return Ok(_mapper.Map<Shelter, ShelterDTO>(shelter));

            }
     }
    
}
