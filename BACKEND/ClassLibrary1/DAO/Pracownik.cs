using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WM.Data.Sql.DAO
{
    public class Pracownik
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdPracownik { get; set; }
        public string Nazwa { get; set; }
        public string Telefon { get; set; }
        public string Email { get; set; }
        public bool IsManager { get; set; }
        public int pIdMagazyn { get; set; }

        public virtual Login Login { get; set; }
        public virtual Magazyn Magazyn { get; set; }

    }
}
