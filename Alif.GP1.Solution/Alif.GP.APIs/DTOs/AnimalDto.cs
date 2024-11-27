using Alif.Core.Entities;

namespace Alif.GP.APIs.DTOs
{
    public class AnimalDto
    {
        public int Id { get; set; }
        public string AnimalName { get; set; }
        public int AnimalAge { get; set; }
        public int StatusWithKid { get; set; }
        public int StatusWithAnimal { get; set; }
        public string AnimalLocation { get; set; }
        public string AnimalMedicalNeed { get; set; }
        public string AnaimalActivityLevel { get; set; }
        public bool AnaimalPeeped { get; set; }
        public string AnaimalGender { get; set; }
        public string? AnimalIamge { get; set; }

        public int AnimalTypeId { get; set; } 
        public string Type { get; set; } 

        public string AppUserId { get; set; }
        public string User { get; set; }
        

    }
}
