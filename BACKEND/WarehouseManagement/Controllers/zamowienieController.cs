using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse_Management.Validation;
using WarehouseManagement.BindingModel;
using WarehouseManagement.Mappers;
using WM.Data.Sql;
using WM.Data.Sql.DAO;
using WM.IServices;


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
        public IActionResult GetDetails(int ZamowienieId)
        {

            //var details = _context.ZamowienieLista.Include(x => x.Produkty).FirstOrDefault(x => x.zIdZamowienie == ZamowienieId);

            var details = _context.ZamowienieLista.Include(x => x.Produkty).Where(x => x.zIdZamowienie == ZamowienieId);// Tak powinno byæ, ale react nie ogarnia mapowania tego 


            return Ok(details);
        }

        [HttpPost("add/order", Name = "AddOrderWithProd")]
        public IActionResult AddZamowienie([FromBody] int klient)
        {
            Zamowienie zamowienie = new Zamowienie
            {
                IsOld = false,
                zIdKlient = klient
            };

            return Ok();
        }

        [HttpPost("addList", Name = "AddList")]
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

        [HttpPost("addListTable", Name = "AddListTable")]
        public async Task<IActionResult> AddListTable([FromBody] List<addLista> addLista)
        {
            List<ZamowienieLista> list = new List<ZamowienieLista>();
            foreach (var item in addLista)
            {
                ZamowienieLista temp = new ZamowienieLista
                {
                    zIdZamowienie = item.zIdZamowienie,
                    zIdProd = item.zIdProd,
                    ilosc = item.ilosc,
                    LOT = item.LOT
                };

                list.Add(temp);
            }
            
            await _context.AddAsync(list);
            return Ok();
        }

        [HttpPost("addZamowienie", Name = "addZamowienie")]
        public async Task<IActionResult> addZamowienie([FromBody] AddZamowienielista zamowienie)
        {
            Zamowienie main = new Zamowienie
            {
                zIdKlient = zamowienie.Klient,
                IsOld = false
            };
            await _context.AddAsync(main);
            await _context.SaveChangesAsync();
            var list = zamowienie.Produkty;
            

            
            foreach (var item in list )
            {
                ZamowienieLista toAdd = new ZamowienieLista();

                toAdd.zIdZamowienie = main.IdZamowienie;
                toAdd.ilosc = item.Ilosc;
                toAdd.LOT = item.LOT;
                toAdd.zIdProd = item.IdProd;
                await _context.AddAsync(toAdd);
                await _context.SaveChangesAsync();
                
            }
            
            
            


            return Ok();
        }

    }

}
