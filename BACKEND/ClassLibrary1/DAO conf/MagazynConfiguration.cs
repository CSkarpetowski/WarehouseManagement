using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class MagazynConfiguration : IEntityTypeConfiguration<Magazyn>
    {
        public void Configure(EntityTypeBuilder<Magazyn> builder)
        {
            builder.Property(c => c.IdMagazyn).IsRequired();
            builder.Property(c => c.Pojemnosc).IsRequired();
            builder.Property(c => c.Nazwa).IsRequired();
            builder.HasMany(x => x.Komunikaty).WithOne(x => x.Magazyn).OnDelete(DeleteBehavior.Cascade)
             .HasForeignKey(x => x.kIdMagazyn);
            builder.HasMany(x => x.Produkty).WithOne(x => x.Magazyn).OnDelete(DeleteBehavior.Cascade)
             .HasForeignKey(x => x.pIdMagazyn);
            builder.HasMany(x => x.Pracownicy).WithOne(x => x.Magazyn)
            .HasForeignKey(x => x.pIdMagazyn) // Klucz obcy w Pracownik
            .OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("Magazyn");
        }
    }
}