using BlogAPI.Models;
using BlogAPI.Data;
using Microsoft.EntityFrameworkCore;


namespace BlogAPI.Services
{

    public class CommentService : ICommentService
    {
        private readonly BlogContext _context;

        public CommentService(BlogContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetCommentsForPost(int postId)
        {
            return await _context.Comments
                .Where(c => c.PostId == postId)
                .ToListAsync();
        }

        public async Task<Comment> CreateComment(int postId, Comment comment)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return null; // non trovato, non aggiungere il commento
            }
            comment.PostId = postId;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}