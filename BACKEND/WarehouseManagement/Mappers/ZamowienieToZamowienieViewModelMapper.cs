using Warehouse_Management.ViewModels;
using WM.Domain;

namespace WarehouseManagement.Mappers
{
    public class ZamowienieToZamowienieViewModelMapper
    {
        public static ZamowienieViewModel ZamowienieToZamowienieViewModel(Zamowienie Zamowienie)
        {
            var ZamowienieViewModel = new ZamowienieViewModel
            {
                IdZamowienie = Zamowienie.IdZamowienie,
                IsOld = Zamowienie.IsOld,
                zIdKlient = Zamowienie.zIdKlient
            };
            return ZamowienieViewModel;
        }
    }
}
