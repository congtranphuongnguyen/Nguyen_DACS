using System.ComponentModel.DataAnnotations;

namespace ProjectCoffeeAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string OrderNumber { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Items { get; set; } = string.Empty; // JSON string of items
        public string? CustomDetails { get; set; } // JSON string for toppings/sugar/ice
        public decimal Total { get; set; }
        public string Status { get; set; } = "pending";
    }
}
