"use client";

import { FC, createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

type Props = {
  children: React.ReactNode;
}

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider:FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIO(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: 'api/socket/io',
        addTrailingSlash: false,
      }
    ) as any;
    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Connected!")
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected!")
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.connect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
