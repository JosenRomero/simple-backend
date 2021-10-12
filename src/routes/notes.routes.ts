import { Router } from "express";
import notesController from '../controllers/notes.controller';

import multer from '../config/multerConfig';

const router = Router();

router.get("/all/userId/:userId", notesController.getNotes);

router.get("/:id", notesController.getNote);

router.post("/", multer.single('image'), notesController.newNote);

router.put("/:id", notesController.updateNote);

router.delete("/:id", notesController.deleteNote);

export default router;