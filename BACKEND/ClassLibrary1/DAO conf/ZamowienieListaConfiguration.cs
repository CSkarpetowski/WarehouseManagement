using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    internal class ZamowienieListaConfiguration : IEntityTypeConfiguration<ZamowienieLista>
    {
        public void Configure(EntityTypeBuilder<ZamowienieLista> builder)
        {
            builder.Property(c => c.LpZamowienie).IsRequired();
            builder.Property(c => c.zIdZamowienie).IsRequired();
            builder.Property(c => c.LOT).IsRequired();
            builder.Property(c => c.ilosc).IsRequired();
            builder.Property(c => c.zIdProd).IsRequired();
            builder.HasOne(d => d.Produkty).WithMany(p => p.ZamowienieLista)
                    .HasForeignKey(d => d.zIdProd)
                    .OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("ZamowienieLista");
        }
    }
}