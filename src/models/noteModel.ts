import { Schema, model, Document } from "mongoose";

const NoteSchema = new Schema(
    {
        description: {
          type: String,
          required: [true, "Description is required"],
          trim: true,
        },
        imagePath: { // for the images in cloudinary
            type: String,
            required: [true, "Photo is required"]
        },
        public_id: { // for the images in cloudinary
            type: String
        }
    },
    {
        timestamps: true
    }
);

interface INote extends Document {
    description: string;
    imagePath: string;
    public_id: string;
}

export const Note = model<INote>("Note", NoteSchema);