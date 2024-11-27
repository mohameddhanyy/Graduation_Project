using Alif.Core.DTOs;
using Alif.Core.Entities;
using Alif.Core.RepositoryContract;
using Alif.Core.Specifications.Videos;
using Alif.GP.APIs.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Alif.API.Controllers
{
    
    public class CourseController : BaseApiController
    {
        private readonly IGenericRepository<Course> _courseRepository;

        public CourseController(IGenericRepository<Course> courseRepository)
        {
            _courseRepository = courseRepository;
        }

        // GET: api/course
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses()
        {
            //var spec = new VideoSpecification();

            var courses = await _courseRepository.GetAllAsync();
            var courseDtos = new List<CourseDto>();

            foreach (var course in courses)
            {
                string baseUrl = Request.Scheme + "://" + Request.Host + "/" + "images/";
                string fullImageUrl = baseUrl + course.CImages;
                courseDtos.Add(new CourseDto
                {
                    CId = course.Id,
                    CName = course.CName,
                    CDescripation = course.CDescripation,
                    CImages= fullImageUrl,
                   
                });
            }

            return Ok(courseDtos);
        }

        // GET: api/course/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourseById(int id)
        {
            var course = await _courseRepository.GetAsync(id);

            if (course == null)
            {
                return NotFound();
            }
            string baseUrl = Request.Scheme + "://" + Request.Host + "/" + "images/";
            string fullImageUrl = baseUrl + course.CImages;

            var courseDto = new CourseDto
            {
                CId = course.Id,
                CName = course.CName,
                CDescripation = course.CDescripation,
                CImages= fullImageUrl,
            };

            return Ok(courseDto);
        }
        #region test
        //// GET api/courses
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        //{
        //    return await _courseRepository.GetAllAsync();
        //}

        //// GET api/courses/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Course>> GetCourse(int id)
        //{
        //    return await _courseRepository.GetAsync(id);
        //}

        // POST api/courses
        //[HttpPost]
        //public async Task<ActionResult<Course>> PostCourse(Course course)
        //{
        //    _courseRepository.Courses.Add(course);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetCourse), new { id = course.CourseId }, course);
        //}

        #endregion



    }
}

