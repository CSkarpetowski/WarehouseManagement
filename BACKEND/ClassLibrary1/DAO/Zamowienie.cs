using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WM.Data.Sql.DAO
{
    public class Zamowienie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdZamowienie { get; set; }
        public bool IsOld { get; set;}

        public int zIdKlient { get; set; }
      
       
        public virtual Klient Klient { get; set; }
        public virtual ICollection<ZamowienieLista> ZamowienieListy { get; set; }
    }
}
