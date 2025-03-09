import Note from '../models/noteModel.js';
export const createNote = async (req, res) => {
    const { title, content, category, userId} = req.body;

    if (!title || !content || !category || !userId) {
        return res.status(400).json({ error: 'Title, content, category and userId are required' });
    }

    try {
        const newNote = new Note({ title, content, category, userId});
        await newNote.save();
        res.status(201).json(200);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
};

export const getAllNotes = async (req, res) => {
    const userId = req.query.userId;
    const category = req.query.category;
    console.log("User ID:", userId);
    console.log("Category:", category);

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const query = { userId };
        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }
        const allNotes = await Note.find(query);
        res.json(allNotes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        return res.status(400).json({ error: 'Title, content, and category are required' });
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, category },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
};