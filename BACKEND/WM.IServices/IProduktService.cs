using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;
using WM.IServices;

namespace WM.IServices
{
    public interface IProduktService
    {
        public Task<Produkt> GetProduktByIdProduktu(int IdProd);
        public Task<Produkt> CreateProdukt(AddProdukt createProdukt);
        Task EditProdukt(EditProdukt AddProdukt, int IdProd); //Tu może być sraka
    }
}