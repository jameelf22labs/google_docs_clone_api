import { v4 as uuidv4 } from "uuid";
import Notes from "../../database/models/Notes.model";
import BadRequestError from "../../errors/BadRequestError";
import { NoteRequestBody } from "./types";
import NotFoundError from "../../errors/NotFoundError";

const NoteProvider = {
  async createNote(newNote: NoteRequestBody) {
    const { name } = newNote;
    const existing = await Notes.findOne({ where: { name } });
    if (existing) throw new BadRequestError("Note name must be unique");

    const createdNote = await Notes.create({
      ...newNote,
      id: uuidv4(),
      content: "Type Something",
    });

    return createdNote;
  },

  async getNote(id: string) {
    const note = await Notes.findByPk(id);
    if (!note) throw new NotFoundError("Note not found");
    return note;
  },

  async getAllNotes() {
    return Notes.findAll({ order: [["createdAt", "DESC"]] });
  },

  async deleteNote(id: string) {
    const note = await Notes.findByPk(id);
    if (!note) throw new NotFoundError("Note not found");

    await Notes.destroy({ where: { id } });
    return null;
  },
};

export default NoteProvider;
