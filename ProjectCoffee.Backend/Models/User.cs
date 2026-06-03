using System.ComponentModel.DataAnnotations;

namespace ProjectCoffee.Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; } = string.Empty;
        
        public string Name { get; set; } = string.Empty;
        
        public int Points { get; set; } = 0;
        
        public int TotalOrders { get; set; } = 0;

        public bool IsCoffeeLover { get; set; } = false;
    }
}
