using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Entities
{

   
    public  class LostAnimal :BaseEntity
    {
        public string LostAnimalDescription { get; set; }
    
        public string LostAnimalName { get; set; }

        public string LostAnimalPhonenum { get; set; }

        public string LostAnimalLocation { get; set; }

        public string LostAnimalImage { get; set; }
        [AllowNull]

        public DateTime? LostDate { get; set; }
 
        public string AppUserId { get; set; }
        public ApplicationUser user { get; set; }

    }
}
