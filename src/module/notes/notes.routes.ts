import { Router } from "express";
import NotesHandler from "./notes.controller";

const notesRouter = Router();

const notesHandler = new NotesHandler();

notesRouter.post(
  "/newNote",
  notesHandler.handleCreateNote.bind(notesHandler)
);
notesRouter.get("/all", notesHandler.handleGetAllNotes.bind(notesHandler));
notesRouter.get("/:id", notesHandler.handleGetNote.bind(notesHandler));
notesRouter.delete(
  "/:id",
  notesHandler.handleDeleteNote.bind(notesHandler)
);

export default notesRouter;