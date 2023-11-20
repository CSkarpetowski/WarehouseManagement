using Warehouse_Management.ViewModels;
using WM.Domain;

namespace WarehouseManagement
{
    public class ProduktToProduktViewModelMapper
    {
        public static ProduktViewModel ProduktToProduktViewModel(Produkt Produkt)
        {
            var produktViewModel = new ProduktViewModel
            {
                IdProd = Produkt.IdProd,
                Nazwa = Produkt.Nazwa,
                LOT = Produkt.LOT,
                Ilosc = Produkt.Ilosc,
                IsGood = Produkt.IsGood
            };
            return produktViewModel;
        }
    }
}