import { Schema, model, Document } from "mongoose";

const NoteSchema = new Schema(
    {
        description: {
          type: String,
          required: [true, "Description is required"],
          trim: true,
        },
        imagePath: {
            type: String,
            required: [true, "Photo is required"]
        }
    },
    {
        timestamps: true
    }
);

interface INote extends Document {
    description: string;
    imagePath: string;
}

export const Note = model<INote>("Note", NoteSchema);