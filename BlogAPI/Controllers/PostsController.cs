using Microsoft.AspNetCore.Mvc;
using BlogAPI.Data;
using BlogAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BlogAPI.Controllers;

/* 
 * Questa classe gestisce le richieste HTTP per i post.
 * Le azioni disponibili sono:
 * - GET /api/posts: restituisce una lista di post con paginazione.
 * - GET /api/posts/{id}: restituisce un post specifico.
 * - POST /api/posts: crea un nuovo post (solo per utenti autenticati).
 */

[ApiController]
[Route("api/[controller]")]
public class PostsController: ControllerBase{
    private readonly  BlogContext _context;

    public PostsController(BlogContext context){
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetPosts(int page = 1, int pageSize = 5)
    {
        var posts = await _context.Posts
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(p => p.Comments)
            .ToListAsync();

        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPost(int id)
    {
        var post = await _context.Posts
            .Include(p => p.Comments)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    // protetto da autorizzazione, solo gli utenti autenticati possono creare post
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost(Post post)
    {
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Post>> DeletePost(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null)
        {
            return NotFound();
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}