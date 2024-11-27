
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Alif.Core.Entities
{  
    public  class AdaptAnimal 
    {
        
        public string AppUserId { get; set; }
        
        public int AnimalId { get; set; }
        
        public DateTime Date { get; set; }= DateTime.Now;

        public string socialMediaUrl { get; set; }

        public string adoptionReasons { get; set; }

        public bool hadAnimalsBefore { get; set; }
        public bool isWorking { get; set; }
        public bool HaveKids { get; set; }
        public bool CanTakeResponsibility { get; set; }

        public string Status { get; set; } = "Pending";
        public  Animals Animal { get; set; }
        
        public  ApplicationUser User { get; set; }
    }
}