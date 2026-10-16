"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";

import {
  createSocketClient,
  type AppSocket,
} from "@/lib/socket/client";

type SocketStatus = "disconnected" | "connecting" | "connected";

interface SocketContextValue {
  socket: AppSocket | null;
  status: SocketStatus;
}

const SocketContext = createContext<SocketContextValue | undefined>(
  undefined,
);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { status: sessionStatus } = useSession();

  const [socket, setSocket] = useState<AppSocket | null>(null);
  const [status, setStatus] = useState<SocketStatus>("disconnected");

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      setSocket(null);
      setStatus("disconnected");
      return;
    }

    const client = createSocketClient();

    function handleConnect() {
      setStatus("connected");
    }

    function handleDisconnect() {
      setStatus("disconnected");
    }

    function handleConnectError(error: Error) {
      setStatus("disconnected");
      console.log("Socket connection failed:", error.message);
    }

    setSocket(client);
    setStatus("connecting");

    client.on("connect", handleConnect);
    client.on("disconnect", handleDisconnect);
    client.on("connect_error", handleConnectError);

    client.connect();

    return () => {
      client.off("connect", handleConnect);
      client.off("disconnect", handleDisconnect);
      client.off("connect_error", handleConnectError);

      client.disconnect();

      setSocket(null);
      setStatus("disconnected");
    };
  }, [sessionStatus]);

  return (
    <SocketContext.Provider value={{ socket, status }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(): SocketContextValue {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }

  return context;
}