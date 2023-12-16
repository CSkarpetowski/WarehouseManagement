using Microsoft.AspNetCore.SignalR;

namespace WarehouseManagement.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendNotificationDel()
        {
            await Clients.All.SendAsync("ProductChanged");
        }

        public Task sendNotification()
        {
            return Clients.All.SendAsync("ProductChanged");
        }
    }
}
