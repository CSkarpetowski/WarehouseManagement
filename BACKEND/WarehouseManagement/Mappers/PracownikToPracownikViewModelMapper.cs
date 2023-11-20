using Warehouse_Management.ViewModels;
using WM.Domain;

namespace WarehouseManagement.Mappers
{
    public class PracownikToPracownikViewModelMapper
    {
        public static PracownikViewModel PracownikToPracownikViewModel(Pracownik Pracownik)
        {
            var PracownikViewModel = new PracownikViewModel
            {
                IdPracownik = Pracownik.IdPracownik,
                Nazwa = Pracownik.Nazwa,
                Telefon = Pracownik.Telefon,
                IsManager = Pracownik.IsManager,
                pIdMagazyn = Pracownik.pIdMagazyn
            };
            return PracownikViewModel;
        }
    }
}
