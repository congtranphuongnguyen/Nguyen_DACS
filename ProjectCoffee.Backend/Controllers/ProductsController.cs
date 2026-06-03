using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCoffee.Backend.Data;
using ProjectCoffee.Backend.Models;

namespace ProjectCoffee.Backend.Controllers
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
            try 
            {
                var query = _context.Products.Include(p => p.Category).AsQueryable();

                // Exclude hidden and secret items from the public menu
                query = query.Where(p => p.IsHidden != true && p.IsSecret != true);

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(p => p.Category != null && p.Category.CategoryName.Trim().ToLower() == category.Trim().ToLower());
                }

                var products = await query.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                // Return detailed error for debugging as requested
                return StatusCode(500, $"Database Error: {ex.Message} | Inner: {ex.InnerException?.Message}");
            }
        }

        [HttpGet("secret")]
        public async Task<ActionResult<IEnumerable<Product>>> GetSecretProducts()
        {
            try
            {
                var products = await _context.Products
                    .Include(p => p.Category)
                    .Where(p => p.IsSecret == true && p.IsHidden != true)
                    .ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Database Error: {ex.Message} | Inner: {ex.InnerException?.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("roast-date/{id}")]
        public async Task<ActionResult<object>> GetRoastDate(int id)
        {
            var product = await _context.Products
                .Where(p => p.ProductId == id)
                .Select(p => new { p.ProductId, p.ProductName, p.RoastDate })
                .FirstOrDefaultAsync();

            if (product == null) return NotFound();
            return product;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.ProductId) return BadRequest("ID mismatch");

            var existingProduct = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.ProductId == id);
            if (existingProduct == null) return NotFound();

            // Update allowed fields
            existingProduct.ProductName = product.ProductName;
            existingProduct.Price = product.Price;
            existingProduct.ImageURL = product.ImageURL;
            existingProduct.Description = product.Description;
            existingProduct.IsHidden = product.IsHidden;
            existingProduct.IsSecret = product.IsSecret;
            existingProduct.IsSoldOut = product.IsSoldOut;

            if (!string.IsNullOrEmpty(product.CategoryName))
            {
                var categoryEntity = await _context.Categories
                    .FirstOrDefaultAsync(c => c.CategoryName.ToLower() == product.CategoryName.ToLower());
                if (categoryEntity == null)
                {
                    categoryEntity = new Category { CategoryName = product.CategoryName };
                    _context.Categories.Add(categoryEntity);
                    await _context.SaveChangesAsync();
                }
                existingProduct.CategoryId = categoryEntity.CategoryId;
            }
            else
            {
                existingProduct.CategoryId = null;
            }

            _context.Entry(existingProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.ProductId == id)) return NotFound();
                else throw;
            }

            return Ok(new { success = true, message = "Cập nhật thành công", product = existingProduct });
        }
    }
}
