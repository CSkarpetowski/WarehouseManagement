using System.ComponentModel.DataAnnotations;

namespace WM.Data.Sql.DAO
{
    public class Magazyn
    {

        [Key]
        public int IdMagazyn { get; set; }
        public int Pojemnosc { get; set; }
        public string Nazwa { get; set; }
        public virtual ICollection<Produkt> Produkty { get; set; }
        public virtual ICollection<Pracownik> Pracownicy { get; set; }

        public virtual ICollection<Komunikat> Komunikaty { get; set; }

    }
}
