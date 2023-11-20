using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using WM.Data.Sql;
using WM.Data.Sql.DAO;

namespace WM.Data.Sql.Migrations
{
    //klasa odpowiadająca za wypełnienie testowymi danymi bazę danych
    public class DatabaseSeed
    {
        private readonly WarehouseDbContext _context;

        //wstrzyknięcie instancji klasy WMDbContext poprzez konstruktor
        public DatabaseSeed(WarehouseDbContext context)
        {
            _context = context;
        }
        public void Seed()
        {
            #region CreateMagazyn
            var magazynList = BuildMagazyn();
            _context.Magazyn.AddRange(magazynList);
            _context.SaveChanges();
            #endregion

            #region CreateClient
            var clientList = BuildKlient();
            _context.Klient.AddRange(clientList);
            _context.SaveChanges();
            #endregion

            

           

            #region CreateZamowienie
            var zamowienieList = BuildZamowienie();
            _context.Zamowienie.AddRange(zamowienieList);
            _context.SaveChanges();
            #endregion

            #region CreatePracownik
            var pracownikList = BuildPracownik();
            _context.Pracownik.AddRange(pracownikList);
            _context.SaveChanges();
            #endregion

            #region CreateLogin
            var loginList = BuildLogin();
            _context.Login.AddRange(loginList);
            _context.SaveChanges();
            #endregion

            #region CreateKomunikat
            var komunikatList = BuildKomunikat();
            _context.Komunikat.AddRange(komunikatList);
            _context.SaveChanges();
            #endregion

            #region CreateProdukt
            var produktList = BuildProdukt();
            _context.Produkt.AddRange(produktList);
            _context.SaveChanges();
            #endregion

            #region CreateZamowienieLista
            var zamowienieListaList = BuildZamowienieLista();
            _context.ZamowienieLista.AddRange(zamowienieListaList);
            _context.SaveChanges();
            #endregion







        }
        private IEnumerable<Magazyn> BuildMagazyn()
        {
            var magazynList = new List<Magazyn>();
            var Magazyn = new Magazyn()
            {
                IdMagazyn = 1,
                Pojemnosc = 50,
                Nazwa = "Magazyn pierwszy"
            };
            magazynList.Add(Magazyn);
            return magazynList;
        }

        private IEnumerable<Klient> BuildKlient()
        {
            var klientList = new List<Klient>();
            var Klient = new Klient()
            {
                Kierowca = "A",
                Firma = "B",
                Telefon = "C",
                NIP = "D"

            };
            klientList.Add(Klient);
            return klientList;
        }

        private IEnumerable<Komunikat> BuildKomunikat()
        {
            var komunikatList = new List<Komunikat>();
            var Komunikat = new Komunikat()
            {
                IdKomunikat = 1,
                Tresc = "Lorem ipsum",
                kIdMagazyn = 1
            };
            komunikatList.Add(Komunikat);
            return komunikatList;
        }

        private IEnumerable<Login> BuildLogin()
        {
            var loginList = new List<Login>();
            var Login = new Login()
            {
                IdDane = 1,
                Haslo = "123456",
                Uzytkownik = "JD123", 
                IdPracownik =1
             };
            loginList.Add(Login);
            return loginList;
        }

       
        private IEnumerable<Pracownik> BuildPracownik()
        {
            var pracownikList = new List<Pracownik>();
            var Pracownik = new Pracownik()
            {
                IdPracownik = 1,
                Nazwa = "John Doe",
                Telefon = "903922833",
                IsManager= true,
                pIdMagazyn = 1

            };
            pracownikList.Add(Pracownik);
            return pracownikList;
        }

        private IEnumerable<Produkt> BuildProdukt()
        {
            var produktList = new List<Produkt>();
            var Produkt = new Produkt()
            {
                IdProd = 1,
                Nazwa = "Guma arabska",
                Ilosc = 50,
                LOT = "GA0001",
                IsGood = true, 
                pIdMagazyn =1, 
            };
            produktList.Add(Produkt);
            return produktList;
        }

        private IEnumerable<Zamowienie> BuildZamowienie()
        {
            var zamowienieList = new List<Zamowienie>();
            var Zamowienie = new Zamowienie()
            {
                IdZamowienie = 1,
                IsOld = false,
                zIdKlient = 1  
            };
            zamowienieList.Add(Zamowienie);
            return zamowienieList;
        }

        private IEnumerable<ZamowienieLista> BuildZamowienieLista()
        {
            var zamowienieListaList = new List<ZamowienieLista>();
            var ZamowienieLista = new ZamowienieLista()
            {
                LpZamowienie =1,
                zIdZamowienie =1,
                zIdProd =1,
                ilosc =1,
                LOT = "GA0001"
             };
            zamowienieListaList.Add(ZamowienieLista);
            return zamowienieListaList;
        }

    }
}
