using System.ComponentModel.DataAnnotations;

namespace ProjectCoffeeAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? ImageURL { get; set; }
        public string? Category { get; set; }
        public string? Roast { get; set; }
        public string? Region { get; set; }
        public DateTime? RoastDate { get; set; }
        public bool IsSingleOrigin { get; set; }
    }
}
