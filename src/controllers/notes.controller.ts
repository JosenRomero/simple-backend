import { Request, Response } from "express";
import { Note } from '../models/noteModel';

import fs from 'fs'; // file system
import path from 'path';

class NotesController {

    constructor() {

    }

    async getNote(req: Request, res: Response) {

        try {

            const note = await Note.findById(req.params.id);
            res.json(note);
            
        } catch (err) {
            console.error("Failed to get note");
        }

    }

    async newNote(req: Request, res: Response) {

        try {

            const { description } = req.body;
            const photo = req.file;

            const note = {
                description,
                imagePath: photo?.path
            }

            await Note.create(note);
        
            res.json({message: "Note Saved"});
            
        } catch (err) {
            console.error("Failed to new note");
        }

    }

    async updateNote(req: Request, res: Response) {

        try {

            const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.json(updatedNote)

        } catch (err) {
            console.error("Failed to update note");
        }

    }

    async deleteNote(req: Request, res: Response) {

        try {

            const { id } = req.params;

            const note = await Note.findByIdAndDelete(id);

            if(note && note.imagePath) {

                const imagePath = path.resolve(note.imagePath);

                await fs.promises.unlink(imagePath);

            }

            res.json({status: "Note Deleted"});
            
        } catch (err) {
            console.error("Failed to delete note");
        }

    }

}

const notesController = new NotesController();

 export default notesController;
