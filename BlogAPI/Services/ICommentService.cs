using BlogAPI.Models;

namespace BlogAPI.Services
{
    /*
    * Questa interfaccia definisce i metodi per la gestione dei commenti.
    */
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetCommentsForPost(int postId);
        Task<Comment> CreateComment(int postId, Comment comment);
    }
}