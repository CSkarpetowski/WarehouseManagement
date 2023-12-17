using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class KomunikatConfiguration : IEntityTypeConfiguration<Komunikat>
    {
        public void Configure(EntityTypeBuilder<Komunikat> builder)
        {
            builder.Property(c => c.IdKomunikat).IsRequired();
            builder.Property(c => c.Tresc).IsRequired();
            builder.Property(c => c.Czas).IsRequired();

            builder.ToTable("Komunikat");
        }
    }
}
