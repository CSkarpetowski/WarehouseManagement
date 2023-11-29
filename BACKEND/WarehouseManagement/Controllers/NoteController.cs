﻿using Microsoft.AspNetCore.Mvc;
using WarehouseManagement.BindingModel;
using WM.Data.Sql;
using WM.Data.Sql.DAO;

namespace WarehouseManagement.Controllers
{

    [Route("Note")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly WarehouseDbContext _context;

        public NoteController(WarehouseDbContext context)
        {
            _context = context;
        }
        [HttpGet("all", Name = "GetNotes")]
        public IActionResult GetNotes()
        {

            var notes = _context.Komunikat;
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> AddNote([FromBody] AddNote addNote)
        {
            var komunikat = new Komunikat
            {

                Tresc = addNote.Tresc,
                kIdMagazyn = addNote.kIdMagazyn,
                data = addNote.data
            };

            await _context.AddAsync(komunikat);

            return Ok(addNote);
        }
    }
}
