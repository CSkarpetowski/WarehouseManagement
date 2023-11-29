using Microsoft.EntityFrameworkCore;
using WM.IData;

namespace WM.Data.Sql.Repositories
{
    public class ZamowienieRepository : IZamowienieRepository
    {
        public readonly WarehouseDbContext _context;

        public ZamowienieRepository(WarehouseDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddZamowienie(Domain.Zamowienie zamowienie)
        {
            var zamowienieDAO = new DAO.Zamowienie
            {
                IsOld = zamowienie.IsOld,
                zIdKlient = zamowienie.zIdKlient

            };
            await _context.AddAsync(zamowienieDAO);
            await _context.SaveChangesAsync();
            return zamowienieDAO.IdZamowienie;
        }
        public async Task<Domain.Zamowienie> GetZamowienie(int zamowienieId)
        {
            var zamowienie = await _context.Zamowienie.FirstOrDefaultAsync(x => x.IdZamowienie == zamowienieId);
            return new Domain.Zamowienie(
                zamowienie.IdZamowienie,
                zamowienie.IsOld,
                zamowienie.zIdKlient
                );
        }
        public async Task EditZamowienie(Domain.Zamowienie zamowienie)
        {
            var EditZamowienie = await _context.Zamowienie.FirstOrDefaultAsync(x => x.IdZamowienie == zamowienie.IdZamowienie);
            EditZamowienie.IsOld = zamowienie.IsOld;
            EditZamowienie.zIdKlient = zamowienie.zIdKlient;


            await _context.SaveChangesAsync();
        }
    }
}
