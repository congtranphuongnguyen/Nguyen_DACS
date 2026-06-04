using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectCoffeeAPI.Models
{
    [Table("FlavorJournal")]
    public class FlavorJournal
    {
        [Key]
        [Column("JournalId")]
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
