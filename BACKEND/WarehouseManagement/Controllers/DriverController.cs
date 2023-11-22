using Microsoft.AspNetCore.Mvc;
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
        public List<Klient> GetAll()
        {
            List<Klient> Drivers = _context.Klient.ToList();
            return Drivers;
        }
    }
}
