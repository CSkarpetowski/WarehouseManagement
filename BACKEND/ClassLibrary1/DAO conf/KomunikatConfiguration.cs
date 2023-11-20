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
    public class KomunikatConfiguration : IEntityTypeConfiguration<Komunikat>
    {
        public void Configure(EntityTypeBuilder<Komunikat> builder)
        {
            builder.Property(c => c.IdKomunikat).IsRequired();
            builder.Property(c => c.Tresc).IsRequired();
           
            builder.ToTable("Komunikat");
        }
    }
}
