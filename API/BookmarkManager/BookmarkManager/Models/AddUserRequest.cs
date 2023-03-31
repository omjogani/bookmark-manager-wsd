namespace BookmarkManager.Models
{
    public class AddUserRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime date { get; set; }
    }
}
