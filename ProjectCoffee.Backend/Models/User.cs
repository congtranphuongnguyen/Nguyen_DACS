using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectCoffee.Backend.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("UserId")]
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Column("FullName")]
        public string Name { get; set; } = string.Empty;
        
        public int Points { get; set; } = 0;
        
        public int TotalOrders { get; set; } = 0;

        public bool IsCoffeeLover { get; set; } = false;
    }
}
