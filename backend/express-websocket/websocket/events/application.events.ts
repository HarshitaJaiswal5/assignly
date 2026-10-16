import { WebSocketEvent } from '@wss/events/events.types.js';

export const ApplicationEvents = {
  received: WebSocketEvent.GIG_APPLICATION_RECEIVED,
  rejected: WebSocketEvent.GIG_APPLICATION_REJECTED,
};