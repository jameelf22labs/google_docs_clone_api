import Notes from "../models/Notes.model";

const NoteQueryHelper = {
  updateContentById: (noteId: string, content: string) => {
    return Notes.update({ content }, { where: { id: noteId } });
  },
};

export default NoteQueryHelper;
