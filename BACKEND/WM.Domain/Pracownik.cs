namespace WM.Domain
{
    public class Pracownik
    {
        public int IdPracownik { get; set; }
        public string Nazwa { get; set; }
        public string Telefon { get; set; }
        public bool IsManager { get; set; }
        public int pIdMagazyn { get; set; }

        public Pracownik(int idPracownik, string nazwa, string telefon, bool manager, int idmag)
        {
            IdPracownik = idPracownik;
            Nazwa = nazwa;
            Telefon = telefon;
            IsManager = manager;
            pIdMagazyn = idmag;

        }
        public Pracownik(string nazwa, string telefon, bool manager, int idmag)
        {
            Nazwa = nazwa;
            Telefon = telefon;
            IsManager = manager;
            pIdMagazyn = idmag;

        }
        public void EditPracownik(string nazwa, string telefon, bool manager, int idmag)
        {

            Nazwa = nazwa;
            Telefon = telefon;
            IsManager = manager;
            pIdMagazyn = idmag;

        }
        public void ChangeMag(int idmag)
        {
            pIdMagazyn = idmag;
        }


    }
}
