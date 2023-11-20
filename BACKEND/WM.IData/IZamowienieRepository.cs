using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;

namespace WM.IData
{
    public interface IZamowienieRepository
    {
        Task<int> AddZamowienie(Domain.Zamowienie zamowienie);
        Task<Zamowienie> GetZamowienie(int zamowienieId);
        Task EditZamowienie(Zamowienie zamowienie);
    }
}
