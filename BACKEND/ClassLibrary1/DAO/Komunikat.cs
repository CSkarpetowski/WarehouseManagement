﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WM.Data.Sql.DAO
{
    public class Komunikat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int IdKomunikat { get; set; }
        public string Tresc { get; set; }
        public int kIdMagazyn { get; set; }
        public DateTime data {  get; set; }
        public virtual Magazyn Magazyn { get; set; }
    }
}
