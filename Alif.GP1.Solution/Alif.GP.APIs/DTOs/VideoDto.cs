using Alif.Core.Entities;

namespace Alif.GP.APIs.DTOs
{
    public class VideoDto
    {
        public int CourseId { get; set; }
        public string VideoTitle { get; set; }
        public string VideoUrl { get; set; }
        public string Description { get; set; }
        //public string Videos { get; set; }
    }
}
