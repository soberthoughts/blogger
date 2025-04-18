using System.Text.Json.Serialization;

namespace BlogAPI.Models
{
    /*
     * Questa classe rappresenta un utente nel sistema.
     * Contiene le proprietà necessarie per identificare e descrivere un utente.
    */
    
    public class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("username")]
        public string Username { get; set; } = string.Empty;
        [JsonPropertyName("email")]
        public string Password { get; set; } = string.Empty;
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
    }
}
