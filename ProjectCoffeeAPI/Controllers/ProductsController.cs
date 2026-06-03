using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCoffeeAPI.Data;
using ProjectCoffeeAPI.Models;

namespace ProjectCoffeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] string? category)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                // Robust matching: Case-insensitive and trimmed
                query = query.Where(p => p.Category != null && p.Category.Trim().ToLower() == category.Trim().ToLower());
            }

            var result = await query.ToListAsync();
            return Ok(result); // Explicitly return Ok with JSON result
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        // Specific API for Peak Flavor: Get RoastDate
        [HttpGet("roast-date/{id}")]
        public async Task<ActionResult<object>> GetRoastDate(int id)
        {
            var product = await _context.Products
                .Where(p => p.Id == id)
                .Select(p => new { p.Id, p.Name, p.RoastDate })
                .FirstOrDefaultAsync();

            if (product == null) return NotFound();
            return product;
        }
    }
}
