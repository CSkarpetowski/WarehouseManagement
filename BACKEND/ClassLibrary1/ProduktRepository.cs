using Microsoft.EntityFrameworkCore;
using WM.Domain;
using WM.IData;

namespace WM.Data.Sql.ProduktRepository
{
    public class ProduktRepository : IProduktRepository
    {
        private readonly WarehouseDbContext _context;

        public ProduktRepository(WarehouseDbContext context)
        {
            _context = context;

        }

        public async Task<Produkt> GetProdukt(int IdProd)
        {
            var Produkt = await _context.Produkt.FirstOrDefaultAsync(x => x.IdProd == IdProd);
            return new Domain.Produkt(
                Produkt.IdProd,
                Produkt.Nazwa,
                Produkt.LOT,
                Produkt.Ilosc,
                Produkt.IsGood,
                Produkt.pIdMagazyn);
        }

        public async Task<int> AddProdukt(Produkt Produkt)
        {
            var produkt = new DAO.Produkt
            {
                IdProd = Produkt.IdProd,
                Nazwa = Produkt.Nazwa,
                LOT = Produkt.LOT,
                Ilosc = Produkt.Ilosc,
                IsGood = Produkt.IsGood
            };
            await _context.AddAsync(produkt);
            await _context.SaveChangesAsync();
            return produkt.IdProd;
        }
        public async Task EditProdukt(Produkt Produkt)
        {
            var EditProdukt = await _context.Produkt.FirstOrDefaultAsync(x => x.IdProd == Produkt.IdProd);
            EditProdukt.Nazwa = Produkt.Nazwa;
            EditProdukt.LOT = Produkt.LOT;
            EditProdukt.Ilosc = Produkt.Ilosc;
            EditProdukt.IsGood = Produkt.IsGood;

            await _context.SaveChangesAsync();
        }
    }
}

