using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WM.Data.Sql.DAO
{
    public class Historia
    {
        [Key] public int IdHistoria { get; set; }
        [ForeignKey("Zamowienie")] public int hIdZamowienie { get; set; }
        public DateTime Realizacja { get; set; }
        public virtual Zamowienie Zamowienie { get; set; }
    }
}
