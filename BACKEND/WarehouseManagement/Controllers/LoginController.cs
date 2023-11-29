using Microsoft.AspNetCore.Mvc;
using WM.Data.Sql;

namespace WarehouseManagement.Controllers
{

    [Route("IdFromLogin")]
    [ApiController]
    public class LoginController : Controller
    {

        private readonly WarehouseDbContext _context;

        public LoginController(WarehouseDbContext context)
        {
            _context = context;
        }

        [HttpGet("{username}", Name = "UserData")]
        public int GetIdPracownik(string username)
        {
            var user = _context.Login.FirstOrDefault(x => x.Uzytkownik == username);
            return user.IdPracownik;
        }
        [HttpGet("ismanager/{username}", Name = "IsManager")]
        public bool GetIsmanager(string username)
        {
            var user = _context.Login.FirstOrDefault(x => x.Uzytkownik == username);
            var worker = _context.Pracownik.FirstOrDefault(x => x.IdPracownik == user.IdPracownik);
            return worker.IsManager;
        }
    }
}
