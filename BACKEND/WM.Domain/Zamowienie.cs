namespace WM.Domain
{
    public class Zamowienie
    {
        public int IdZamowienie { get; set; }
        public bool IsOld { get; set; }
        public int zIdKlient { get; set; }

        public Zamowienie(int idZamowienie, bool Old, int IdKlient)
        {
            IdZamowienie = idZamowienie;
            IsOld = Old;
            zIdKlient = IdKlient;

        }
        public Zamowienie(bool Old, int IdKlient)
        {

            IsOld = Old;
            zIdKlient = IdKlient;

        }
        public void EditZamowienie(bool Old, int IdKlient)
        {

            IsOld = Old;
            zIdKlient = IdKlient;

        }

    }
}
