using Warehouse_Management.ViewModels;
using WM.Domain;

namespace WarehouseManagement
{
    public class KlientToKlientViewModelMapper
    {
        public static KlientViewModel KlientToKlientViewModel(Klient Klient)
        {
            var klientViewModel = new KlientViewModel
            {
                IdKlient = Klient.IdKlient,
                Kierowca = Klient.Kierowca,
                Firma = Klient.Firma,
                Telefon = Klient.Telefon,
                NIP = Klient.NIP,
            };
            return klientViewModel;
        }
    }
}
