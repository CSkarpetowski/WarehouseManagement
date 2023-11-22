import React from 'react';
import './WarehouseNote.css'; // Importuj plik ze stylami


// tymczasowa tablica
const WarehouseNote = ({ showNote, toggleNote }) => {
  const notes = [
    { id: 1, text: 'Siema, siema o tej porze każdy wypić może!', timestamp: '12:00' },
    { id: 2, text: 'Właściciel różowego punto proszony o zgłoszenie się w recepcji', timestamp: '14:29' },
  ];

  return (
    <div className="warehouse-note-container">
      {showNote && (
        <div className="warehouse-note-list">
          <h2 className='noteHeader'>Powiadomienia</h2>
          <ul>
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