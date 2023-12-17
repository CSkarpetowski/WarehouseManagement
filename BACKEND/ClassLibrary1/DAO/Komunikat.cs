using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WM.Data.Sql.DAO
{
    public class Komunikat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdKomunikat { get; set; }
        public string Tresc { get; set; }

        public DateTime Czas { get; set; }
        public int kIdMagazyn { get; set; }
        public virtual Magazyn Magazyn { get; set; }
    }
}
