using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics.CodeAnalysis;

namespace Alif.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        
        //public string UserName { get; set; } 
        
        public string UserCity { get; set; }
        
        public string UserLocation { get; set; }
                
        //public string UserPhone { get; set; }

        public string? UserImage { get; set; }
      
        public bool UserVerification { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; } = new List<IdentityUserRole<string>>();


    }
}
