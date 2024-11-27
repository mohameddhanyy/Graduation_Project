using System.ComponentModel.DataAnnotations;

namespace Alif.GP.APIs.DTOs
{
    public class UserReturnDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
       
        public string Location { get; set; }
        public string? UserImage { get; set; }

        public string Token { get; set; }
    }
}
