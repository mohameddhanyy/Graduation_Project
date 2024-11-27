using Alif.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Alif.API.DTOs
{
    public class FosterDTO
    {
        public int Id { get; set; }
        public string FOwnername { get; set; }
        public int FAvailablePlaces { get; set; }
        
        public string FPhone { get; set; }
        
        public decimal ForDay { get; set; }
        
        public decimal ForWeek { get; set; }
        
        public decimal ForMonth { get; set; }
        
        public string FLocation { get; set; }
        public string FDescripation { get; set; }
        
        public string? Image { get; set; }
        public string AppUserId { get; set; }
        public string User { get; set; }
    }
}
