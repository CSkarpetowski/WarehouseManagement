namespace WM.IServices.Pracownik
{
    public class AddPracownik
    {
        public int IdPracownik { get; set; }
        public string Nazwa { get; set; }
        public string Telefon { get; set; }
        public bool IsManager { get; set; }
        public int pIdMagazyn { get; set; }
    }
}
