using Microsoft.EntityFrameworkCore;

namespace WM.Data.Sql.zamowienie
{
    public class zamowienieRepository
    {
        private readonly WarehouseDbContext _context;

        public zamowienieRepository(WarehouseDbContext context)
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

        public async Task<Domain.Zamowienie> GetZamowienie(int id)
        {
            var zamowienie = await _context.Zamowienie.FirstOrDefaultAsync(x => x.IdZamowienie == id);
            return new Domain.Zamowienie(zamowienie.IdZamowienie,
                zamowienie.IsOld,
                zamowienie.zIdKlient);
        }


    }
}
