using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alif.Core.Entities
{
  //public  enum Adapte
  // {
  //  NotAdapted = 0,
  //   IsAdapted = 1

  //}

    public class Animals : BaseEntity
    {
        public string AnimalName { get; set; }
        public int AnimalAge { get; set; }
        public int StatusWithKid { get; set; }
        public int StatusWithAnimal { get; set; }
        public string AnimalLocation { get; set; }
        public string AnimalMedicalNeed { get; set; }
        public string AnaimalActivityLevel { get; set; }
        public bool AnaimalPeeped { get; set; }
        public string AnaimalGender { get; set; }
        public string AnimalIamge { get; set; }

        public int AnimalTypeId { get; set; } //foregin key column >> AnimalType
        public AnimalType Type { get; set; } //navigation one

        public string AppUserId { get; set; }
        public ApplicationUser User { get; set; }

        public bool Status { get; set; } 
    }

   
}
