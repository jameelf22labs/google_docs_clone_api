import { Router } from "express";
import NotesHandler from "./notes.controller";

const notesRouter = Router();

const notesHandler = new NotesHandler();

notesRouter.post(
  "/note/newNote",
  notesHandler.handleCreateNote.bind(notesHandler)
);

notesRouter.get("/note/:id", notesHandler.handleGetNote.bind(notesHandler));

notesRouter.get("/note/all", notesHandler.handleGetAllNotes.bind(notesHandler));

notesRouter.delete(
  "/note/:id",
  notesHandler.handleDeleteNote.bind(notesHandler)
);

export default notesRouter;