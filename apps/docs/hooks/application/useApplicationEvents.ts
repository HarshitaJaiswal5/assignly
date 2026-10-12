'use client';

import { useEffect, useRef } from 'react';

import { getSocket } from '@/lib/socket/socket-client';
import { SocketEvent } from '@/lib/socket/socket-events';

import type {
  GigApplicationReceivedPayload,
  GigApplicationRejectedPayload,
} from '@/lib/socket/socket.types';

interface ApplicationEventHandlers {
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
}: ApplicationEventHandlers = {}) {
  const receivedRef = useRef(onApplicationReceived);
  const rejectedRef = useRef(onApplicationRejected);

  useEffect(() => {
    receivedRef.current = onApplicationReceived;
    rejectedRef.current = onApplicationRejected;
  }, [onApplicationReceived, onApplicationRejected]);

  useEffect(() => {
    const socket = getSocket();

    const handleReceived = (
      payload: GigApplicationReceivedPayload,
    ) => {
      receivedRef.current?.(payload);
    };

    const handleRejected = (
      payload: GigApplicationRejectedPayload,
    ) => {
      rejectedRef.current?.(payload);
    };

    socket.on(
      SocketEvent.GIG_APPLICATION_RECEIVED,
      handleReceived,
    );

    socket.on(
      SocketEvent.GIG_APPLICATION_REJECTED,
      handleRejected,
    );

    return () => {
      socket.off(
        SocketEvent.GIG_APPLICATION_RECEIVED,
        handleReceived,
      );

      socket.off(
        SocketEvent.GIG_APPLICATION_REJECTED,
        handleRejected,
      );
    };
  }, []);
}