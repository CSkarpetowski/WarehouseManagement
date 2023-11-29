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
