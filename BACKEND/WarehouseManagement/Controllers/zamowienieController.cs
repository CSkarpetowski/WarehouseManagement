using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WM.Data.Sql;
using Warehouse_Management.ViewModels;
using WM.Data.Sql.DAO;
using Warehouse_Management.Validation;
using Microsoft.AspNetCore.SignalR;
using WM.IServices;
using WarehouseManagement.Mappers;
using WarehouseManagement.BindingModel;


namespace WarehouseManagement.Controllers
{       
    [Route("api/zamowienie")]
    [ApiController]
    public class ZamowienieController : Controller
    {
            private readonly WarehouseDbContext _context;
            private readonly IZamowienieService _zamowienieService;

            public ZamowienieController(WarehouseDbContext context, IZamowienieService zamowienieService)
            {
                _context = context;
                _zamowienieService = zamowienieService;
            }

        [HttpGet("{IdZamowienie:min(1)}", Name = "GetZamowienie")]

        public async Task<IActionResult> GetZamowienieById(int IdZamowienie)
            {
                var zamowienie = await _zamowienieService.GetZamowienieById(IdZamowienie);
                if (zamowienie != null)
                {
                    return Ok(ZamowienieToZamowienieViewModelMapper.ZamowienieToZamowienieViewModel(zamowienie));
                }

                return NotFound();
            }
            [ValidationModel]
            public async Task<IActionResult> Post([FromBody] WM.IServices.Zamowienie.AddZamowienie createZamowienie)
            {
                var Zamowienie = await _zamowienieService.CreateZamowienie(createZamowienie);

                return Created(Zamowienie.IdZamowienie.ToString(), ZamowienieToZamowienieViewModelMapper.ZamowienieToZamowienieViewModel(Zamowienie));
            }

            [ValidationModel]
            [HttpPatch("{IdZamowienie:min(1)}", Name = "EditZamowienie")]

            public async Task<IActionResult> EditZamowienie([FromBody] WM.IServices.Zamowienie.EditZamowienie editZamowienie, int IdZamowienie)
            {
                await _zamowienieService.EditZamowienie(editZamowienie, IdZamowienie);

                return NoContent();
            }
            [ValidationModel]
            [HttpDelete("delete/{IdZamowienie:min(1)}", Name = "DelByIdZamowienie")]
            public async Task<IActionResult> DelByIdProd(int IdZamowienie)
            {
                var zamowienie = await _context.Zamowienie.FirstOrDefaultAsync(x => x.IdZamowienie == IdZamowienie);
                if (zamowienie != null)
                {
                    _context.Zamowienie.Remove(zamowienie);
                    await _context.SaveChangesAsync();
                    return Ok();
                }

                return NotFound();
        }
        [HttpGet("details/{ZamowienieId}", Name = "GetDetails")]
        public IActionResult GetDetails(int ZamowienieId) {

            var details = _context.ZamowienieLista.Include(x => x.Produkty).FirstOrDefault(x => x.zIdZamowienie == ZamowienieId);

            return Ok(details);
        }

        [HttpPost("add/order", Name ="AddOrderWithProd")]
        public IActionResult AddZamowienie([FromBody] int klient)
        {
            Zamowienie zamowienie = new Zamowienie
            {
                IsOld = false,
                zIdKlient = klient
            };

            return Ok();
        }

        [HttpPost("addList", Name ="AddList")]
        public async Task<IActionResult> AddList([FromBody] addLista addLista)
        {
            var lista = new ZamowienieLista
            {
                zIdZamowienie = addLista.zIdZamowienie,
                zIdProd = addLista.zIdProd,
                ilosc = addLista.ilosc,
                LOT = addLista.LOT
            };
            await _context.AddAsync(lista);
            return Ok();
        }

    }
    
}
