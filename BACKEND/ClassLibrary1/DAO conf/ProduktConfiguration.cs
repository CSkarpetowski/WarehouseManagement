using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class ProduktConfiguration : IEntityTypeConfiguration<Produkt>
    {
        public void Configure(EntityTypeBuilder<Produkt> builder)
        {
            builder.Property(c => c.IdProd).IsRequired();
            builder.Property(c => c.Nazwa).IsRequired();
            builder.Property(c => c.LOT).IsRequired();
            builder.Property(c => c.IsGood).IsRequired();
            builder.Property(c => c.Ilosc).IsRequired();
            builder.ToTable("Produkt");
        }
    }
}