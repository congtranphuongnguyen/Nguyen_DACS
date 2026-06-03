using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCoffee.Backend.Data;
using ProjectCoffee.Backend.Models;

namespace ProjectCoffee.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JournalController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlavorJournal>>> GetJournal(string? email)
        {
            if (string.IsNullOrEmpty(email))
                return await _context.FlavorJournal.ToListAsync();

            return await _context.FlavorJournal
                .Where(j => j.UserEmail == email)
                .OrderByDescending(j => j.CreatedAt)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FlavorJournal>> PostJournal(FlavorJournal journal)
        {
            _context.FlavorJournal.Add(journal);
            await _context.SaveChangesAsync();
            return Ok(journal);
        }

        [HttpGet("previous/{productId}")]
        public async Task<ActionResult<FlavorJournal>> GetPreviousNote(int productId, string email)
        {
            var journal = await _context.FlavorJournal
                .Where(j => j.ProductId == productId && j.UserEmail == email)
                .OrderByDescending(j => j.CreatedAt)
                .FirstOrDefaultAsync();

            if (journal == null) return NotFound();
            return journal;
        }
    }
}
