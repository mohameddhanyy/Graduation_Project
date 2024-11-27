using Alif.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace Alif.GP.APIs.DTOs
{
    public class UserAdaptAnimalDto
    {
        
        //public string AppUserId { get; set; }

        public int AnimalId { get; set; }


        public string DateString { get; set; } 
        public string socialMediaUrl { get; set; }

        public string adoptionReasons { get; set; }

        public bool hadAnimalsBefore { get; set; }
        public bool isWorking { get; set; }
        public bool HaveKids { get; set; }
        public bool CanTakeResponsibility { get; set; }

        

    }
}
