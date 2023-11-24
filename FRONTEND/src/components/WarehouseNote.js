import React from 'react';
import './WarehouseNote.css'; // Importuj plik ze stylami


// tymczasowa tablica
const WarehouseNote = ({ showNote, toggleNote }) => {
  const notes = [
    { id: 1, text: 'Zmiana nr 1 prosi o dokończenie załadunku DB Shenker', timestamp: '12:00' },
    { id: 2, text: 'Dnia 28.11.23 Odbędzie się Audyt na magazynie', timestamp: '14:29' },
  ];

  return (
    <div className="warehouse-note-container">
      {showNote && (
        <div className="warehouse-note-list">
          <h2 className='noteHeader'>Powiadomienia</h2>
          <ul className='notification'>
            {notes.map((note) => (
              <li key={note.id} className="warehouse-note-item">
                <div className="warehouse-note-text">{note.text}</div>
                <div className="warehouse-note-timestamp">{note.timestamp}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WarehouseNote;