using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.IData;
using WM.IServices;
using WM.IServices.Pracownik;
using WM.Domain;
using WM.Data.Sql.Repositories;

namespace WM.Services
{
    public class PracownikService : IPracownikService
    {
        private readonly IPracownikRepository _pracownikRepository;

        public PracownikService(IPracownikRepository pracownikRepository)
        {
            _pracownikRepository = pracownikRepository;
        }
        public Task<Domain.Pracownik> GetPracownikById(int IdZamowienie)
        {
            return _pracownikRepository.GetPracownik(IdZamowienie);
        }
        public async Task<Domain.Pracownik> CreatePracownik(AddPracownik addPracownik)
        {
            var pracownik = new Pracownik(addPracownik.IdPracownik, addPracownik.Nazwa, addPracownik.Telefon, addPracownik.IsManager, addPracownik.pIdMagazyn);
            pracownik.IdPracownik = await _pracownikRepository.AddPracownik(pracownik);
            return pracownik;
        }
        public async Task EditPracownik(EditPracownik editPracownik, int IdPracownik)
        {
            var zamowienie = await _pracownikRepository.GetPracownik(IdPracownik);
            zamowienie.EditPracownik( editPracownik.Nazwa, editPracownik.Telefon, editPracownik.IsManager, editPracownik.pIdMagazyn);
            await _pracownikRepository.EditPracownik(zamowienie);
        }
    }
}
