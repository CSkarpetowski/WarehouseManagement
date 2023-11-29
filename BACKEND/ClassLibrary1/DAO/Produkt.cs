using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WM.Data.Sql.DAO
{
    public class Produkt
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdProd { get; set; }
        public string Nazwa { get; set; }
        public int Ilosc { get; set; }
        public string LOT { get; set; }
        public bool IsGood { get; set; }

        public int pIdMagazyn { get; set; }

        public virtual Magazyn Magazyn { get; set; }

        public virtual ICollection<ZamowienieLista> ZamowienieLista { get; set; }


    }
}
