using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var Drivers = _context.Klient.Include(x => x.Zamowienia);
            return Ok(Drivers);
        }
    }
}
