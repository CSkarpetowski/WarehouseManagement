using Microsoft.EntityFrameworkCore;
using WM.Data.Sql.DAO;
using WM.Data.Sql.DAOConfigurations;
namespace WM.Data.Sql
{
    public class WarehouseDbContext : DbContext
    {
        public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options) : base(options) { }

        //Ustawienie klas z folderu DAO jako tabele bazy danych
        public virtual DbSet<Klient> Klient { get; set; }
        public virtual DbSet<Magazyn> Magazyn { get; set; }
        public virtual DbSet<Komunikat> Komunikat { get; set; }
        public virtual DbSet<Zamowienie> Zamowienie { get; set; }
        public virtual DbSet<ZamowienieLista> ZamowienieLista { get; set; }
        public virtual DbSet<Produkt> Produkt { get; set; }
        public virtual DbSet<Pracownik> Pracownik { get; set; }
        public virtual DbSet<Login> Login { get; set; }
        public virtual DbSet<Historia> Historia { get; set; }

        //przykład konfiguracji modeli/encji poprzez klasy konfiguracyjne z folderu DAOConfigurations
        protected override void OnModelCreating(ModelBuilder builder)
        {
          



            builder.ApplyConfiguration(new KlientConfiguration());
            builder.ApplyConfiguration(new MagazynConfiguration());
            builder.ApplyConfiguration(new KomunikatConfiguration());
            builder.ApplyConfiguration(new ZamowienieConfiguration());
            builder.ApplyConfiguration(new ZamowienieListaConfiguration());
            builder.ApplyConfiguration(new ProduktConfiguration());
            builder.ApplyConfiguration(new PracownikConfiguration());
            builder.ApplyConfiguration(new LoginConfiguration());
            builder.ApplyConfiguration(new HistoriaConfiguration());
        }

    }
}
