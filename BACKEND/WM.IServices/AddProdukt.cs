namespace WM.IServices
{
    public class AddProdukt
    {
        public int IdProd { get; set; }
        public string Nazwa { get; set; }
        public int Ilosc { get; set; }

        public string LOT { get; set; }
        public bool IsGood { get; set; }
        public int pIdMagazyn { get; set; }
    }
}

