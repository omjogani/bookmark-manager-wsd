using BookmarkManager.Models;
using Microsoft.EntityFrameworkCore;

namespace BookmarkManager.Data
{
    public class ContextAPIDBContext : DbContext
    {
        public ContextAPIDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<BookmarkGroup> BookmarkGroups { get; set; }
        public DbSet<BookmarkItem> BookmarkItems { get; set; }
    }
}
