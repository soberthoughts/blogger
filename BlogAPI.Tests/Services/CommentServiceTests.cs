using BlogAPI.Data;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace BlogAPI.Tests.Services;

public class CommentServiceTests
{
    private BlogContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()) // fresh DB
            .Options;

        var context = new BlogContext(options);

        context.Posts.AddRange(
            new Post { Id = 1, Title = "Ferrari F40", Body = "Legend", UserId = 1 },
            new Post { Id = 2, Title = "Aventador", Body = "V12", UserId = 2 }
        );

        context.Comments.AddRange(
            new Comment { Id = 1, PostId = 1, Body = "Amazing!", UserId = 2 },
            new Comment { Id = 2, PostId = 1, Body = "I love it.", UserId = 3 }
        );

        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task GetCommentsForPost_Returns_Correct_Comments()
    {
        var context = GetDbContext();
        var service = new CommentService(context);

        var comments = await service.GetCommentsForPost(1);

        Assert.Equal(2, comments.Count());
    }

    [Fact]
    public async Task CreateComment_Adds_If_Post_Exists()
    {
        var context = GetDbContext();
        var service = new CommentService(context);

        var comment = new Comment
        {
            Body = "Best car ever.",
            UserId = 1
        };

        var created = await service.CreateComment(1, comment);

        Assert.NotNull(created);
        Assert.Equal(1, created.PostId);
        Assert.Equal("Best car ever.", created.Body);
    }

    [Fact]
    public async Task CreateComment_ReturnsNull_If_Post_DoesNotExist()
    {
        var context = GetDbContext();
        var service = new CommentService(context);

        var comment = new Comment { Body = "Where's the post?", UserId = 1 };
        var result = await service.CreateComment(999, comment);

        Assert.Null(result);
    }
    

}
