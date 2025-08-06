import { Request, Response } from "express";
import ApiResponse from "../../common/decors/api.response";
import HandleException from "../../common/decors/handle.exception";
import { NoteRequestBody } from "./types";
import { validateRequestBody } from "./notes.validator";
import NoteProvider from "./notes.service";

export default class NotesHandler {
  @HandleException
  @ApiResponse({ message: "Note was created" })
  async handleCreateNote(request: Request, response: Response) {
    const body: NoteRequestBody = request.body;
    const validatedNote = await validateRequestBody(body);
    return NoteProvider.createNote(validatedNote);
  }

  @HandleException
  @ApiResponse({ message: "Retrieved note by ID" })
  async handleGetNote(request: Request, response: Response) {
    const noteId = request.params.id;
    return NoteProvider.getNote(noteId);
  }

  @HandleException
  @ApiResponse({ message: "Retrieved all notes" })
  async handleGetAllNotes(_: Request, __: Response) {
    return NoteProvider.getAllNotes();
  }

  @HandleException
  @ApiResponse({ message: "Note was deleted" })
  async handleDeleteNote(request: Request, response: Response) {
    const noteId = request.params.id;
    return NoteProvider.deleteNote(noteId);
  }
}
