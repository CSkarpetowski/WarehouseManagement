using WM.Domain;

namespace WM.IServices
{
    public interface IKlientService
    {
        public Task<Klient> GetKlientByIdKlienta(int IdKlient);
        public Task<Klient> CreateKlient(AddKlient createKlient);
        Task EditKlient(EditKlient AddKlient, int IdKlienta); 
    }
}
