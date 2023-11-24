import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './WarehouseNote.css';
import { RiAddLine } from 'react-icons/ri';

const WarehouseNote = ({ showNote, toggleNote }) => {
  const notes = [
    { id: 1, text: 'Zmiana nr 1 prosi o dokończenie załadunku DB Shenker', timestamp: '12:00' },
    { id: 2, text: 'Dnia 28.11.23 Odbędzie się Audyt na magazynie', timestamp: '14:29' },
  ];

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  const handleAddNoteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelNoteClick = () => {
    setIsModalOpen(false);
    setNewNote('');
  };

  const handleSaveNoteClick = () => {
    console.log('Note saved:', newNote);
    setIsModalOpen(false);
    setNewNote('');
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
    value={newNote}
    onChange={(e) => setNewNote(e.target.value)}
  />
  <div className="modalButtons">
    <button onClick={handleSaveNoteClick}>Zapisz</button>
    <button onClick={handleCancelNoteClick}>Anuluj</button>
  </div>
</Modal>
        </div>
      )}
    </div>
  );
};

export default WarehouseNote;