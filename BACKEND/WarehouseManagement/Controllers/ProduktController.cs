using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using Warehouse_Management.Validation;
using Warehouse_Management.ViewModels;
using WarehouseManagement.BindingModel;
using Microsoft.AspNetCore.SignalR;
using WarehouseManagement.Hubs;
using WM.Data.Sql;
using WM.Data.Sql.DAO;
using WM.IServices;

namespace WarehouseManagement.Controllers
{
    [Route("api/produkt")]
    [ApiController]
    public class ProduktController : Controller
    {
        private readonly WarehouseDbContext _context;
        private readonly IProduktService _produktService;
        private readonly IHubContext<NotificationHub> _hubContext;
        public ProduktController(WarehouseDbContext context, IProduktService produktService, IHubContext<NotificationHub> hub)
        {
            _hubContext = hub;
            _context = context;
            _produktService = produktService;
          
        }

        [HttpGet("{IdProdukt:min(1)}", Name = "GetProdukt")]


        public async Task<IActionResult> GetProduktById(int IdProdukt)
        {
            var Produkt = await _produktService.GetProduktByIdProduktu(IdProdukt);
            if (Produkt != null)
            {
                return Ok(ProduktToProduktViewModelMapper.ProduktToProduktViewModel(Produkt));
            }

            return NotFound();
        }


       

        [ValidationModel]
        public async Task<IActionResult> Post([FromBody] AddProduct addProduct)
        {
            var product = new Produkt
            {
                Nazwa = addProduct.Nazwa,
                Ilosc = addProduct.Ilosc,
                LOT = addProduct.LOT,
                IsGood = addProduct.IsGood,
                pIdMagazyn = addProduct.pIdMagazyn
            };
            Debug.WriteLine("Dane, które próbujesz dodać do bazy: " + Newtonsoft.Json.JsonConvert.SerializeObject(product));

            if (product.Ilosc == 0)
            {
                return BadRequest("Ilość nie może być równa 0");
            }

            if (product.Ilosc < 0)
            {
                return BadRequest("Ilość nie może być mniejsza od 0");
            }

            var stan = _context.Magazyn.FirstOrDefault(x => x.IdMagazyn == product.pIdMagazyn);
            int pojemnosc = stan.Pojemnosc;
            var ilosc = _context.Produkt.Where(x => x.pIdMagazyn == product.pIdMagazyn);
            int ilenastanie = 0;
            foreach (var item in ilosc)
            {
                ilenastanie += item.Ilosc;

            }

            StanGet aktualny = new StanGet
            {
                ilosc = ilenastanie,
                pojemnosc = pojemnosc
            };

            if (aktualny.ilosc + product.Ilosc > aktualny.pojemnosc)
            {
                return BadRequest("Nie można dodać więcej produktów, ponieważ przekroczono pojemność magazynu, zmień magazyn albo rozłóż na dwa magazyny");
            }   

            await _context.AddAsync(product);
            await _hubContext.Clients.All.SendAsync("ProductChanged");
            await _context.SaveChangesAsync();
            

            return Created(product.IdProd.ToString(), new ProduktViewModel
            {
                IdProd = product.IdProd,
                Nazwa = product.Nazwa,
                Ilosc = product.Ilosc,
                LOT = product.LOT,
                IsGood = product.IsGood,
                pIdMagazyn = product.pIdMagazyn
            });
        }



        [ValidationModel]
        [HttpPatch("{IdProd:min(1)}", Name = "EditProdukt")]

        public async Task<IActionResult> EditProdukt([FromBody] WM.IServices.EditProdukt editProdukt, int IdProd)
        {
            await _produktService.EditProdukt(editProdukt, IdProd);

            return NoContent();
        }


        [ValidationModel]
        [HttpDelete("delete/{IdProd:min(1)}", Name = "DelByIdProd")]
        public async Task<IActionResult> DelByIdProd(int IdProd)
        {
            var produkt = await _context.Produkt.FirstOrDefaultAsync(x => x.IdProd == IdProd);
            if (produkt != null)
            {
                _context.Produkt.Remove(produkt);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return NotFound();
        }

        [HttpGet("all/{Idmag}", Name = "GetAllFromMag")]
        public IActionResult GetAllFromMag(int Idmag)
        {

            var products = _context.Produkt.Where(x => x.pIdMagazyn == Idmag ).Where(x => x.Ilosc != 0).OrderBy(x => x.IdProd);

            return Ok(products);
        }
        [HttpGet("all", Name = "GetAll")]
        public IActionResult GetAll()
        {

            var products = _context.Produkt.Where(x => x.Ilosc != 0).OrderBy(x => x.IdProd);

            return Ok(products);
        }

        [HttpGet("magStan/{IdMag}", Name = "magStan")]
        public IActionResult Getmagstan(int Idmag)
        {
            var stan = _context.Magazyn.FirstOrDefault(x => x.IdMagazyn == Idmag);
            int pojemnosc = stan.Pojemnosc;
            var ilosc = _context.Produkt.Where(x => x.pIdMagazyn == Idmag);
            int ilenastanie = 0;
            foreach (var item in ilosc)
            {
                ilenastanie += item.Ilosc;

            }

            StanGet aktualny = new StanGet
            {
                ilosc = ilenastanie,
                pojemnosc = pojemnosc
            };

        return Ok(aktualny);
        }

        public class CzyOkModel
        {
            public bool isGood { get; set; }
        }

        [HttpPatch("isGood/{idProd}", Name = "isGoodEdit")]
        public async Task<IActionResult> EditIsGood(int idProd, [FromBody] CzyOkModel model)
        {
            // Pobieranie produktu na podstawie ID
            var prod = _context.Produkt.FirstOrDefault(x => x.IdProd == idProd);

            if (prod == null)
            {
                return NotFound(); // Obsługa przypadku, gdy produkt o danym ID nie istnieje
            }

            prod.IsGood = model.isGood;

            _context.Produkt.Update(prod);
            await _context.SaveChangesAsync();

            return Ok(prod);
        }


        [HttpPost("GetAllLot/{lot}", Name = "GetAllLot")]
        public IActionResult TryLot(string lot)

        {
            var lotInBase = _context.Produkt.Where(x => x.LOT == lot);

            if (lotInBase == null)
            {
                return Ok(true);
            }

            else
            {
                return Ok(false);
            }
            
        }



    }






}