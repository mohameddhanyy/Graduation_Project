namespace Alif.GP.APIs.DTOs
{
    public class CreateAnimalDto
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
        public IFormFile AnimalIamge { get; set; }
        public int AnimalTypeId { get; set; }
        
    }
}
