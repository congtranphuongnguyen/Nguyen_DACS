using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCoffeeAPI.Data;
using ProjectCoffeeAPI.Models;
using System.Text.Json;

namespace ProjectCoffeeAPI.Controllers
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

        // Admin Statistics: Count Toppings from CustomDetails
        [HttpGet("stats/toppings")]
        public async Task<ActionResult<IDictionary<string, int>>> GetToppingStats()
        {
            var orders = await _context.Orders
                .Where(o => !string.IsNullOrEmpty(o.CustomDetails))
                .ToListAsync();

            var toppingCounts = new Dictionary<string, int>();

            foreach (var order in orders)
            {
                try {
                    // Assuming CustomDetails is a JSON array of strings or objects
                    // For example: ["Thạch cafe", "Trân châu"]
                    var toppings = JsonSerializer.Deserialize<List<string>>(order.CustomDetails ?? "[]");
                    if (toppings != null)
                    {
                        foreach (var t in toppings)
                        {
                            if (toppingCounts.ContainsKey(t)) toppingCounts[t]++;
                            else toppingCounts[t] = 1;
                        }
                    }
                } catch { }
            }

            return toppingCounts;
        }
    }
}
