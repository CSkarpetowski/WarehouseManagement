using WM.IServices.Pracownik;

namespace WM.IServices
{
    public interface IPracownikService
    {
        public Task<Domain.Pracownik> GetPracownikById(int IdPracownik);
        public Task<Domain.Pracownik> CreatePracownik(AddPracownik addPracownik);
        Task EditPracownik(EditPracownik editPracownik, int IdPracownik);
    }
}
