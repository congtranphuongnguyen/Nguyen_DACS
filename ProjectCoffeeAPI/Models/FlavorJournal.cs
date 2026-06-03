using System.ComponentModel.DataAnnotations;

namespace ProjectCoffeeAPI.Models
{
    public class FlavorJournal
    {
        public int Id { get; set; }
        [Required]
        public string OrderId { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public int Rating { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
