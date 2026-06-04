using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectCoffee.Backend.Models
{
    [Table("FlavorJournal")]
    public class FlavorJournal
    {
        [Key]
        [Column("JournalId")]
        public int Id { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public int? OrderId { get; set; }
        public int Rating { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
