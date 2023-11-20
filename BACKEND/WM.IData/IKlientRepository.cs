using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;


namespace WM.IData
{
    public interface IKlientRepository
    {
        Task<Klient> GetKlient(int IdKlient);
        Task<int> AddKlient(Klient Klient);
        Task EditKlient(Klient Klient);
    }
}
