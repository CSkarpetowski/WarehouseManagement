using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WM.IServices
{
    public class EditProdukt
    {
      
        public string Nazwa { get; set; }

        public string LOT { get; set; }


        public int Ilosc { get; set; }
        public bool IsGood { get; set; }
        public int pIdMagazyn { get; set; }
    }
}
