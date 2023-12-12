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
            //builder.Entity<Produkt>(entity =>
            //{
            //    entity.HasKey(e => e.IdProd).HasName("PRIMARY");

            //    entity.ToTable("produkt");

            //    entity.Property(e => e.IdProd)
            //        .HasColumnName("IdProd");
            //    entity.Property(e => e.Ilosc).HasColumnName("Ilosc");
            //    entity.Property(e => e.IsGood)
            //        .HasMaxLength(1)
            //        .IsFixedLength()
            //        .HasColumnName("IsGood");
            //    entity.Property(e => e.LOT)
            //        .HasMaxLength(50)
            //        .IsFixedLength()
            //        .HasColumnName("LOT");
            //    entity.Property(e => e.Nazwa)
            //        .HasMaxLength(80)
            //        .IsFixedLength()
            //        .HasColumnName("Nazwa");
            //});

            //builder.Entity<ZamowienieLista>(entity =>
            //{
            //    entity.HasKey(e => e.LpZamowienie).HasName("PRIMARY");

            //    entity.ToTable("Zamowienielista");

            //    // entity.HasIndex(e => e.zIdProd, "zamowienielista_produkt_fk");

            //    entity.Property(e => e.LpZamowienie)
            //        .HasColumnName("LpZamowienie");
            //    entity.Property(e => e.ilosc).HasColumnName("ilosc");
            //    entity.Property(e => e.LOT)
            //        .HasMaxLength(120)
            //        .IsFixedLength()
            //        .HasColumnName("LOT");
            //    entity.Property(e => e.zIdProd).HasColumnName("zIdProd");

            //    entity.HasOne(d => d.Produkt).WithMany(p => p.ZamowienieListas)
            //        .HasForeignKey(d => d.zIdProd)
            //        .OnDelete(DeleteBehavior.Cascade);
            //});



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
