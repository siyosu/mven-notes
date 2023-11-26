import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import Note from "../models/note.js";

/**
 * Get all notes from the database for the specified user id
 */
const getAllNotes = async (req, res) => {
    const { id: userId } = req.user;
    const notes = await Note.find({ userId }, "title body createdAt updatedAt");

    res.status(200).send(notes);
};

/**
 * Get a note from the database with the specified note id and user id
 */
const getNote = async (req, res) => {
    const { id: userId } = req.user;
    const noteId = req.params.noteId;

    const note = await Note.findOne({ _id: noteId, userId }, "title body createdAt updatedAt");
    if (!note) throw createHttpError(404);

    res.status(200).send(note);
};

/**
 * Add new note to the database
 */
const createNewNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createHttpError(400, "Invalid input data", { errors: errors.mapped() });

    const { id: userId } = req.user;
    const { title, body } = req.body;

    await Note.create({ title, body, userId });

    res.status(200).send({ message: "Note successfully added" });
};

/**
 * Delete note from the database with the specified note id and user id
 */
const deleteNote = async (req, res) => {
    const { id: userId } = req.user;
    const noteId = req.params.noteId;

    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) throw createHttpError(404);

    res.status(200).send({ message: "Note successfully deleted" });
};

/**
 * Update note on the database for the specified note id and user id
 */
const updateNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw createHttpError(400, "Invalid input data", { errors: errors.mapped() });

    const { id: userId } = req.user;
    const noteId = req.params.noteId;
    const { title, body } = req.body;

    const note = await Note.findOneAndUpdate({ _id: noteId, userId }, { $set: { title, body } }, { new: true });
    if (!note) throw createHttpError(404);

    res.status(200).send({ message: "Note successfully updated" });
};

const noteController = {
    getAllNotes,
    getNote,
    createNewNote,
    deleteNote,
    updateNote,
};

export default noteController;
