import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);

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
  }, []); // Runs only once to fetch userId

  useEffect(() => {
    if (!userId) return; // Wait until userId is available

    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5555/notes?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [userId]); // Runs when `userId` is updated

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* Floating Button to Open Modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold px-5 py-3 rounded-full shadow-lg hover:bg-teal-600 transition"
      >
        +
      </button>

      {/* Conditional Rendering of Note Modal */}
      {isModalOpen && <NoteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Home;