using System.ComponentModel.DataAnnotations;

namespace ProjectCoffee.Backend.Models
{
    public class FlavorJournal
    {
        public int Id { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public int Rating { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
