namespace Alif.GP.APIs.DTOs
{
    public class CreateFosterDto
    {
        public string FOwnername { get; set; }
        public int FAvailablePlaces { get; set; }

        public string FPhone { get; set; }

        public decimal ForDay { get; set; }

        public decimal ForWeek { get; set; }

        public decimal ForMonth { get; set; }

        public string FLocation { get; set; }
        public string FDescripation { get; set; }
        
        public IFormFile Image { get; set; }
    }
}
