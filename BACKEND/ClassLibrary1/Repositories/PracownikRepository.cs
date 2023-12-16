using Microsoft.EntityFrameworkCore;
using WM.IData;

namespace WM.Data.Sql.Repositories
{
    public class PracownikRepository : IPracownikRepository
    {
        private readonly WarehouseDbContext _context;

        public PracownikRepository(WarehouseDbContext context)
        {
            _context = context;
        }
        public async Task<int> AddPracownik(Domain.Pracownik p)
        {
            var PracownikDAO = new DAO.Pracownik
            {
                Nazwa = p.Nazwa,
                Telefon = p.Telefon,
                Email = p.Email,
                IsManager = p.IsManager,
                pIdMagazyn = p.pIdMagazyn
            };
            await _context.AddAsync(PracownikDAO);
            await _context.SaveChangesAsync();
            return PracownikDAO.IdPracownik;
        }


        public async Task<Domain.Pracownik> GetPracownik(int idPracownik)
        {
            var pracownik = await _context.Pracownik.FirstOrDefaultAsync(x => x.IdPracownik == idPracownik);
            return new Domain.Pracownik(
                pracownik.IdPracownik,
                pracownik.Nazwa,
                pracownik.Telefon,
                pracownik.Email,
                pracownik.IsManager,
                pracownik.pIdMagazyn
                );
        }

        public async Task EditPracownik(Domain.Pracownik pracownik)
        {
            var EditPracownik = await _context.Pracownik.FirstOrDefaultAsync(x => x.IdPracownik == pracownik.IdPracownik);
            EditPracownik.Nazwa = pracownik.Nazwa;
            EditPracownik.Telefon = pracownik.Telefon;
            EditPracownik.Email = pracownik.Email;
            EditPracownik.IsManager = pracownik.IsManager;
            EditPracownik.pIdMagazyn = pracownik.pIdMagazyn;

            await _context.SaveChangesAsync();

        }
    }
}
