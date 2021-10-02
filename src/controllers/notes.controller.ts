import { Request, Response, NextFunction } from "express";

import cloudinary from '../config/cloudinaryConfig';

import { Note } from '../models/noteModel';

import fs from 'fs'; // file system

class NotesController {

    constructor() {

    }

    async getNotes(req: Request, res: Response, next: NextFunction) {

        try {

            const notes = await Note.find();
            res.json(notes);

        } catch (err) {
            next({error: err, message: "Failed to get notes", status: 404});
        }

    }

    async getNote(req: Request, res: Response, next: NextFunction) {

        try {
            
            const note = await Note.findById(req.params.id);
            res.json(note);
            
        } catch (err) {
            next({error: err, message: "Failed to get note", status: 404});
        }

    }

    async newNote(req: Request, res: Response, next: NextFunction) {

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
            next({error: err, message: "Failed to new note", status: 500});
        }

    }

    async updateNote(req: Request, res: Response, next: NextFunction) {

        try {

            const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.json(updatedNote);

        } catch (err) {
            next({error: err, message: "Failed to update note", status: 500});
        }

    }

    async deleteNote(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params;

            const note = await Note.findByIdAndDelete(id);

            if(note && note.public_id) {

                await cloudinary.v2.uploader.destroy(note.public_id);

            }

            res.json({status: "Note Deleted"});
            
        } catch (err) {
            next({error: err, message: "Failed to delete note", status: 500});
        }

    }

}

const notesController = new NotesController();

export default notesController;
