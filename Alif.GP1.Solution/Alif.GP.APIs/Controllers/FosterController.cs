using Alif.API.DTOs;
using Alif.API.UserDto;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications.AnimalSpecs;
using Alif.GP.APIs.Controllers;
using Alif.GP.APIs.DTOs;
using Alif.GP.APIs.Helper;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Alif.API.Controllers
{

    public class FosterController : BaseApiController
    {
        private readonly IGenericRepository<Foster> _fosterRepository;
        private readonly IMapper _mapper;

        public FosterController(IGenericRepository<Foster> fosterRepository,IMapper mapper)
        {
            _fosterRepository = fosterRepository;
            _mapper = mapper;
        }

        // GET: api/<FosterController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FosterDTO>>> GetAll()
        {
            var spec = new FasterWithUserSpecification();
            var fosters = await _fosterRepository.GetAllWithSpecAsync(spec);
            return Ok(_mapper.Map<IEnumerable<Foster>, IEnumerable<FosterDTO>>(fosters));


        }



        // GET api/Foster/3
        [HttpGet("{id}")]
        public async Task<ActionResult<FosterDTO>> GetById(int id)
        {
            var spec = new FasterWithUserSpecification(id);
            var foster = await _fosterRepository.GetWithSpecAsync(spec);

            if (foster == null)
                return NotFound();


            return Ok(_mapper.Map<Foster, FosterDTO>(foster));

        }

        // POST api/Foster
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CreateFosterDto>> Create([FromForm] CreateFosterDto fosterDto)
        {
            try
            {
                var foster = _mapper.Map<CreateFosterDto, Foster>(fosterDto);

                var userIdFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                foster.AppUserId = userIdFromToken;

                if (fosterDto.Image != null && fosterDto.Image.Length > 0)
                {
                    string filePath;
                    string fileName;

                    // Generate a unique file name and determine the file path
                    fileName = Path.GetFileName(fosterDto.Image.FileName);
                    filePath = Path.Combine("wwwroot/images", fileName);

                    // Save the file to the specified path
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await fosterDto.Image.CopyToAsync(fileStream);
                    }

                    // Set the file path in the database entity
                    foster.Image = fileName;
                }

                await _fosterRepository.AddAsync(foster);

                var fosterResponseDto = _mapper.Map<Foster, FosterDTO>(foster);
                return CreatedAtAction(nameof(GetById), new { id = foster.Id }, fosterResponseDto);
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
