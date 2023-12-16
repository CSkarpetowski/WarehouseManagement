using WM.IServices;

namespace WarehouseManagement.BindingModel
{
    public class AddZamowienielista
    {
        public int Klient { get; set; }

        public List<AddProdukt> Produkty { get; set; }


    }
}
