using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookmarkManager.Data;
using BookmarkManager.Models;

namespace BookmarkManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkGroupsController : ControllerBase
    {
        private readonly ContextAPIDBContext _context;

        public BookmarkGroupsController(ContextAPIDBContext context)
        {
            _context = context;
        }

        // GET: api/BookmarkGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookmarkGroup>>> GetBookmarkGroups()
        {
          if (_context.BookmarkGroups == null)
          {
              return NotFound();
          }
            return await _context.BookmarkGroups.ToListAsync();
        }

        // GET: api/BookmarkGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookmarkGroup>> GetBookmarkGroup(int id)
        {
          if (_context.BookmarkGroups == null)
          {
              return NotFound();
          }
            var bookmarkGroup = await _context.BookmarkGroups.FindAsync(id);

            if (bookmarkGroup == null)
            {
                return NotFound();
            }

            return bookmarkGroup;
        }

        [HttpGet]
        [Route("group/{userId}")]
        public async Task<ActionResult> GetBookmarkGroupByUId(String userId)
        {
            if (_context.BookmarkGroups == null)
            {
                return NotFound();
            }
            var bookmarkGroup = await _context.BookmarkGroups.Where(u => u.UserId.ToString() == userId).ToListAsync();
            if (bookmarkGroup == null)
            {
                return NotFound();
            }
            return Ok(bookmarkGroup);
        }

        // PUT: api/BookmarkGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookmarkGroup(int id, BookmarkGroup bookmarkGroup)
        {
            if (id != bookmarkGroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookmarkGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkGroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookmarkGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookmarkGroup>> PostBookmarkGroup(BookmarkGroup bookmarkGroup)
        {
          if (_context.BookmarkGroups == null)
          {
              return Problem("Entity set 'ContextAPIDBContext.BookmarkGroups'  is null.");
          }
            _context.BookmarkGroups.Add(bookmarkGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookmarkGroup", new { id = bookmarkGroup.Id }, bookmarkGroup);
        }

        // DELETE: api/BookmarkGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmarkGroup(int id)
        {
            if (_context.BookmarkGroups == null)
            {
                return NotFound();
            }
            var bookmarkGroup = await _context.BookmarkGroups.FindAsync(id);
            if (bookmarkGroup == null)
            {
                return NotFound();
            }

            _context.BookmarkGroups.Remove(bookmarkGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkGroupExists(int id)
        {
            return (_context.BookmarkGroups?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
