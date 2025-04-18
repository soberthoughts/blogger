using BlogAPI.Models;

namespace BlogAPI.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetCommentsForPost(int postId);
        Task<Comment> CreateComment(int postId, Comment comment);
    }
}