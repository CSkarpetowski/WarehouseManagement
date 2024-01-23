using WM.Domain;

namespace WM.IServices
{
    public interface IProduktService
    {
        public Task<Produkt> GetProduktByIdProduktu(int IdProd);
        public Task<Produkt> CreateProdukt(AddProdukt createProdukt);
        Task EditProdukt(EditProdukt AddProdukt, int IdProd); 
    }
}