using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse_Management.Validation;
using WM.Data.Sql;
using WM.IServices;

namespace WarehouseManagement.Controllers
{
    [Route("api/klient")]
    [ApiController]
    public class KlientController : Controller
    {
        private readonly WarehouseDbContext _context;
        private readonly IKlientService _klientService;

        public KlientController(WarehouseDbContext context, IKlientService klientService)
        {
            _context = context;
            _klientService = klientService;
        }

        [HttpGet("{IdKlient:min(1)}", Name = "GetKlient")]


        public async Task<IActionResult> GetKlientById(int IdKlient)
        {
            var Klient = await _klientService.GetKlientByIdKlienta(IdKlient);
            if (Klient != null)
            {
                return Ok(KlientToKlientViewModelMapper.KlientToKlientViewModel(Klient));
            }

            return NotFound();
        }
        [ValidationModel]
        public async Task<IActionResult> Post([FromBody] WM.IServices.AddKlient createKlient)
        {
            var Klient = await _klientService.CreateKlient(createKlient);

            return Created(Klient.IdKlient.ToString(), KlientToKlientViewModelMapper.KlientToKlientViewModel(Klient));
        }

        [ValidationModel]
        [HttpPatch("{IdKlient:min(1)}", Name = "EditKlient")]

        public async Task<IActionResult> EditKlient([FromBody] WM.IServices.EditKlient editKlient, int IdKlient)
        {
            await _klientService.EditKlient(editKlient, IdKlient);

            return NoContent();
        }
        [ValidationModel]
        [HttpDelete("delete/{IdKlient:min(1)}", Name = "DelById")]
        public async Task<IActionResult> DelById(int IdKlient)
        {
            var klient = await _context.Klient.FirstOrDefaultAsync(x => x.IdKlient == IdKlient);
            if (klient != null)
            {
                _context.Klient.Remove(klient);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return NotFound();
        }

    }






}