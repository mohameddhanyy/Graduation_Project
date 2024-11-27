namespace Alif.Core.DTOs
{
    public class BlogDto
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime BDate { get; set; }
        public string BDiscreption { get; set; }
        public string? Image { get; set; }
    }
}
