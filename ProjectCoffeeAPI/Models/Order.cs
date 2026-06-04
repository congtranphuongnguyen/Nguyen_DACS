using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectCoffeeAPI.Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        [Column("OrderId")]
        public int Id { get; set; }

        [Required]
        public string OrderNumber { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;

        [Column("OrderDate")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Items { get; set; } = string.Empty; // JSON string of items
        public string? CustomDetails { get; set; } // JSON string for toppings/sugar/ice

        [Column("TotalAmount")]
        public decimal Total { get; set; }
        public string Status { get; set; } = "pending";
    }
}
