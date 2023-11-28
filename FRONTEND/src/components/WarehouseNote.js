import React, { useState } from 'react';
import Modal from 'react-modal';
import './WarehouseNote.css';
import { RiAddLine } from 'react-icons/ri';
import axios from 'axios';

const WarehouseNote = ({ showNote, toggleNote }) => {
  const notes = [
    { id: 1, text: 'Zmiana nr 1 prosi o dokończenie załadunku DB Shenker', timestamp: '12:00' },
    { id: 2, text: 'Dnia 28.11.23 Odbędzie się Audyt na magazynie', timestamp: '14:29' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  function addNote() {
    let queryFlag = false;
    let Tresc = document.getElementById('addTresc').value;
    let kIdMagazyn = document.getElementById('addkIdMagazyn').value;

    const now = new Date();
    const formattedDateTime = now.toLocaleString();

    if (Tresc == null || kIdMagazyn == null) {
      alert("Coś poszło nie tak!");
      queryFlag = false;
    } else {
      queryFlag = true;
    }

    if (queryFlag) {
      console.log(Tresc)
      console.log(kIdMagazyn)
      axios.post("https://localhost:7099/Note", {
        "Tresc": Tresc,
        "kIdMagazyn": kIdMagazyn,
      })
        .then((response) => {
          alert("Dodano pomyślnie!");
          window.location.reload();
        })
        .catch((err) => alert("Coś poszło nie tak!"));
    }
  }

  const handleAddNoteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelNoteClick = () => {
    setIsModalOpen(false);
  };

  const handleSaveNoteClick = () => {
    setIsModalOpen(false);
    addNote();
  };

  return (
    <div className="warehouse-note-container">
      {showNote && (
        <div className="warehouse-note-list">
          <div className='noteHeader'>
            <h2 className='title'>Powiadomienia</h2>
            <button className='addButton' onClick={handleAddNoteClick}>
              <RiAddLine />
            </button>
          </div>
          <ul className='notification'>
            {notes.map((note) => (
              <li key={note.id} className="warehouse-note-item">
                <div className="warehouse-note-text">{note.text}</div>
                <div className="warehouse-note-timestamp">{note.timestamp}</div>
              </li>
            ))}
          </ul>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCancelNoteClick}
            contentLabel="Add Note Modal"
          >
            <h2>Dodaj notatkę</h2>
            <textarea
              type="text"
              placeholder="Dodaj notatkę..."
              id='addTresc'
            />
            <div className="modalButtons">
              <button onClick={handleSaveNoteClick}>Zapisz</button>
              <button onClick={handleCancelNoteClick}>Anuluj</button>
              <select id='addkIdMagazyn' name='addkIdMagazyn'>
                <option value={1}>Magazyn nr1</option>
                <option value={2}>Magazyn nr2</option>
                <option value={3}>Magazyn nr3</option>
              </select>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default WarehouseNote;