import BadRequestError from "../../errors/BadRequestError";
import { NoteRequestBody } from "./types";

export const validateRequestBody = (note: NoteRequestBody) => {
  const { name } = note;

  if (!name) {
    throw new BadRequestError("Name must be required");
  }

  if (name.trim().length < 1) {
    throw new BadRequestError("Name should be non empty");
  }

  return Promise.resolve({ name: name.trim().toLowerCase() });
};
