using BlogAPI.Models;

namespace BlogAPI.Services
{
    /*
    *Quetsa interfaccia definisce i metodi per la gestione dei post.
    */
    public interface IPostService
    {
        Task<IEnumerable<Post>> GetAllPosts(int pageNumber, int pageSize);
        Task<Post> GetPostById(int id);
        Task<Post> CreatePost(Post post);
    }
}