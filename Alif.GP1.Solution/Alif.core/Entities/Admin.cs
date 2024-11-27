using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Entities
{
    public class Admin : BaseEntity
    {
        
        public string AdFristName { get; set; }

        public string AdLastName { get; set; }

        public string AdLocation { get; set; }

        public string AdPhone { get; set; }

        public string AdEmail { get; set; }
        [DataType(DataType.ImageUrl)]
        public string? AdminImage { get; set; }
    }
}
