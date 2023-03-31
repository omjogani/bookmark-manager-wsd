using System.Text.Json.Serialization;

namespace BookmarkManager.Models
{
    public class BookmarkItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public DateTime Date { get; set; }
        [JsonIgnore]
        public BookmarkGroup? BookmarkGroup { get; set; }
        public int BookmarkGroupId { get; set; }
    }
}
