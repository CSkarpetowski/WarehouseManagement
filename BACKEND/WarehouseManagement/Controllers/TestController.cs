using Microsoft.AspNetCore.Mvc;

namespace WarehouseManagement.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Połączenie udane --->  React ASP.NET !");
        }
    }
}
