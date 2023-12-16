using Microsoft.AspNetCore.Mvc;
using WarehouseManagement.BindingModel;
using WM.Data.Sql;
using WM.Data.Sql.DAO;


namespace WarehouseManagement.Controllers
{
    [Route("api/historia")]
    [ApiController]
    public class HistoriaController : Controller
    {
        private readonly WarehouseDbContext _context;

        public HistoriaController(WarehouseDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var historia = _context.Historia;
            return Ok(historia);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddHistoria historia)
        {
            var historiaDao = new Historia
            {
                hIdZamowienie = historia.hIdZamowienie,
                Realizacja = historia.Realizacja
            };
            _context.Historia.Add(historiaDao);
            await _context.SaveChangesAsync();

            return Ok(historiaDao);
        }
    }
}

