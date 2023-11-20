﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;
using WM.IServices.Pracownik;

namespace WM.IServices
{
    public interface IPracownikService
    {
        public Task<Domain.Pracownik> GetPracownikById(int IdPracownik);
        public Task<Domain.Pracownik> CreatePracownik(AddPracownik addPracownik);
        Task EditPracownik(EditPracownik editPracownik, int IdPracownik);
    }
}
