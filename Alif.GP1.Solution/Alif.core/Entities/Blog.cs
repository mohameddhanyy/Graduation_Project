using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Alif.Core.Entities
{
    
    public  class Blog : BaseEntity
    {
        public string Subject { get; set; }
        
        public DateTime BDate { get; set; } = DateTime.Now;
    
        public string BDiscreption { get; set; }
        [DataType(DataType.ImageUrl)]
        public string? BImage { get; set; }

        public string AppUserId { get; set; }
        public ApplicationUser user { get; set; }



    }
}