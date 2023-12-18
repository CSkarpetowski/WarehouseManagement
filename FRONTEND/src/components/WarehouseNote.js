import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './WarehouseNote.css';
import { RiAddLine } from 'react-icons/ri';
import { format } from 'date-fns';
import axios from 'axios';

const WarehouseNote = ({ showNote, toggleNote }) => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch notes from the server when the component mounts
    axios.get("https://localhost:7099/Note/all")
      .then((response) => {
        setNotes(response.data); // Assuming the response.data is an array of notes
      })
      .catch((err) => console.error("Error fetching notes:", err));
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const addNote = () => {
    let queryFlag = false;
    let Tresc = document.getElementById('addTresc').value;
    let kIdMagazyn = (1);
    // let kIdMagazyn = document.getElementById('addkIdMagazyn').value;

    if (Tresc == null || kIdMagazyn == null) {
      alert("Coś poszło nie tak!");
      queryFlag = false;
    } else {
      queryFlag = true;
    }

    if (queryFlag) {
      axios.post("https://localhost:7099/Note/AddNote", {
        "Tresc": Tresc,
        "kIdMagazyn": kIdMagazyn,
      })
        .then((response) => {
          alert("Dodano pomyślnie!");
          // Refresh notes after successfully adding a new note
          axios.get("https://localhost:7099/Note/all")  // Update the endpoint here
            .then((response) => {
              setNotes(response.data);
            })
            .catch((err) => console.error("Error fetching notes:", err));
        })
        .catch((err) => alert("Coś poszło nie tak!"));
    }
  };

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
                <div className="warehouse-note-text">{note.tresc}</div>
                <div className="warehouse-note-time">{format(new Date(note.czas), 'HH:mm dd-MM-yyyy')}</div>
              </li>
            ))}
          </ul>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCancelNoteClick}
            contentLabel="Add Note Modal"
          >
            <h2 className='title'>Dodaj notatkę</h2>
            <textarea
              type="text"
              placeholder="Dodaj notatkę..."
              id='addTresc'
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
