using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WM.Data.Sql.DAO
{
    public class ZamowienieLista
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int LpZamowienie { get; set; }
        public int zIdZamowienie { get; set; }
        public int zIdProd { get; set; }
        public int ilosc { get; set; }
        public string LOT { get; set; }
        
        public virtual Zamowienie Zamowienie { get; set; }
        public virtual Produkt Produkty { get; set; }
    }
}
