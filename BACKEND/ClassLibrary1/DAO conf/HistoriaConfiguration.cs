using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class HistoriaConfiguration : IEntityTypeConfiguration<Historia>
    {
        public void Configure(EntityTypeBuilder<Historia> builder)
        {
            builder.Property(c => c.IdHistoria).IsRequired();
            builder.Property(c => c.hIdZamowienie).IsRequired();

            builder.HasOne(c => c.Zamowienie).WithOne(c => c.Historia).OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<Historia>(c => c.hIdZamowienie);

            builder.ToTable("Historia");

        }

    }
}
