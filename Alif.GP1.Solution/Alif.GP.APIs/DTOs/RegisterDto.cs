using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Alif.GP.APIs.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PhoneNamber { get; set; }

        [Required]
        public string Password { get; set; }

        public IFormFile Iamge { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Location { get; set; }
    }
}
