using Alif.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Specifications.AnimalSpecs
{
    public  class AnimalWithTypeAndImagesSpecification : BaseSpecifications<Animals>
    {
        public AnimalWithTypeAndImagesSpecification()
            :base(a=>a.Status==true)
        {
            Includes.Add(a=>a.Type);
            //Includes.Add(b=>b.User);
            //Includes.Add(a=>a.AnimalImages);
            
        }
        public AnimalWithTypeAndImagesSpecification(int id)
            :base(a => a.Id ==id)
        {
            Includes.Add(a => a.Type);
            //Includes.Add(b => b.User);
            //Includes.Add(a=>a.AnimalImages);

        }

    }
}
