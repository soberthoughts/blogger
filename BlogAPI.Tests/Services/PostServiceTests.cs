using BlogAPI.Data;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace BlogAPI.Tests.Services;

public class PostServiceTests
{
    private BlogContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // 🧪 fresh DB every time
            .Options;

        var context = new BlogContext(options);
        context.Posts.AddRange(
            new Post { Id = 1, Title = "Ferrari F40", Body = "Iconic supercar", UserId = 1 },
            new Post { Id = 2, Title = "Lamborghini Aventador", Body = "V12 power", UserId = 2 }
        );
        context.SaveChanges();

        return context;
    }

    [Fact]
    public async Task GetAllPosts_Returns_Correct_Paged_Count()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var service = new PostService(context);

        // Act
        var posts = await service.GetAllPosts(1, 1);

        // Assert
        Assert.Single(posts);
    }

    [Fact]
    public async Task GetPostById_Returns_Valid_Post()
    {
        var context = GetInMemoryDbContext();
        var service = new PostService(context);

        var post = await service.GetPostById(1);

        Assert.NotNull(post);
        Assert.Equal("Ferrari F40", post?.Title);
    }

    [Fact]
    public async Task CreatePost_Adds_Post_To_Context()
    {
        var context = GetInMemoryDbContext();
        var service = new PostService(context);

        var newPost = new Post
        {
            Title = "McLaren P1",
            Body = "Hybrid hypercar",
            UserId = 3
        };

        var result = await service.CreatePost(newPost);

        Assert.NotNull(result);
        Assert.True(result.Id > 0);
        Assert.Equal("McLaren P1", result.Title);
    }
}
