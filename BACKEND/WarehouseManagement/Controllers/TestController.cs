using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WarehouseManagement.Hubs;
using System.Threading.Tasks;

namespace WarehouseManagement.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class TestController : Controller
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public TestController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // Tutaj możesz wysłać powiadomienie do wszystkich klientów podłączonych do huba
            await _hubContext.Clients.All.SendAsync("ProductChanged");

            return Ok("Połączenie udane ---> React ASP.NET !");
        }
    }
}
