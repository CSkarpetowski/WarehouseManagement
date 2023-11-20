using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WM.Domain;

namespace WM.IData
{
    public interface IPracownikRepository
    {
        Task<int> AddPracownik(Domain.Pracownik pracownik);
        Task<Pracownik> GetPracownik(int userId);       
        Task EditPracownik(Pracownik pracownik);
    }
}
