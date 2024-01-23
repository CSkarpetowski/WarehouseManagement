import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './WarehouseNote.css';
import { RiAddLine } from 'react-icons/ri';
import { format } from 'date-fns';
import axios from 'axios';
import {useGlobalState} from './GlobalVariables';


const WarehouseNote = ({ showNote}) => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language] = useGlobalState('language');
  

  useEffect(() => {
   
    axios.get("https://localhost:7099/Note/all")
      .then((response) => {
        setNotes(response.data); 
      })
      .catch((err) => console.error("Error fetching notes:", err));
  }, []); 

  const addNote = () => {
    let queryFlag = false;
    let Tresc = document.getElementById('addTresc').value;
    let kIdMagazyn = (1);
    

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
          
          axios.get("https://localhost:7099/Note/all")  // URL axios endpoint
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
  const renderPolish = () => { //Render PL
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
  }
const renderEnglish = () => { //Render EN
  return (
    <div className="warehouse-note-container">
      {showNote && (
        <div className="warehouse-note-list">
          <div className='noteHeader'>
            <h2 className='title'>Notes</h2>
            <div class="addContainer"> 
            <button className='addButton' onClick={handleAddNoteClick}>
              <RiAddLine />
            </button>
          </div>
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
            <h2 className='title'>Add note</h2>
            <textarea
              type="text"
              placeholder="Dodaj notatkę..."
              id='addTresc'
            />
            <div className="modalButtons">
              <button onClick={handleSaveNoteClick}>Save</button>
              <button onClick={handleCancelNoteClick}>Cancel</button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
 }
  return ( //Sprawdzenie czy wybrany jest PL czy EN
  <>
  {language == "PL" ? renderPolish() : renderEnglish()}

  </>
);}

export default WarehouseNote;
