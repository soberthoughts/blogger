using Microsoft.AspNetCore.Mvc;
using BlogAPI.Data;
using BlogAPI.Models;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Services;

namespace BlogAPI.Controllers;

/* 
 * Questa classe gestisce le richieste HTTP per i commenti.
 * Le azioni disponibili sono:
 * - GET /api/posts/{postId}/comments: restituisce tutti i commenti per un post specifico.
 * - POST /api/posts/{postId}/comments: crea un nuovo commento per un post specifico.
*/

[ApiController]
[Route("api/posts/{postId}/comments")]
public class CommentsController: ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentsController(ICommentService commentService)
    {
        _commentService = commentService;
    }
   
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int postId)
    {
        var comments = await _commentService.GetCommentsForPost(postId);
        return Ok(comments);
    }


    [HttpPost]
    public async Task<ActionResult<Comment>> CreateComment(int postId, Comment comment)
    {
        var created = await _commentService.CreateComment(postId, comment);
        if (created == null) return NotFound(); // if post doesn't exist
        return CreatedAtAction(nameof(GetComments), new { postId = created.PostId }, created);
    }

}