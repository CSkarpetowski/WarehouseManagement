using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;
using WM.IServices;

namespace WM.IServices
{
    public interface IKlientService
    {
        public Task<Klient> GetKlientByIdKlienta(int IdKlient);
        public Task<Klient> CreateKlient(AddKlient createKlient);
        Task EditKlient(EditKlient AddKlient, int IdKlienta); //Tu może być sraka
    }
}
