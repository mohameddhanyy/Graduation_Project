namespace Alif.GP.APIs.DTOs
{
    public class CreatedLostAnimal
    {
        public string LostAnimalDescription { get; set; }

        public string LostAnimalName { get; set; }

        public string LostAnimalPhonenum { get; set; }

        public string LostAnimalLocation { get; set; }

        public IFormFile LostAnimalImage { get; set; }
        public DateTime LostDate { get; set; }

        
    }
}
