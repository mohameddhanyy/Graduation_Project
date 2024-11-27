using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Entities
{
    public class Video:BaseEntity
    {
        
        public int CourseId { get; set; }
        public string VideoTitle { get; set; }
        public string VideoUrl { get; set; }
        public string Description { get; set; }
        public Course Course { get; set; }
    }
}
