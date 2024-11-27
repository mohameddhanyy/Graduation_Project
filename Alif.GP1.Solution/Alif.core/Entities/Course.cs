using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Alif.Core.Entities
{
    public  class Course : BaseEntity
    {            
        public string CName { get; set; } = null!;    
        
        public string? CImages { get; set; }
        public string CDescripation { get; set; } = null!;

        public string AppUserId { get; set; }
        public ApplicationUser user { get; set; }
        public ICollection<Video> Videos { get; set; }

    }
}