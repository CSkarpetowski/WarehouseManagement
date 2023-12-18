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

            #region CreateHistoria
            var historiaList = BuildHistoria();
            _context.Historia.AddRange(historiaList);
            _context.SaveChanges();
            #endregion









        }
        private IEnumerable<Magazyn> BuildMagazyn()
        {
            var magazynList = new List<Magazyn>();
            var Magazyn = new Magazyn()
            {
                IdMagazyn = 1,
                Pojemnosc = 500,
                Nazwa = "Magazyn pierwszy"
            };
            magazynList.Add(Magazyn);
            var Magazyn2 = new Magazyn()
            {
                IdMagazyn = 2,
                Pojemnosc = 200,
                Nazwa = "Magazyn drugi"
            };
            magazynList.Add(Magazyn2);
            var Magazyn3 = new Magazyn()
            {
                IdMagazyn = 3,
                Pojemnosc = 160,
                Nazwa = "Magazyn trzeci"
            };
            magazynList.Add(Magazyn3);
            return magazynList;
        }

        private IEnumerable<Klient> BuildKlient()
        {
            var klientList = new List<Klient>();
            var Klient = new Klient()
            {
                Kierowca = "Janusz Matczak",
                Firma = "Ikea",
                Telefon = "646953132",
                NIP = "1564702835"

            };
            klientList.Add(Klient);
            var Klient2 = new Klient()
            {
                Kierowca = "Karol Kryszak",
                Firma = "Hohland",
                Telefon = "609659976",
                NIP = "1239222309"

            };
            klientList.Add(Klient2);
            var Klient3 = new Klient()
            {
                Kierowca = "Piotr Kowalczyk",
                Firma = "CargoMasters",
                Telefon = "777987654",
                NIP = "2468109753"

            };
            klientList.Add(Klient3);
            var Klient4 = new Klient()
            {
                Kierowca = "Magdalena Wiśniewska",
                Firma = "SpeedyFreight",
                Telefon = "333456789",
                NIP = "1357924680"

            };
            klientList.Add(Klient4);
            var Klient5 = new Klient()
            {
                Kierowca = "Tomasz Lewandowski",
                Firma = "ExpressHaul",
                Telefon = "666234567",
                NIP = "1122334455"

            };
            klientList.Add(Klient5);
            var Klient6 = new Klient()
            {
                Kierowca = "Monika Dąbrowska",
                Firma = "SwiftTrans",
                Telefon = "444876543",
                NIP = "9876543212"

            };
            klientList.Add(Klient6);
            var Klient7 = new Klient()
            {
                Kierowca = "Grzegorz Zając",
                Firma = "QuickCargo",
                Telefon = "222765432",
                NIP = "9871236540"

            };
            klientList.Add(Klient7);
            var Klient8 = new Klient()
            {
                Kierowca = "Karolina Jankowska",
                Firma = "RapidDelivery",
                Telefon = "999345678",
                NIP = "3692581470"

            };
            klientList.Add(Klient8);
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
                IdPracownik = 1
            };
            loginList.Add(Login);
            var Login2 = new Login()
            {
                IdDane = 2,
                Haslo = "123456",
                Uzytkownik = "JS555",
                IdPracownik = 2
            };
            loginList.Add(Login2);
            var Login3 = new Login()
            {
                IdDane = 3,
                Haslo = "123456",
                Uzytkownik = "AJ789",
                IdPracownik = 3
            };
            loginList.Add(Login3);
            var Login4 = new Login()
            {
                IdDane = 4,
                Haslo = "123456",
                Uzytkownik = "RD321",
                IdPracownik = 4
            };
            loginList.Add(Login4);
            var Login5 = new Login()
            {
                IdDane = 5,
                Haslo = "123456",
                Uzytkownik = "EB987",
                IdPracownik = 5
            };
            loginList.Add(Login5);
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
                Email = "r.sachnik@student.po.edu.pl",
                IsManager = true,
                pIdMagazyn = 1

            };
            pracownikList.Add(Pracownik);
            var Pracownik2 = new Pracownik()
            {
                IdPracownik = 2,
                Nazwa = "Jane Smith",
                Telefon = "555123456",
                Email = "kossakowskiprzemek@gmail.com",
                IsManager = false,
                pIdMagazyn = 1

            };
            pracownikList.Add(Pracownik2);
            var Pracownik3 = new Pracownik()
            {
                IdPracownik = 3,
                Nazwa = "Alice Johnson",
                Telefon = "789456123",
                Email = "kossakowskiprzemek@gmail.com",
                IsManager = true,
                pIdMagazyn = 2

            };
            pracownikList.Add(Pracownik3);
            var Pracownik4 = new Pracownik()
            {
                IdPracownik = 4,
                Nazwa = "Robert Davis",
                Telefon = "321654987",
                Email = "cezaryjskarpetowski@gmail.com",
                IsManager = false,
                pIdMagazyn = 2

            };
            pracownikList.Add(Pracownik4);
            var Pracownik5 = new Pracownik()
            {
                IdPracownik = 5,
                Nazwa = "Emily Brown",
                Telefon = "987654321",
                Email = "cezaryjskarpetowski@gmail.com",
                IsManager = true,
                pIdMagazyn = 1

            };
            pracownikList.Add(Pracownik5);
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
                pIdMagazyn = 1,
            };
            produktList.Add(Produkt);
            var Produkt2 = new Produkt()
            {
                IdProd = 2,
                Nazwa = "Papierowa torba",
                Ilosc = 50,
                LOT = "PT0001",
                IsGood = true,
                pIdMagazyn = 2,
            };
            produktList.Add(Produkt2);
            var Produkt3 = new Produkt()
            {
                IdProd = 3,
                Nazwa = "Ołówek HB",
                Ilosc = 50,
                LOT = "OH0001",
                IsGood = true,
                pIdMagazyn = 3,
            };
            produktList.Add(Produkt3);
            var Produkt4 = new Produkt()
            {
                IdProd = 4,
                Nazwa = "Zeszyt A4",
                Ilosc = 50,
                LOT = "ZA0001",
                IsGood = true,
                pIdMagazyn = 3,
            };
            produktList.Add(Produkt4);
            var Produkt5 = new Produkt()
            {
                IdProd = 5,
                Nazwa = "Długopis żelowy",
                Ilosc = 50,
                LOT = "DZ0001",
                IsGood = true,
                pIdMagazyn = 3,
            };
            produktList.Add(Produkt5);
            var Produkt6 = new Produkt()
            {
                IdProd = 6,
                Nazwa = "Latex",
                Ilosc = 50,
                LOT = "LA0001",
                IsGood = true,
                pIdMagazyn = 1,
            };
            produktList.Add(Produkt6);
            var Produkt7 = new Produkt()
            {
                IdProd = 7,
                Nazwa = "Podkładka biurkowa",
                Ilosc = 50,
                LOT = "PB0001",
                IsGood = true,
                pIdMagazyn = 2,
            };
            produktList.Add(Produkt7);
            var Produkt8 = new Produkt()
            {
                IdProd = 8,
                Nazwa = "Skrzynka na dokumenty",
                Ilosc = 50,
                LOT = "SD0001",
                IsGood = true,
                pIdMagazyn = 2,
            };
            produktList.Add(Produkt8);
            var Produkt9 = new Produkt()
            {
                IdProd = 9,
                Nazwa = "Taśma klejąca",
                Ilosc = 50,
                LOT = "TK0001",
                IsGood = true,
                pIdMagazyn = 1,
            };
            produktList.Add(Produkt9);
            return produktList;
        }

        private IEnumerable<Zamowienie> BuildZamowienie()
        {
            var zamowienieList = new List<Zamowienie>();
            var Zamowienie = new Zamowienie()
            {
                IdZamowienie = 1,
                IsOld = false,
                zIdKlient = 1,
            };
            zamowienieList.Add(Zamowienie);
            var Zamowienie1 = new Zamowienie()
            {
                IdZamowienie = 2,
                IsOld = true,
                zIdKlient = 1,
            };
            zamowienieList.Add(Zamowienie1);
            return zamowienieList;
        }


        private IEnumerable<ZamowienieLista> BuildZamowienieLista()
        {
            var zamowienieListaList = new List<ZamowienieLista>();
            var ZamowienieLista = new ZamowienieLista()
            {
                LpZamowienie = 1,
                zIdZamowienie = 1,
                zIdProd = 1,
                ilosc = 1,
                LOT = "GA0001"
            };
            zamowienieListaList.Add(ZamowienieLista);
            var ZamowienieLista2 = new ZamowienieLista()
            {
                LpZamowienie = 2,
                zIdZamowienie = 2,
                zIdProd = 1,
                ilosc = 1,
                LOT = "GA0001"
            };
            zamowienieListaList.Add(ZamowienieLista2);
            return zamowienieListaList;
        }

        private IEnumerable<Historia> BuildHistoria()
        {
            var historiaList = new List<Historia>();
            var Historia = new Historia()
            {
                IdHistoria = 1,
                hIdZamowienie = 2,
                Realizacja = DateTime.Now
            };
            historiaList.Add(Historia);
            return historiaList;
           
        }

    }
}
