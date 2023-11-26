import mongoose from "mongoose";
import User from "./user.js";

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: User,
            required: true,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("note", NoteSchema);

export default Note;
