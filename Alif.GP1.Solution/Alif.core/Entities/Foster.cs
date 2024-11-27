using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Entities
{
    public class Foster :BaseEntity
    {
        
        
        [StringLength(50)]      
        public string FOwnername { get; set; }     
        public int FAvailablePlaces { get; set; }       
        [StringLength(50)]     
        public string FPhone { get; set; } 
        [Column(TypeName = "money")]
        public decimal ForDay { get; set; }
        [Column( TypeName = "money")]
        public decimal ForWeek { get; set; }
        [Column( TypeName = "money")]
        public decimal ForMonth { get; set; }       
        [StringLength(50)]
        public string FLocation { get; set; } 
        public string FDescripation { get; set; }
        public bool FApproval { get; set; } = false;       
        public string? Image { get; set; }
        public string AppUserId{ get; set; }
        public ApplicationUser User { get; set; }

        

    }
}
