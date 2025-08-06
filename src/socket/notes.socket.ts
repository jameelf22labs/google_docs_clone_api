import { DefaultEventsMap, Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";

export default (
  io: SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    
};
