import express from 'express';
import { createNote, getAllNotes, getNotesByCategory, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/category/:category', getNotesByCategory);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;