using Microsoft.AspNetCore.Mvc;
using BlogAPI.Data;
using BlogAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Controllers;

[ApiController]
[Route("api/posts/{postId}/comments")]
public class CommentsController: ControllerBase
{
    private readonly BlogContext _context;

    public CommentsController(BlogContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int postId)
    {
        var post = await _context.Posts.FindAsync(postId);
        if (post == null)
        {
            return NotFound();
        }

        var comments = await _context.Comments
            .Where(c => c.PostId == postId)
            .ToListAsync();

        return Ok(comments);
    }


    [HttpPost]
    public async Task<ActionResult<Comment>> CreateComment(int postId, Comment comment)
    {
        var post = await _context.Posts.FindAsync(postId);
        if (post == null)
        {
            return NotFound();
        }

        comment.PostId = postId;
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return Ok(comment);
    }
}