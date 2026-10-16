export { SOCKET_EVENTS } from '@/lib/socket/events';
export {
  createSocketClient,
  disconnectSocket,
  type AppSocket,
} from "./client";
export type {
  GigApplicationReceivedPayload,
  GigApplicationRejectedPayload,
} from '@/types/socket.types';