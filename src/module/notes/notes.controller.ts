import { Request, Response } from "express";
import { NoteRequestBody } from "./types";
import { validateRequestBody } from "./notes.validator";
import NoteProvider from "./notes.service";
import ApiHandler from "../../common/decors/api.handler";

export default class NotesHandler {
  @ApiHandler({ message: "Note was created" })
  async handleCreateNote(request: Request, response: Response) {
    const body: NoteRequestBody = request.body;
    const validatedNote = await validateRequestBody(body);
    return NoteProvider.createNote(validatedNote);
  }

  @ApiHandler({ message: "Retrieved note by ID" })
  async handleGetNote(request: Request, response: Response) {
    const noteId = request.params.id;
    return NoteProvider.getNote(noteId);
  }

  @ApiHandler({ message: "Retrieved all notes" })
  async handleGetAllNotes(_: Request, __: Response) {
    return NoteProvider.getAllNotes();
  }

  @ApiHandler({ message: "Note was deleted" })
  async handleDeleteNote(request: Request, response: Response) {
    const noteId = request.params.id;
    return NoteProvider.deleteNote(noteId);
  }
}
