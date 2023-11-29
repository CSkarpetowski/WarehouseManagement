namespace WM.Domain
{
    public class Klient
    {
        public int IdKlient { get; set; }
        public string Kierowca { get; set; }
        public string Firma { get; set; }
        public string Telefon { get; set; }

        public string NIP { get; set; }

        public Klient(int idKlient, string kierowca, string firma, string telefon, string nip)
        {
            IdKlient = idKlient;
            Kierowca = kierowca;
            Firma = firma;
            Telefon = telefon;
            NIP = nip;

        }
        public Klient(string kierowca, string firma, string telefon, string nip)
        {

            Kierowca = kierowca;
            Firma = firma;
            Telefon = telefon;
            NIP = nip;

        }
        public void EditKlient(string kierowca, string firma, string telefon, string nip)
        {

            Kierowca = kierowca;
            Firma = firma;
            Telefon = telefon;
            NIP = nip;

        }
    }
}