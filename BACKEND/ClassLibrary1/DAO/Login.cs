using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WM.Data.Sql.DAO
{
    public class Login
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdDane { get; set; }
        public string Haslo { get; set; }
        public string Uzytkownik { get; set; }
        public int IdPracownik { get; set; }
        public virtual Pracownik Pracownik { get; set; }
    }
}
