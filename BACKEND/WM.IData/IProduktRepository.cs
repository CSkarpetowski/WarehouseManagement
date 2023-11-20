using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;


namespace WM.IData
{
    public interface IProduktRepository
    {
        Task<Produkt> GetProdukt(int IdProd);
        Task<int> AddProdukt(Produkt Produkt);
        Task EditProdukt(Produkt Produkt);
    }
}