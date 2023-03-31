using System.Text.Json.Serialization;

namespace BookmarkManager.Models
{
    public class BookmarkGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public Guid UserId { get; set; }
    }
}
