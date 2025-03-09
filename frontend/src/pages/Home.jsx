//Get note details according to the user 
//Connect with backend to crud operaions 

import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserIdFromToken = () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken?.id) {
          setUserId(decodedToken.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchUserIdFromToken();
  }, []);

  const fetchNotes = useCallback(async () => {
    if (!userId) return; // Wait until userId is available
  
    try {
      const response = await axios.get('http://127.0.0.1:5555/notes', {
        params: {
          userId: userId,
          category: searchQuery,
        },
      });
  
      // Axios automatically parses the JSON response, so you can access it via `response.data`
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [userId, searchQuery]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

const handleSave = async (note) => {
    const url = selectedNote && selectedNote._id 
        ? `http://127.0.0.1:5555/notes/${selectedNote._id}` 
        : 'http://127.0.0.1:5555/notes';
    const method = selectedNote && selectedNote._id ? 'put' : 'post';

    try {
        const response = await axios[method](url, note, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        fetchNotes();
        setModalOpen(false);
        setSelectedNote(null);
    } catch (error) {
        console.error('Error saving note:', error.response?.data?.error || error.message || error);
    }
};

const handleDelete = async (noteId) => {
  try {
      await axios.delete(`http://127.0.0.1:5555/notes/${noteId}`);
      fetchNotes();
  } catch (error) {
      console.error('Error deleting note:', error.response?.data?.error || error.message || error);
  }
};

  const handleEdit = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/image4.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.8)", 
      }}
    >
      <div className="relative z-10 min-h-screen w-full bg-gray-100 bg-opacity-75">

        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px" }}>
              No results found.
            </p>
          )}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold px-5 py-3 rounded-full shadow-lg hover:bg-teal-600 transition"
        >
          +
        </button>
        {isModalOpen && (
          <NoteModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleSave}
            noteToEdit={selectedNote}
          />
        )}
      </div>
    </div>
  );
};

export default Home;