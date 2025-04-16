using Microsoft.EntityFrameworkCore;
using BlogAPI.Data;
using BlogAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<BlogContext>(options =>
options.UseInMemoryDatabase("BlogDb"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BlogContext>();
    if (!context.Posts.Any())
    {
        context.Posts.AddRange(new List<Post>
{
    new Post
    {
        Title = "Ferrari F40",
        Body = "The Ferrari F40 is an icon of raw performance and design, built to celebrate Ferrari’s 40th anniversary. Powered by a twin-turbo V8, it was the last car personally approved by Enzo Ferrari — and it's still one of the most visceral supercars ever made.",
        UserId = 4,
        ImageUrl = "https://opinari-drivers.com/cdn/shop/articles/the-legend-the-icon-the-ferrari-f40-605345-445860.jpg"
    },
    new Post
    {
        Title = "Lamborghini Aventador",
        Body = "With its aggressive V12 roar and signature scissor doors, the Lamborghini Aventador redefines what a flagship supercar should be. Brutal acceleration, angular design, and road presence like no other make it an instant classic.",
        UserId = 1,
        ImageUrl = "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/aventador/2023/02_09_refresh/aven_gate_s_01_m.jpg"
    },
    new Post
    {
        Title = "McLaren P1",
        Body = "The McLaren P1 was born from Formula 1 DNA, blending a twin-turbo V8 with an electric motor for instant torque and a 903hp output. With active aerodynamics and a limited production run, it’s a modern legend.",
        UserId = 2,
        ImageUrl = "https://images.ctfassets.net/uaddx06iwzdz/d0iBPTySC54uE0eTLzlK6/56d06be03a0194d12b9fe9f1f98325be/mclaren-p1-front.jpg"
    },
    new Post
    {
        Title = "Bugatti Chiron",
        Body = "Unleashing 1,500 horsepower from its quad-turbo W16 engine, the Bugatti Chiron blends luxury and speed like no other. It's not just a car — it’s a hypercar capable of crossing 300mph while wrapped in hand-stitched leather.",
        UserId = 3,
        ImageUrl = "https://images.hgmsites.net/hug/bugatti-chiron-first-drive_100596770_h.jpg"
    }
});


        context.SaveChanges();
    }

    if(!context.Comments.Any())
    {
        context.Comments.AddRange(new List<Comment>
{
    // Ferrari F40 (PostId = 1)
    new Comment { PostId = 1, UserId = 1, Body = "An absolute legend. That raw turbo whoosh is unmatched!" },
    new Comment { PostId = 1, UserId = 2, Body = "Still the best-looking Ferrari in my opinion." },

    // Lamborghini Aventador (PostId = 2)
    new Comment { PostId = 2, UserId = 3, Body = "You can hear this beast from a mile away. Love the V12 scream." },
    new Comment { PostId = 2, UserId = 4, Body = "That launch control is brutal. Pure drama on wheels." },

    // McLaren P1 (PostId = 3)
    new Comment { PostId = 3, UserId = 1, Body = "Electric boost + twin turbo = supercar sorcery." },
    new Comment { PostId = 3, UserId = 2, Body = "I saw one at Goodwood — photos don’t do it justice." },

    // Bugatti Chiron (PostId = 4)
    new Comment { PostId = 4, UserId = 3, Body = "It’s not just fast — it’s luxury redefined. Crazy tech." },
    new Comment { PostId = 4, UserId = 4, Body = "How is this even legal on public roads 😅" }
});


        context.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();


