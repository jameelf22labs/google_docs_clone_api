import { Request } from "express";
import ApiHandler from "../../common/decors/api.handler";
import redis from "../../config/redis-config";

export default class CollabHandler {
  @ApiHandler()
  async handleGetAllMembers(request: Request) {
    const { noteId } = request.params;
    const roomKey = `room:${noteId}`;
    const collabrators = await redis.smembers(roomKey);
    const parsedCollab = collabrators.map((collab) => JSON.parse(collab));
    return {
      collabrator: parsedCollab,
    };
  }

  @ApiHandler()
  async handleLeaveRoom(request: Request) {
    const { noteId, userName } = request.body;

    if (!noteId || !userName) {
      throw new Error("NoteId and username should be required");
    }

    const roomKey = `room:${noteId}`;
    const collabs = await redis.smembers(roomKey);

    const updated = collabs.filter((item) => {
      try {
        const parsed = JSON.parse(item);
        return parsed?.user?.userName !== userName;
      } catch {
        return true;
      }
    });

    await redis.del(roomKey);
    if (updated.length > 0) {
      await redis.sadd(roomKey, ...updated);
    }

    return {
      message: "User removed from room",
    };
  }
}
