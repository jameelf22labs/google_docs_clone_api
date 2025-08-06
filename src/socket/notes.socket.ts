import { Server, Socket } from "socket.io";
import logger from "../config/logger-config";
import redis from "../config/redis-config";

type NoteUpdatePayload = {
  noteId: string;
  content: string;
};

export type User = {
  userName: string;
  picture: string;
};

export default (io: Server, socket: Socket) => {
  const joinedRooms: Set<string> = new Set();

  socket.on("note-join", async (noteId: string, user: User) => {
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
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
};
