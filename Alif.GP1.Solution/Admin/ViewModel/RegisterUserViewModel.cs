using System.ComponentModel.DataAnnotations;

namespace Admin.ViewModel
{
    public class RegisterUserViewModel
    {
        [Required]
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        [Required]
        public string UserCity { get; set; }
        [Required]
        public string UserLocation { get; set; }





    }
}
