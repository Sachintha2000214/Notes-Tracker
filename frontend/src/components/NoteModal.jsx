import React, { useEffect, useState } from "react";

const NoteModal = ({ onClose, onSubmit, userRegNo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserID] = useState("");

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setUserID(decodedToken.id);
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5555/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: description, // Assuming 'content' is used in API
          category,
          userId, // Pass user registration number
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const data = await response.json();
      console.log("Note added successfully:", data);

      // Pass the new note data to the parent component
      onSubmit(data);

      // Clear the inputs after submitting
      setTitle("");
      setDescription("");
      setCategory("");

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Note</h2>

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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
          />

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Add Note
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
