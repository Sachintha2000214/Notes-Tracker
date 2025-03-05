import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      {/* Note Title */}
      <h2 className="text-xl font-bold">{note.category}</h2>
      <h2 className="text-xl font-bold">{note.title}</h2>

      {/* Note Description */}
      <p className="text-gray-700">{note.content}</p>

      {/* Action Buttons */}
      <div className="flex justify-end mt-2">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(note)}
          className="text-blue-500 mr-2 hover:text-blue-700"
        >
          <FaEdit />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(note)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
