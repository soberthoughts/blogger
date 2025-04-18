using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Models
{
    /*
     * Questa classe rappresenta un post del blog.
     * Contiene le proprietà Id, UserId, Title, Body e ImageUrl.
     * Inoltre, contiene una lista di commenti associati al post.
     */

    public class Post {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public List<Comment> Comments { get; set; } = new ();
    }
    
}

