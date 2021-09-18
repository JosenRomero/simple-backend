import { Router } from "express";
import notesController from '../controllers/notes.controller';

const router = Router();

router.get("/:id", notesController.getNote);

router.post("/", notesController.newNote);

router.put("/:id", notesController.updateNote);

router.delete("/:id", notesController.deleteNote);

export default router;