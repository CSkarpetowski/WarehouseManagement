using WM.Domain;
using WM.IData;
using WM.IServices;

namespace WM.Services
{
    public class KlientService : IKlientService
    {
        private readonly IKlientRepository _klientRepository;

        public KlientService(IKlientRepository klientRepository)
        {
            _klientRepository = klientRepository;
        }
        public Task<Klient> GetKlientByIdKlienta(int IdKlient)
        {
            return _klientRepository.GetKlient(IdKlient);
        }
        public async Task<Klient> CreateKlient(AddKlient createKlient)
        {
            var Klient = new Klient(createKlient.IdKlient, createKlient.Kierowca, createKlient.Firma, createKlient.Telefon, createKlient.NIP);
            Klient.IdKlient = await _klientRepository.AddKlient(Klient);
            return Klient;
        }
        public async Task EditKlient(EditKlient createKlient, int IdKlient)
        {
            var Klient = await _klientRepository.GetKlient(IdKlient);
            Klient.EditKlient(createKlient.Kierowca, createKlient.Firma, createKlient.Telefon, createKlient.NIP);
            await _klientRepository.EditKlient(Klient);
        }
    }
}