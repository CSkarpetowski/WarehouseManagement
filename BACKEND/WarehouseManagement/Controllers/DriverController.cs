using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.IdentityModel.Tokens;
using WM.Data.Sql;
using WM.Data.Sql.DAO;

namespace WarehouseManagement.Controllers
{
    [Route("/Drivers")]
    [ApiController]
    public class DriverController : Controller
    {
        private readonly WarehouseDbContext _context;

        public DriverController(WarehouseDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var Drivers = _context.Klient.Include(x => x.Zamowienia.Where(x=> x.IsOld == false));
            return Ok(Drivers);
        }

        [HttpGet("ForDrivers", Name = "ForDrivers")]
        public IActionResult GetAllForDrivers()
        {
            var Drivers = _context.Klient.Where(klient => klient.Zamowienia.Any(zamowienie => !zamowienie.IsOld))
                .Where(klient => klient.Zamowienia.Any())
                .Include(klient => klient.Zamowienia.Where(zamowienie => !zamowienie.IsOld));
            return Ok(Drivers);
        }

        [HttpGet("forlist", Name = "ForList")]
        public IActionResult GetForList()
        {

            var clients = _context.Klient.GroupBy(x => x.Firma);

            return Ok(clients);
        }
    }
} 
