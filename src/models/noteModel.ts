import { Schema, model, Document } from "mongoose";

const NoteSchema = new Schema(
    {
        title: {
          type: String,
          required: [true, "title is required"],
          trim: true,
        } 
    },
    {
        timestamps: true
    }
);

interface INote extends Document {
    title: string;
}

export const Note = model<INote>("Note", NoteSchema);