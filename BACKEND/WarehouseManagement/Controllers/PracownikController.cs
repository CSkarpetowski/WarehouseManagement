using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse_Management.Validation;
using WarehouseManagement.BindingModel;
using WarehouseManagement.Common;
using WarehouseManagement.Mappers;
using WM.Data.Sql;
using WM.IServices;

namespace WarehouseManagement.Controllers
{
    [Route("api/pracownik")]
    [ApiController]
    public class PracownikController : Controller
    {
        private readonly WarehouseDbContext _context;
        private readonly IPracownikService _pracownikService;

        public PracownikController(WarehouseDbContext context, IPracownikService pracownikService)
        {
            _context = context;
            _pracownikService = pracownikService;
        }

        [HttpGet("{IdPracownik:min(1)}", Name = "GetPracownik")]

        public async Task<IActionResult> GetPracownikById(int IdPracownik)
        {
            var pracownik = await _pracownikService.GetPracownikById(IdPracownik);
            if (pracownik != null)
            {
                return Ok(PracownikToPracownikViewModelMapper.PracownikToPracownikViewModel(pracownik));
            }

            return NotFound();
        }
        [ValidationModel]
        public async Task<IActionResult> Post([FromBody] WM.IServices.Pracownik.AddPracownik createPracownik)
        {
            var pracownik = await _pracownikService.CreatePracownik(createPracownik);

            return Created(pracownik.IdPracownik.ToString(), PracownikToPracownikViewModelMapper.PracownikToPracownikViewModel(pracownik));
        }

        [ValidationModel]
        [HttpPatch("{IdPracownik:min(1)}", Name = "EditPracownik")]

        public async Task<IActionResult> EditPracownik([FromBody] WM.IServices.Pracownik.EditPracownik editPracownik, int IdPracownik)
        {
            await _pracownikService.EditPracownik(editPracownik, IdPracownik);

            return NoContent();
        }
        [ValidationModel]
        [HttpDelete("delete/{IdPracownik:min(1)}", Name = "DelByIdPracownik")]
        public async Task<IActionResult> DelByIdPracownik(int IdPracownik)
        {
            var pracownik = await _context.Pracownik.FirstOrDefaultAsync(x => x.IdPracownik == IdPracownik);
            if (pracownik != null)
            {
                _context.Pracownik.Remove(pracownik);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return NotFound();
        }
        [HttpGet("all", Name ="GetAllPracownik")]
        public IActionResult All()
        {
            var pracownicy = _context.Pracownik;
            return Ok(pracownicy);
        }

        [HttpPost("SendEmail", Name = "SendEmail")]
        public IActionResult SendEmailFromBody([FromBody] SendMailModel mail)
        {
            E_mailSender.SendEmail(mail);

            return Ok();
        }
    }
}
