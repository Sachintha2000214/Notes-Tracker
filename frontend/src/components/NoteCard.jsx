import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import NoteModal from "./NoteModal"; // Import your NoteModal component

const NoteCard = ({ note, onEdit, onDelete }) => {

  return (
    <div className="bg-white p-4 rounded shadow-lg">

      <h2 className="text-xl font-bold">{note.category}</h2>
      <h2 className="text-xl font-bold">{note.title}</h2>

      <p className="text-gray-700">{note.content}</p>

      <div className="flex justify-end mt-2">

        <button
          onClick={() => onEdit(note)}
          className="text-blue-500 mr-2 hover:text-blue-700"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>

      {/* {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
          noteToEdit={selectedNote}
        />
      )} */}
    </div>
  );
};

export default NoteCard;