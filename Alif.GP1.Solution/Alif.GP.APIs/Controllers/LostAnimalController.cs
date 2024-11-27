using Alif.API.UserDto;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications.AnimalSpecs;
using Alif.GP.APIs.Controllers;
using Alif.GP.APIs.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;


namespace Alif.API.Controllers
{

    public class LostAnimalController : BaseApiController
    {

        private readonly IGenericRepository<LostAnimal> _lostAnimalReposatory;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Animals> _animalsRepository;
        private readonly IWebHostEnvironment _env;
        private readonly IMemoryCache _cache;
        private readonly IImageAnalysisService _imageAnalysisService;

        public LostAnimalController(IGenericRepository<LostAnimal> lostAnimalRepository, IMapper mapper, IGenericRepository<Animals> animalsRepository, IWebHostEnvironment env, IMemoryCache cache, IImageAnalysisService imageAnalysisService)
        {
            _lostAnimalReposatory = lostAnimalRepository;
            _mapper = mapper;
            _animalsRepository = animalsRepository;
            _env = env;
            _cache = cache;
            _imageAnalysisService = imageAnalysisService;
        }
        // GET: api/<LostAnimalController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LostAnimalDTO>>> GetAll()
        {
            var spec = new LostAnimalwithUserAndImage();
            var animals = await _lostAnimalReposatory.GetAllWithSpecAsync(spec);
            return Ok(_mapper.Map<IEnumerable<LostAnimal>, IEnumerable<LostAnimalDTO>>(animals));


        }



        // GET api/LostAnimal/3
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<LostAnimalDTO>> GetById(int id)
        {
            var spec = new LostAnimalwithUserAndImage(id);
            var animal = await _lostAnimalReposatory.GetWithSpecAsync(spec);

            if (animal == null)
                return NotFound();


            return Ok(_mapper.Map<LostAnimal, LostAnimalDTO>(animal));

        }

        // POST api/<LostAnimalController>
        // POST api/<LostAnimalController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CreatedLostAnimal>> CreateLostAnimal([FromForm] CreatedLostAnimal lostanimalDto)
        {
            try
            {
                var animal = _mapper.Map<CreatedLostAnimal, LostAnimal>(lostanimalDto);

                // Assign user ID from token
                var userIdFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                animal.AppUserId = userIdFromToken;

                // Handle file upload
                if (lostanimalDto.LostAnimalImage != null && lostanimalDto.LostAnimalImage.Length > 0)
                {
                    // Validate and move file to wwwroot if necessary
                    string filePath;
                    string fileName;
                    if (!IsImageInWwwRoot(lostanimalDto.LostAnimalImage.FileName))
                    {
                        // File uploaded from wwwroot
                        fileName = Path.GetFileName(lostanimalDto.LostAnimalImage.FileName);
                        filePath = Path.Combine("wwwroot/images", fileName);
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await lostanimalDto.LostAnimalImage.CopyToAsync(fileStream);
                        }
                        
                    }
                    else
                    {
                        // File uploaded from elsewhere, move to wwwroot
                        fileName = Guid.NewGuid().ToString() + Path.GetExtension(lostanimalDto.LostAnimalImage.FileName);
                        filePath = Path.Combine(_env.WebRootPath, "images", fileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await lostanimalDto.LostAnimalImage.CopyToAsync(fileStream);
                        }
                    }

                    // Check if the file exists in wwwroot
                    if (System.IO.File.Exists(filePath))
                    {
                        var analysisResult = await GetImageAnalysisResultAsync(filePath);

                        // Check if the analysis result is cached
                        if (!_cache.TryGetValue<bool>(analysisResult, out var isDuplicate))
                        {
                            // Not cached, retrieve existing lost animals and perform duplicate check
                            var existingLostAnimals = await _lostAnimalReposatory.GetAllAsync();
                            foreach (var existingAnimal in existingLostAnimals)
                            {
                                    var existingImagePath = Path.Combine(_env.WebRootPath, "images", existingAnimal.LostAnimalImage);
                                    if (!System.IO.File.Exists(existingImagePath)) continue;

                                    var existingAnalysisResult = await GetImageAnalysisResultAsync(existingImagePath);
                                    if (existingAnalysisResult == analysisResult)
                                    {
                                        // Cache the result
                                        _cache.Set(analysisResult, true, TimeSpan.FromMinutes(10));
                                        return BadRequest("This lost animal image already exists in the database.");
                                    }
                                
                            }
                           // Retrieve existing animals and perform duplicate check
                           var existingAnimals = await _animalsRepository.GetAllAsync();
                           foreach (var existingAnimal in existingAnimals)
                           {
                               var existingImagePath = Path.Combine("wwwroot/images", existingAnimal.AnimalIamge);
                               if (!System.IO.File.Exists(existingImagePath)) continue;
                               var existingAnalysisResult = await GetImageAnalysisResultAsync(existingImagePath);
                               if (existingAnalysisResult == analysisResult)
                               {
                                   // Cache the result
                                   _cache.Set(analysisResult, true, TimeSpan.FromMinutes(10));
                                   // Delete the temporary file
                                   return BadRequest("This lost animal already exists here, please check lost animals or browse list of animals adoption.");
                               }
                           }
                            _cache.Set(analysisResult, false, TimeSpan.FromMinutes(10));
                        }
                        else
                        {
                            return BadRequest("This lost animal already exists here, please check lost animals or browse list of animals adoption.");
                        }

                        // Set the file name in wwwroot/images as the stored image path
                        animal.LostAnimalImage = fileName;
                    }
                    else
                    {
                        return BadRequest("The provided image path does not exist in wwwroot.");
                    }
                }

                // Save the lost animal record
                await _lostAnimalReposatory.AddAsync(animal);

                // Map back to DTO for response
                var animalResponseDto = _mapper.Map<LostAnimal, LostAnimalDTO>(animal);

                return CreatedAtAction(nameof(GetById), new { id = animal.Id }, animalResponseDto);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return a meaningful error message
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        private bool IsImageInWwwRoot(string fileName)
        {
            // Check if the file path starts with "images/" indicating it is within wwwroot/images
            return !string.IsNullOrEmpty(fileName) && fileName.StartsWith("images/");
        }
        private async Task<string> GetImageAnalysisResultAsync(string imagePath)
        {
            using (var imageStream = new FileStream(imagePath, FileMode.Open))
            {
                return await _imageAnalysisService.AnalyzeImageAsync(imageStream);
            }
        }

    }
}