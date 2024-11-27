using Alif.Core.DTOs;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications.Videos;
using Alif.GP.APIs.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Alif.GP.APIs.Controllers
{
    
    public class VideoController : BaseApiController
    {
       
        private readonly IGenericRepository<Video> _videoRepository;

        public VideoController(IGenericRepository<Video> videoRepository)
        {
            
            _videoRepository = videoRepository;
        }

        // GET api/videos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoDto>>> GetVideos()
        {
           //var spec = new VideoSpecification();
            var videos= await _videoRepository.GetAllAsync();
            var videoDto = new List<VideoDto>();

            foreach (var video in videos)
            {
                string baseUrl = Request.Scheme + "://" + Request.Host + "/" + "videos/";
                string fullvideoUrl = baseUrl + video.VideoUrl;
                videoDto.Add(new VideoDto
                {
                    CourseId = video.CourseId,
                    VideoTitle = video.VideoTitle,
                    VideoUrl = fullvideoUrl,
                    Description = video.Description,

                });            
            }

            return Ok(videoDto);
        }

        // GET api/videos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoDto>> GetVideo(int id)
        {
            //var spec = new VideoSpecification(id);
            
            var video =await _videoRepository.GetAsync(id);
            if (video == null)
            {
                return NotFound();
            }
            string baseUrl = Request.Scheme + "://" + Request.Host + "/" + "videos/";
            string fullvideoUrl = baseUrl + video.VideoUrl;
            if (video == null)
            {
                return NotFound();
            }
            
            var videoDto = new VideoDto
            {
                CourseId= video.Id,
                VideoTitle= video.VideoTitle,
                VideoUrl= fullvideoUrl,
                Description= video.Description,
                
               

            };

            return Ok(videoDto);
        }

        
        
       


    }
}
