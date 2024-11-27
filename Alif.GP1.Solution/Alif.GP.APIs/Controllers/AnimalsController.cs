using Alif.API.UserDto;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications.AnimalSpecs;
using Alif.GP.APIs.DTOs;
using Alif.GP.APIs.Errors;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;

namespace Alif.GP.APIs.Controllers
{
    //[Authorize]
    public class AnimalsController : BaseApiController
    {
        private readonly IGenericRepository<Animals> _animalRepo;
        private readonly IUserAdaptRepo<AdaptAnimal> _adaptRepo;


        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        private readonly IImageAnalysisService _imageAnalysisService;
        private readonly IMemoryCache _cache;

        public AnimalsController(IGenericRepository<Animals> animalRepo,
                                 IUserAdaptRepo<AdaptAnimal> adaptRepo,IMapper mapper, IWebHostEnvironment env, IImageAnalysisService imageAnalysisService, IMemoryCache cache)
        {
            _animalRepo = animalRepo;
            _adaptRepo = adaptRepo;

            _mapper = mapper;
            _env = env;
            _imageAnalysisService = imageAnalysisService;
            _cache = cache;
        }

        

        // GET: api/Animal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnimalDto>>> GetAllAnimal()
        {
            
            var spec = new AnimalWithTypeAndImagesSpecification();
            var animals = await _animalRepo.GetAllWithSpecAsync(spec);     

            return Ok(_mapper.Map<IEnumerable<Animals>,IEnumerable<AnimalDto>>(animals));
        }



        // GET api/Animal/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AnimalDto>> GetAnimalById(int id)
        {
            var spec = new AnimalWithTypeAndImagesSpecification(id);
            var animal = await _animalRepo.GetWithSpecAsync(spec);

            if (animal == null)       
                return NotFound();
            

            return Ok(_mapper.Map<Animals,AnimalDto>(animal));
        }

        #region test
        //post//api/Animal
        //  [Authorize]
        //[HttpPost]
        //[Authorize]
        //public async Task<ActionResult<CreateAnimalDto>> CreateAnimal([FromBody] CreateAnimalDto animalDto)
        //{
        //    var animal = _mapper.Map<CreateAnimalDto, Animals>(animalDto);
        //    var userIdFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        //    var A = await _animalRepo.GetAsync(40);

        //    animal.AppUserId = A.AppUserId;

        //    var imagePath = Path.Combine("wwwroot/images", animalDto.AnimalIamge);
        //    if (!System.IO.File.Exists(imagePath))
        //    {
        //        return BadRequest("Image file does not exist.");
        //    }

        //    using (var imageStream = new FileStream(imagePath, FileMode.Open))
        //    {
        //        var analysisResult = await _imageAnalysisService.AnalyzeImageAsync(imageStream);
        //        var existingAnimals = await _animalRepo.GetAllAsync();

        //        foreach (var existingAnimal in existingAnimals)
        //        {
        //            var existingImagePath = Path.Combine("wwwroot/images", existingAnimal.AnimalIamge);
        //            if (!System.IO.File.Exists(existingImagePath)) continue;

        //            using (var existingImageStream = new FileStream(existingImagePath, FileMode.Open))
        //            {
        //                var existingAnalysisResult = await _imageAnalysisService.AnalyzeImageAsync(existingImageStream);
        //                if (existingAnalysisResult == analysisResult)
        //                {
        //                    return BadRequest("This animal image already exists in the database.");
        //                }
        //            }
        //        }
        //    }

        //    await _animalRepo.AddAsync(animal);

        //    var animalResponseDto = _mapper.Map<Animals, CreateAnimalDto>(animal);
        //    return CreatedAtAction(nameof(GetAnimalById), new { id = animal.Id }, animalResponseDto);
        //}

        #endregion    



        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CreateAnimalDto>> CreateAnimal([FromForm] CreateAnimalDto animalDto)
        {
            try
            {
                var animal = _mapper.Map<CreateAnimalDto, Animals>(animalDto);

                // Assign user ID from token
                var userIdFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                animal.AppUserId = userIdFromToken;

                if (animalDto.AnimalIamge != null && animalDto.AnimalIamge.Length > 0)
            {
                // Validate and move file to wwwroot if necessary
                string filePath;
                string fileName;
                if (!IsImageInWwwRoot(animalDto.AnimalIamge.FileName))
                {
                    // File uploaded from wwwroot
                    fileName = Path.GetFileName(animalDto.AnimalIamge.FileName);
                    filePath = Path.Combine("wwwroot/images", fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await animalDto.AnimalIamge.CopyToAsync(fileStream);
                    }

                }
                else
                {
                    // File uploaded from elsewhere, move to wwwroot
                    fileName = Guid.NewGuid().ToString() + Path.GetExtension(animalDto.AnimalIamge.FileName);
                    filePath = Path.Combine(_env.WebRootPath, "images", fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await animalDto.AnimalIamge.CopyToAsync(fileStream);
                    }
                }


                    if (System.IO.File.Exists(filePath))
                    {
                        var analysisResult = await GetImageAnalysisResultAsync(filePath);

                        // Check if the analysis result is cached
                        if (!_cache.TryGetValue<bool>(analysisResult, out var isDuplicate))
                        {
                            // Not cached, retrieve existing lost animals and perform duplicate check
                            var existingLostAnimals = await _animalRepo.GetAllAsync();
                            foreach (var existingAnimal in existingLostAnimals)
                            {
                                var existingImagePath = Path.Combine(_env.WebRootPath, "images", existingAnimal.AnimalIamge);
                                if (!System.IO.File.Exists(existingImagePath)) continue;

                                var existingAnalysisResult = await GetImageAnalysisResultAsync(existingImagePath);
                                if (existingAnalysisResult == analysisResult)
                                {
                                    // Cache the result
                                    _cache.Set(analysisResult, true, TimeSpan.FromMinutes(10));
                                    return BadRequest("This animal image already exists in the database.");
                                }

                            }
                        }
                        else
                        {
                            return BadRequest("This animal image already exists in the database.");
                        }
                        animal.AnimalIamge = fileName;

                    }
                    else
                    {
                        return BadRequest("The provided image path does not exist in wwwroot.");
                    }
                }


                // Save the lost animal record

                await _animalRepo.AddAsync(animal);

                var animalResponseDto = _mapper.Map<Animals, AnimalDto>(animal);
                return CreatedAtAction(nameof(GetAnimalById), new { id = animal.Id }, animalResponseDto);
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





        // POST: /api/Animal/Adapt
        [Authorize]
        [HttpPost("Adapt/{id}")]
        public async Task<ActionResult<UserAdaptAnimalDto>> AdaptAnimal(int id,[FromBody] UserAdaptAnimalDto adaptAnimalDto)
        {
            // Validation

            var animal = _mapper.Map<UserAdaptAnimalDto, AdaptAnimal>(adaptAnimalDto);
            var userIdFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            animal.AppUserId = userIdFromToken;
            
            var animalid=await _animalRepo.GetAsync(id);
            
            animal.AnimalId = animalid.Id;

            
            await _adaptRepo.AddAsync(animal);
            var adaptDto = _mapper.Map<AdaptAnimal, UserAdaptAnimalDto>(animal);

            return CreatedAtAction(nameof(GetAnimalById), new { id = animal.AnimalId }, adaptDto);
        }






    }
}
