using Alif.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Specifications.Videos
{
    public class VideoSpecification : BaseSpecifications<Course>
    {
        public VideoSpecification()
            : base()
        {
            Includes.Add(a=>a.Id);

            //Includes.Add(a=>a.LostAnimalImage);

        }
        public VideoSpecification(int id)
            : base(a => a.Id == id)
        {

            Includes.Add(b => b.Id);
            // Includes.Add(a=>a.LostAnimalImage);

        }
    }
}
