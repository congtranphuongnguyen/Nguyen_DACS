using System.ComponentModel.DataAnnotations;

namespace ProjectCoffee.Backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string Items { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public string? Topping { get; set; }
        public string? Sugar { get; set; }
        public string? Ice { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Status { get; set; } = "pending";
    }
}
