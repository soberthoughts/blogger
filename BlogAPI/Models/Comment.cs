namespace BlogAPI.Models;
using System.Text.Json.Serialization;
public class Comment {
    public int Id { get; set; }
    public int PostId { get; set; }
    public int UserId { get; set; }
    public string Body { get; set; } = string.Empty;

    [JsonIgnore]
    public Post? Post { get; set; }
}