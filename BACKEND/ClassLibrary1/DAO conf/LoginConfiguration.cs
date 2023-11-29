using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class LoginConfiguration : IEntityTypeConfiguration<Login>
    {
        public void Configure(EntityTypeBuilder<Login> builder)
        {
            builder.Property(c => c.IdDane).IsRequired();
            builder.Property(c => c.Haslo).IsRequired();
            builder.Property(c => c.Uzytkownik).IsRequired();
            builder.Property(c => c.IdPracownik).IsRequired();
            builder.HasOne(c => c.Pracownik)
                .WithOne(c => c.Login).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("Login");
        }
    }
}