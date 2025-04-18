namespace BlogAPI.Models;
using System.Text.Json.Serialization;

/*
 * Questa classe rappresenta un commento associato a un post nel sistema.
 * Contiene le proprietà necessarie per identificare e descrivere un commento.
*/

public class Comment {
    public int Id { get; set; }
    public int PostId { get; set; }
    public int UserId { get; set; }
    public string Body { get; set; } = string.Empty;

    [JsonIgnore]
    public Post? Post { get; set; }
}