using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class PracownikConfiguration : IEntityTypeConfiguration<Pracownik>
    {
        public void Configure(EntityTypeBuilder<Pracownik> builder)
        {
            builder.Property(c => c.IdPracownik).IsRequired();
            builder.Property(c => c.Telefon).IsRequired();
            builder.Property(c => c.Nazwa).IsRequired();
            builder.Property(c => c.Email).IsRequired();
            builder.Property(c => c.IsManager).IsRequired();
            builder.HasOne(x => x.Login)
                .WithOne(x => x.Pracownik)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<Login>(x => x.IdPracownik);

            builder.ToTable("Pracownik");
        }
    }
}