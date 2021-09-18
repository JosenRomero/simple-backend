import { Request, Response } from "express";
import { Note } from '../models/noteModel';

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

            await Note.create(req.body);
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

            await Note.findByIdAndDelete(req.params.id);
            res.json({status: "Note Deleted"});
            
        } catch (err) {
            console.error("Failed to delete note");
        }

    }

}

const notesController = new NotesController();

 export default notesController;
