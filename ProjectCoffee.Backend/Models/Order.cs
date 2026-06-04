using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectCoffee.Backend.Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        [Column("OrderId")]
        public int Id { get; set; }

        public string OrderNumber { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string Items { get; set; } = string.Empty;

        [Column("TotalAmount")]
        public decimal Total { get; set; }

        public string? Topping { get; set; }
        public string? Sugar { get; set; }
        public string? Ice { get; set; }

        [Column("OrderDate")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string Status { get; set; } = "pending";
    }
}
