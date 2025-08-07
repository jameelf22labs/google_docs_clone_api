import { Router } from "express";
import CollabHandler from "./collab.handler";

const collabRouter = Router();
const collabHandler = new CollabHandler();

collabRouter.get(
  "/:noteId",
  collabHandler.handleGetAllMembers.bind(collabHandler)
);

collabRouter.post(
  "/leaveRoom",
  collabHandler.handleLeaveRoom.bind(collabHandler)
);


export default collabRouter;