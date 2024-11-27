using Alif.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Alif.API.UserDto
{
    public class LostAnimalDTO
    {
        
        public int Id { get; set; }

        public string LostAnimalDescription { get; set; }

        public string LostAnimalName { get; set; }

        public string LostAnimalPhonenum { get; set; }

        public string LostAnimalLocation { get; set; }
        public string AppUserId { get; set; }
        [AllowNull]
        public string? LostAnimalImage { get; set; }
        public DateTime? LostDate { get; set; }

        public string user { get; set; }


    }
}
