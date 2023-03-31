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
    public class BookmarkItemsController : ControllerBase
    {
        private readonly ContextAPIDBContext _context;

        public BookmarkItemsController(ContextAPIDBContext context)
        {
            _context = context;
        }

        // GET: api/BookmarkItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookmarkItem>>> GetBookmarkItems()
        {
          if (_context.BookmarkItems == null)
          {
              return NotFound();
          }
            return await _context.BookmarkItems.ToListAsync();
        }

        // GET: api/BookmarkItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookmarkItem>> GetBookmarkItem(int id)
        {
          if (_context.BookmarkItems == null)
          {
              return NotFound();
          }
            var bookmarkItem = await _context.BookmarkItems.FindAsync(id);

            if (bookmarkItem == null)
            {
                return NotFound();
            }

            return bookmarkItem;
        }

        [HttpGet]
        [Route("bookmarkGId/{bookmarkGroupId}")]
        public async Task<ActionResult> GetBookmarkGroupByUId(String bookmarkGroupId)
        {
            if (_context.BookmarkItems == null)
            {
                return NotFound();
            }
            var bookmarkItems = await _context.BookmarkItems.Where(u => u.BookmarkGroupId.ToString() == bookmarkGroupId).ToListAsync();
            if (bookmarkItems == null)
            {
                return NotFound();
            }
            return Ok(bookmarkItems);
        }

        // PUT: api/BookmarkItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookmarkItem(int id, BookmarkItem bookmarkItem)
        {
            if (id != bookmarkItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookmarkItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkItemExists(id))
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

        // POST: api/BookmarkItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookmarkItem>> PostBookmarkItem(BookmarkItem bookmarkItem)
        {
          if (_context.BookmarkItems == null)
          {
              return Problem("Entity set 'ContextAPIDBContext.BookmarkItems'  is null.");
          }
            _context.BookmarkItems.Add(bookmarkItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookmarkItem", new { id = bookmarkItem.Id }, bookmarkItem);
        }

        // DELETE: api/BookmarkItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmarkItem(int id)
        {
            if (_context.BookmarkItems == null)
            {
                return NotFound();
            }
            var bookmarkItem = await _context.BookmarkItems.FindAsync(id);
            if (bookmarkItem == null)
            {
                return NotFound();
            }

            _context.BookmarkItems.Remove(bookmarkItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkItemExists(int id)
        {
            return (_context.BookmarkItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
