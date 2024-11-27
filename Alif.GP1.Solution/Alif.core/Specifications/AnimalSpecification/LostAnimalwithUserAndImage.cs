using Alif.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Specifications.AnimalSpecs
{
    public class LostAnimalwithUserAndImage :BaseSpecifications<LostAnimal>
    {
        public LostAnimalwithUserAndImage()
            : base()
        {
            Includes.Add(a => a.user);
            
            //Includes.Add(a=>a.LostAnimalImage);

        }
        public LostAnimalwithUserAndImage(int id)
            : base(a => a.Id == id)
        {
            
            Includes.Add(b => b.user);
           // Includes.Add(a=>a.LostAnimalImage);

        }
    }
}
