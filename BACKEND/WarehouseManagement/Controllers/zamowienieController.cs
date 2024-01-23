using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse_Management.Validation;
using WarehouseManagement.BindingModel;
using WarehouseManagement.Mappers;
using WM.Data.Sql;
using WM.Data.Sql.DAO;
using WM.IServices;
using Microsoft.AspNetCore.SignalR;
using WarehouseManagement.Hubs;


namespace WarehouseManagement.Controllers
{
    [Route("api/zamowienie")]
    [ApiController]
    public class ZamowienieController : Controller
    {
        private readonly WarehouseDbContext _context;
        private readonly IZamowienieService _zamowienieService;
        private readonly IHubContext<NotificationHub> _hubContext;
        public ZamowienieController(WarehouseDbContext context, IZamowienieService zamowienieService, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _zamowienieService = zamowienieService;
            _hubContext = hubContext;
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
                zamowienie.IsOld = true;
                _context.Update(zamowienie);
                _context.SaveChanges();

                Historia historia = new Historia
                {
                    hIdZamowienie = zamowienie.IdZamowienie,
                    Realizacja = DateTime.Now
                };

                _context.Historia.AddAsync(historia);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return NotFound();
        }
        [HttpGet("details/{ZamowienieId}", Name = "GetDetails")]
        public IActionResult GetDetails(int ZamowienieId)
        {

           

            var details = _context.ZamowienieLista.Include(x => x.Produkty).Where(x => x.zIdZamowienie == ZamowienieId); 


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
            await _hubContext.Clients.All.SendAsync("ProductChanged");
            await _context.SaveChangesAsync();
            var list = zamowienie.Produkty;
            

            
            foreach (var item in list )
            {
                ZamowienieLista toAdd = new ZamowienieLista();

                toAdd.zIdZamowienie = main.IdZamowienie;
                toAdd.ilosc = item.Ilosc;
                int ilosctocheck = checkIlosc(item.IdProd);
                toAdd.LOT = item.LOT;
                if (item.Ilosc > ilosctocheck)
                {
                    toAdd.ilosc = ilosctocheck;
                }
                toAdd.zIdProd = item.IdProd;
                var prod = _context.Produkt.FirstOrDefault(x => x.IdProd == item.IdProd);
                
                if (item.Ilosc > ilosctocheck)
                {
                    prod.Ilosc -= ilosctocheck;
                }
                else
                {
                    prod.Ilosc -= item.Ilosc;
                }
                
                _context.Update(prod);
                await _context.AddAsync(toAdd);
                await _context.SaveChangesAsync();
                
            }
            
            return Ok();
        }

        public int checkIlosc(int idProd)
        {
            var prod = _context.Produkt.FirstOrDefault(x => x.IdProd == idProd);
            return prod.Ilosc;
        }
        [HttpGet("getAllOld", Name = "getAllOld")]
        public IActionResult getAllOld()
        {
            var zamowienia = _context.Zamowienie.Where(x => x.IsOld == true).Include(x => x.Klient);
            return Ok(zamowienia);
        }
        [HttpGet("getAllOld2", Name = "getAllOld2")]
        public IActionResult getAllOld2()
        {
            var zamowienia = _context.Historia.Include(x => x.Zamowienie).ThenInclude(x => x.Klient).Where(x=> x.Zamowienie.IsOld == true);
            return Ok(zamowienia);
        }

    }

}
