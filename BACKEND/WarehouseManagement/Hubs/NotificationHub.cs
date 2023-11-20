using Microsoft.AspNetCore.SignalR;

namespace WarehouseManagement.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendNotificationDel()
        {
            await Clients.All.SendAsync("ProductChanged");
        }
    }
}
