import React, { useEffect, useState } from "react";

const NoteModal = ({ isOpen, onClose, onSave, noteToEdit }) => {
  const [category, setCategory] = useState(noteToEdit ? noteToEdit.category : '');
  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : '');
  const [content, setContent] = useState(noteToEdit ? noteToEdit.content : '');
  const [id, setId] = useState(noteToEdit ? noteToEdit._id : '');
  const [userId, setUserID] = useState("");

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setUserID(decodedToken.id);
    if (noteToEdit) {
      setCategory(noteToEdit.category);
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setId(noteToEdit._id);
    }else{
      setCategory("");
      setTitle("");
      setContent("");
      setId("");
      noteToEdit == false;
    }
  }, [noteToEdit])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert("Please fill in all fields");
      return;
    }
    onSave({ userId, title, content, category });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{noteToEdit ? 'Edit Note' : 'Add New Note'}</h2>

        <form onSubmit={handleSubmit}>
          {/* Category Selection */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="" disabled hidden>Add Category</option>
            <option value="Health">Health</option>
            <option value="Financial">Financial</option>
            <option value="Academic">Academic</option>
            <option value="Sport">Sport</option>
            <option value="Other">Other</option>
          </select>

          {/* Note Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />

          {/* Note Description */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
          />

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            {noteToEdit ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        {/* Cancel Button */}
        <button onClick={onClose} className="mt-4 text-red-500 w-full">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
