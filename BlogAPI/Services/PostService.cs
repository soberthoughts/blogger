using BlogAPI.Models;
using BlogAPI.Data;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Services;

public class PostService : IPostService
{
    private readonly BlogContext _context;

    public PostService(BlogContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Post>> GetAllPosts(int pageNumber, int pageSize)
    {
        return await _context.Posts
            .Include(p => p.Comments) // prendi i commenti associati
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<Post> GetPostById(int id)
    {
        return await _context.Posts
            .Include(p => p.Comments)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Post> CreatePost(Post post)
    {
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }
}