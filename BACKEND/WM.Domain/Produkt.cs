namespace WM.Domain
{
    public class Produkt
    {
        public int IdProd { get; set; }
        public string Nazwa { get; set; }
        public string LOT { get; set; }
        public int Ilosc { get; set; }

        public bool IsGood { get; set; }
        public int pIdMagazyn { get; set; }

        public Produkt(int idProd, string nazwa, string lot, int ilosc, bool isGood, int pidmagazyn)
        {
            IdProd = idProd;
            Nazwa = nazwa;
            LOT = lot;
            Ilosc = ilosc;
            IsGood = isGood;
            pIdMagazyn = pidmagazyn;

        }
        public Produkt(string nazwa, string lot, int ilosc, bool isGood, int pidmagazyn)
        {
            Nazwa = nazwa;
            LOT = lot;
            Ilosc = ilosc;
            IsGood = isGood;
            pIdMagazyn = pidmagazyn;
        }
        public void EditProdukt(string nazwa, string lot, int ilosc, bool isGood)
        {
            Nazwa = nazwa;
            LOT = lot;
            Ilosc = ilosc;
            IsGood = isGood;
        }
    }
}
