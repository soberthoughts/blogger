using BlogAPI.Models;

namespace BlogAPI.Services
{
    public interface IPostService
    {
        Task<IEnumerable<Post>> GetAllPosts(int pageNumber, int pageSize);
        Task<Post> GetPostById(int id);
        Task<Post> CreatePost(Post post);
    }
}