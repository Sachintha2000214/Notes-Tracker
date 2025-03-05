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
    const userId = req.query.userId; // Use req.query instead of req.params
    console.log("User ID:", userId);

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const allNotes = await Note.find({ userId });
        res.json(allNotes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};


export const getNotesByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        const filteredNotes = await Note.find({ category: category.toLowerCase() });

        if (filteredNotes.length === 0) {
            return res.status(404).json({ error: 'No notes found for this category' });
        }

        res.json(filteredNotes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes by category' });
    }
};