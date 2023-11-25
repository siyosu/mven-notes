import mongoose from "mongoose";
import User from "./user";

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
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
