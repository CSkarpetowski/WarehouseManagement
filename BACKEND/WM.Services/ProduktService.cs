using WM.Domain;
using WM.IData;
using WM.IServices;

namespace WM.Services
{
    public class ProduktService : IProduktService
    {
        private readonly IProduktRepository _produktRepository;

        public ProduktService(IProduktRepository produktRepository)
        {
            _produktRepository = produktRepository;
        }
        public Task<Produkt> GetProduktByIdProduktu(int IdProd)
        {
            return _produktRepository.GetProdukt(IdProd);
        }
        public async Task<Produkt> CreateProdukt(AddProdukt createProdukt)
        {
            var Produkt = new Produkt(createProdukt.IdProd, createProdukt.Nazwa, createProdukt.LOT, createProdukt.Ilosc, createProdukt.IsGood, createProdukt.pIdMagazyn);
            Produkt.IdProd = await _produktRepository.AddProdukt(Produkt);
            return Produkt;
        }
        public async Task EditProdukt(EditProdukt createProdukt, int IdProd)
        {
            var Produkt = await _produktRepository.GetProdukt(IdProd);
            Produkt.EditProdukt(createProdukt.Nazwa, createProdukt.LOT, createProdukt.Ilosc, createProdukt.IsGood);
            await _produktRepository.EditProdukt(Produkt);
        }
    }
}