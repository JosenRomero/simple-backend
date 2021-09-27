import { Request, Response } from "express";

import cloudinary from '../config/cloudinaryConfig';

import { Note } from '../models/noteModel';

import fs from 'fs'; // file system

class NotesController {

    constructor() {

    }

    async getNotes(req: Request, res: Response) {

        try {

            const notes = await Note.find();
            res.json(notes);
            
        } catch (err) {
            console.error("Failed to get notes");
        }

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
        
            const imgPath = req.file?.path; // string || undefined

            if(imgPath) {

                const infoImg = await cloudinary.v2.uploader.upload(imgPath); 

                const note = {
                    description,
                    imagePath: infoImg.secure_url,
                    public_id: infoImg.public_id
                }

                await Note.create(note); 

                // delete image of the uploads folder  
                await fs.promises.unlink(imgPath);
            
                res.json({message: "Note Saved"});

            } else {
                throw "imagePath is not string";
            }
            
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

            if(note && note.public_id) {

                await cloudinary.v2.uploader.destroy(note.public_id);

            }

            res.json({status: "Note Deleted"});
            
        } catch (err) {
            console.error("Failed to delete note");
        }

    }

}

const notesController = new NotesController();

export default notesController;
