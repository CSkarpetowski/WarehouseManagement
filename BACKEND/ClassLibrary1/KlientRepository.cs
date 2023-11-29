using Microsoft.EntityFrameworkCore;
using WM.Domain;
using WM.IData;

namespace WM.Data.Sql.KlientRepository
{
    public class KlientRepository : IKlientRepository
    {
        private readonly WarehouseDbContext _context;

        public KlientRepository(WarehouseDbContext context)
        {
            _context = context;

        }

        public async Task<Klient> GetKlient(int IdKlient)
        {
            var Klient = await _context.Klient.FirstOrDefaultAsync(x => x.IdKlient == IdKlient);
            return new Domain.Klient(
                Klient.IdKlient,
                Klient.Kierowca,
                Klient.Firma,
                Klient.Telefon,
                Klient.NIP);
        }

        public async Task<int> AddKlient(Klient Klient)
        {
            var klient = new DAO.Klient
            {
                IdKlient = Klient.IdKlient,
                Kierowca = Klient.Kierowca,
                Firma = Klient.Firma,
                Telefon = Klient.Telefon,
                NIP = Klient.NIP
            };
            await _context.AddAsync(klient);
            await _context.SaveChangesAsync();
            return klient.IdKlient;
        }
        public async Task EditKlient(Klient Klient)
        {
            var EditKlient = await _context.Klient.FirstOrDefaultAsync(x => x.IdKlient == Klient.IdKlient);
            EditKlient.Kierowca = Klient.Kierowca;
            EditKlient.Firma = Klient.Firma;
            EditKlient.Telefon = Klient.Telefon;
            EditKlient.NIP = Klient.NIP;

            await _context.SaveChangesAsync();
        }
    }
}
