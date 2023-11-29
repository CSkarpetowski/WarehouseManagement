using WM.Domain;
using WM.IData;
using WM.IServices;
using WM.IServices.Zamowienie;

namespace WM.Services
{
    public class ZamowienieService : IZamowienieService
    {
        private readonly IZamowienieRepository _zamowienieRepository;

        public ZamowienieService(IZamowienieRepository zamowienieRepository)
        {
            _zamowienieRepository = zamowienieRepository;
        }
        public Task<Zamowienie> GetZamowienieById(int IdZamowienie)
        {
            return _zamowienieRepository.GetZamowienie(IdZamowienie);
        }
        public async Task<Zamowienie> CreateZamowienie(AddZamowienie addZamowienie)
        {
            var zamowienie = new Zamowienie(addZamowienie.IdZamowienie, addZamowienie.IsOld, addZamowienie.zIdKlient);
            zamowienie.IdZamowienie = await _zamowienieRepository.AddZamowienie(zamowienie);
            return zamowienie;
        }
        public async Task EditZamowienie(EditZamowienie editZamowienie, int IdZamowienia)
        {
            var zamowienie = await _zamowienieRepository.GetZamowienie(IdZamowienia);
            zamowienie.EditZamowienie(editZamowienie.IsOld, editZamowienie.zIdKlient);
            await _zamowienieRepository.EditZamowienie(zamowienie);
        }
    }
}
