using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;
using WM.IServices.Zamowienie;


namespace WM.IServices
{
    public interface IZamowienieService
    {
        public Task<Domain.Zamowienie> GetZamowienieById(int IdZamowienie);
        public Task<Domain.Zamowienie> CreateZamowienie(AddZamowienie addZamowienie);
        Task EditZamowienie(EditZamowienie editZamowienie, int IdZamowienie);
    }
}
