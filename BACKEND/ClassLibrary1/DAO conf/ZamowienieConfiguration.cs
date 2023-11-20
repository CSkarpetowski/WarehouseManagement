using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.DAOConfigurations
{
    public class ZamowienieConfiguration : IEntityTypeConfiguration<Zamowienie>
    {
        public void Configure(EntityTypeBuilder<Zamowienie> builder)
        {
            builder.Property(c => c.IdZamowienie).IsRequired();
            builder.Property(c => c.zIdKlient).IsRequired();
            builder.Property(c => c.IsOld).IsRequired();

            builder.HasMany(c => c.ZamowienieListy).WithOne(c => c.Zamowienie).OnDelete(DeleteBehavior.Cascade)
            .HasForeignKey(c => c.zIdZamowienie);


            builder.ToTable("Zamowienie");

        }
    }
}