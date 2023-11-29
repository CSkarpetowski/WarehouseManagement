using WM.Domain;

namespace WM.IData
{
    public interface IPracownikRepository
    {
        Task<int> AddPracownik(Domain.Pracownik pracownik);
        Task<Pracownik> GetPracownik(int userId);
        Task EditPracownik(Pracownik pracownik);
    }
}
