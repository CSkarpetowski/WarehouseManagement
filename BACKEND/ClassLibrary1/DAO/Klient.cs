using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WM.Data.Sql.DAO
{
    public class Klient
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdKlient { get; set; }
        public string Kierowca { get; set; }
        public string Firma { get; set; }
        public string Telefon { get; set; }
        public string NIP { get; set; }


        public virtual ICollection<Zamowienie> Zamowienia { get; set; }


    }
}
