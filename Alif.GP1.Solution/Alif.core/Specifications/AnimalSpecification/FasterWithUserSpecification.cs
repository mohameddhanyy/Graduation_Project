using Alif.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Specifications.AnimalSpecs
{
    public class FasterWithUserSpecification :BaseSpecifications<Foster>
    {
        public FasterWithUserSpecification()
            : base()
        {
            Includes.Add(a => a.User);

            //Includes.Add(a=>a.AnimalImages);

        }
        public FasterWithUserSpecification(int id)
            : base(a => a.Id == id)
        {

            Includes.Add(b => b.User);
            //Includes.Add(a=>a.AnimalImages);

        }
    }
}
