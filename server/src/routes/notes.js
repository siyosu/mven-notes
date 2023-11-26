import { Router } from "express";
import { checkSchema } from "express-validator";
import noteController from "../controllers/notes.js";
import authenticate from "./authenticate.js";
import { newNoteSchema } from "./validationSchema.js";

const notes = Router();

const use = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

const { getAllNotes, createNewNote, getNote, deleteNote, updateNote } = noteController;

notes.get("/", use(authenticate), use(getAllNotes));
notes.post("/", use(authenticate), checkSchema(newNoteSchema), use(createNewNote));
notes.get("/:noteId", use(authenticate), use(getNote));
notes.delete("/:noteId", use(authenticate), use(deleteNote));
notes.put("/:noteId", use(authenticate), checkSchema(newNoteSchema), use(updateNote));

export default notes;
