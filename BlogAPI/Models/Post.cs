using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Models;

public class Post {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public List<Comment> Comments { get; set; } = new ();
}