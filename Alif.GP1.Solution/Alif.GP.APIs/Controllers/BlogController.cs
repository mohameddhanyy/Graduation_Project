using Alif.API.DTOs;
using Alif.Core.DTOs;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications.AnimalSpecs;
using Alif.GP.APIs.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Alif.API.Controllers
{

    public class BlogController : BaseApiController
    {
        private readonly IGenericRepository<Blog> _blogRepository;
        private readonly IMapper _mapper;

        public BlogController(IGenericRepository<Blog> blogRepository,IMapper mapper)
        {
            _blogRepository = blogRepository;
            _mapper = mapper;
        }

        // GET: api/blog
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDto>>> GetAll()
        {
            
            var fosters = await _blogRepository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<Blog>, IEnumerable<BlogDto>>(fosters));


        }



        // GET api/blog/3
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDto>> GetById(int id)
        {
            var blog = await _blogRepository.GetAsync(id);

            if (blog == null)
                return NotFound();


            return Ok(_mapper.Map<Blog, BlogDto>(blog));

        }
    }
}
