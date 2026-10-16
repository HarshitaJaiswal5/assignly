"use client";

import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { SOCKET_EVENTS } from "@/lib/socket/events";
import type {
  GigApplicationReceivedPayload,
  GigApplicationRejectedPayload,
} from "@/types/socket.types";

interface UseApplicationEventsOptions {
  onApplicationReceived?: (
    payload: GigApplicationReceivedPayload,
  ) => void;

  onApplicationRejected?: (
    payload: GigApplicationRejectedPayload,
  ) => void;
}

export function useApplicationEvents({
  onApplicationReceived,
  onApplicationRejected,
}: UseApplicationEventsOptions = {}) {
  const { socket, status } = useSocket();

  useEffect(() => {
    if (!socket) return;

    if (onApplicationReceived) {
      socket.on(
        SOCKET_EVENTS.GIG_APPLICATION_RECEIVED,
        onApplicationReceived,
      );
    }

    if (onApplicationRejected) {
      socket.on(
        SOCKET_EVENTS.GIG_APPLICATION_REJECTED,
        onApplicationRejected,
      );
    }

    return () => {
      if (onApplicationReceived) {
        socket.off(
          SOCKET_EVENTS.GIG_APPLICATION_RECEIVED,
          onApplicationReceived,
        );
      }

      if (onApplicationRejected) {
        socket.off(
          SOCKET_EVENTS.GIG_APPLICATION_REJECTED,
          onApplicationRejected,
        );
      }
    };
  }, [socket, onApplicationReceived, onApplicationRejected]);

  return { status };
}