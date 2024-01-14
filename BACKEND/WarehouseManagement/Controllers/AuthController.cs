using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WM.Data.Sql;

namespace WarehouseManagement.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly WarehouseDbContext _dbContext;
        public AuthController(WarehouseDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        [HttpPost("login")]
        public IActionResult Login([FromBody] JObject loginData)
        {
            var username = loginData["username"].ToString();
            var password = loginData["password"].ToString();

            // Tutaj sprawdź dane logowania i użytkownika w bazie danych
            // Jeśli uwierzytelnienie przebiegnie pomyślnie, wygeneruj token JWT
            if (IsValidUser(username, password))
            {
                var token = GenerateJwtToken(username);

                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        // Funkcje do uwierzytelniania i generowania tokenów JWT
        private bool IsValidUser(string username, string password)
        {
            var user = _dbContext.Login.FirstOrDefault(u => u.Uzytkownik == username && u.Haslo == password);
            return user != null;

        }

        private string GenerateJwtToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("OtoMojjjjDługiIWBezpiecznyKlucz32Bajty"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                "YourIssuer",
                "YourAudience",
                new[]
                {
                new Claim(ClaimTypes.Name, username),
                },
                expires: DateTime.Now.AddHours(8), //Czas ważności tokenu/czas sesji
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
