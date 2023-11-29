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
