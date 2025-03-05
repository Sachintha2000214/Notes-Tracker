import express from 'express';
import { createNote, getAllNotes, getNotesByCategory } from '../controllers/noteController.js';

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/category/:category', getNotesByCategory);

export default router;