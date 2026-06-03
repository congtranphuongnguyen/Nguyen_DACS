using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectCoffee.Backend.Models
{
    [Table("Products")]
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string ProductName { get; set; } = string.Empty;
        public int? CategoryId { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public Category? Category { get; set; }

        private string? _categoryName;

        [NotMapped]
        [System.Text.Json.Serialization.JsonPropertyName("CategoryName")]
        public string? CategoryName 
        { 
            get => Category?.CategoryName ?? _categoryName;
            set => _categoryName = value;
        }

        [NotMapped]
        [System.Text.Json.Serialization.JsonPropertyName("category")]
        public string? CategoryString => Category?.CategoryName ?? _categoryName;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        [System.Text.Json.Serialization.JsonPropertyName("ImageURL")]
        public string? ImageURL { get; set; }
        public DateTime? RoastDate { get; set; }
        public int? StockQuantity { get; set; } // Nullable to handle SQL NULL
        public bool? IsSingleOrigin { get; set; } // Nullable to handle SQL NULL
        public bool? IsHidden { get; set; } // Flag for secret items
        public bool? IsSecret { get; set; }
        public bool? IsSoldOut { get; set; }
    }
}
