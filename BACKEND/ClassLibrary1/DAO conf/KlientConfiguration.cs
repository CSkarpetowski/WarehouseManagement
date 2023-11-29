using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class KlientConfiguration : IEntityTypeConfiguration<Klient>
    {
        public void Configure(EntityTypeBuilder<Klient> builder)
        {
            builder.Property(c => c.IdKlient).IsRequired();
            builder.Property(c => c.Firma).IsRequired();
            builder.Property(c => c.NIP).IsRequired();
            builder.Property(c => c.Telefon).IsRequired();
            builder.Property(c => c.Kierowca).IsRequired();
            builder.HasMany(x => x.Zamowienia).WithOne(x => x.Klient).OnDelete(DeleteBehavior.Cascade)
              .HasForeignKey(x => x.zIdKlient);
            builder.ToTable("Klient");
        }
    }
}
