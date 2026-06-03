using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCoffee.Backend.Data;
using ProjectCoffee.Backend.Models;

namespace ProjectCoffee.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(string? email)
        {
            if (string.IsNullOrEmpty(email))
                return await _context.Orders.ToListAsync();
            
            return await _context.Orders
                .Where(o => o.UserEmail == email)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrders", new { id = order.Id }, order);
        }

        // PUT: api/Orders/5/complete
        [HttpPut("{id}/complete")]
        public async Task<IActionResult> CompleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            if (order.Status != "Completed")
            {
                order.Status = "Completed";
                
                // Find or create user to update points
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == order.UserEmail);
                if (user != null)
                {
                    // Award points: 10 points per order for now
                    user.Points += 10;
                    user.TotalOrders += 1;

                    if (user.TotalOrders >= 5)
                    {
                        user.IsCoffeeLover = true;
                    }
                }
                
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }
    }
}
