import { Server, Socket } from "socket.io";
import logger from "../config/logger-config";
import redis from "../config/redis-config";
import { string } from "joi";
import NoteQueryHelper from "../database/helpers/Note.query.helper";

export type User = {
  userName: string;
  picture: string;
};

export default (io: Server, socket: Socket) => {
  const joinedRooms: Set<string> = new Set();

  socket.on("note-join", async (noteId: string, user: User) => {
    try {
      socket.join(noteId);
      joinedRooms.add(noteId);
      const redisKey = `room:${noteId}`;

      const collabrators = await redis.smembers(redisKey);
      const parsedCollab = collabrators.map((collab) => JSON.parse(collab));
      const existing = parsedCollab.find(
        (collab) => collab.user.userName === user.userName
      );

      if (existing) {
        await redis.srem(redisKey, JSON.stringify(existing));
      }

      await redis.sadd(redisKey, JSON.stringify({ socketId: socket.id, user }));
      logger.info(`${user.userName} joined in ${noteId}`);
    } catch (error) {}
  });

  socket.on("note-change-content", async (noteId: string, content: string) => {
    try {
      logger.info(`${noteId} content updated ${content}`);
      if (noteId && content) {
        await NoteQueryHelper.updateContentById(noteId, content);
        socket.to(noteId).emit("note-changed-content", content);
      }
    } catch (error) {}
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
};
