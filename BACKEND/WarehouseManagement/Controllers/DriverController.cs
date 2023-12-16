using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WM.Data.Sql;

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

        [HttpGet("forlist", Name = "ForList")]
        public IActionResult GetForList()
        {

            var clients = _context.Klient.GroupBy(x => x.Firma);

            return Ok(clients);
        }
    }
}
