using BlogAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlogAPI.Controllers 
{
    /*
    *Questo controller gestisce l'autenticazione degli utenti.
    *Utilizza un file JSON per memorizzare gli utenti e le loro credenziali.
    *Quando un utente invia una richiesta di accesso, il controller verifica le credenziali
    *e genera un token JWT se sono valide.
    *Il token viene restituito all'utente e può essere utilizzato per accedere ad altre risorse protette dell'API.
    */
    
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;

        public AuthController(IConfiguration config, IWebHostEnvironment env)
        {
            _config = config;
            _env = env;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var usersPath = Path.Combine(_env.ContentRootPath, "Data", "users.json");
            var usersJson = System.IO.File.ReadAllText(usersPath);
            var users = JsonConvert.DeserializeObject<List<User>>(usersJson);

            if (users == null || users.Count == 0)
            {
                Console.WriteLine("❌ USERS IS NULL OR EMPTY");
                return Unauthorized(new { message = "User list is empty." });
            }

            Console.WriteLine($"Login request: {request.Username} / {request.Password}");

            var user = users.FirstOrDefault(u =>
                u.Username.Trim().Equals(request.Username.Trim(), StringComparison.OrdinalIgnoreCase) &&
                u.Password.Trim() == request.Password.Trim());

            if (user == null)
            {
                Console.WriteLine("❌ User not found or invalid credentials.");
                return Unauthorized(new { message = "Invalid username or password." });
            }

            Console.WriteLine($"✅ User authenticated: {user.Username}");

            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim("FullName", user.Name)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    name = user.Name
                }
            });
        }

        public class LoginRequest
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
    }
}
