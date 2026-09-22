import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './auth';

const SOCKET_URL = 'https://stagelink-lq6s.onrender.com';

let socket: Socket | null = null;

export function connectSocket(): Socket {
  if (socket?.connected) return socket;

  const token = getAccessToken();

  socket = io(SOCKET_URL, {
    auth: { token: token ?? '' },
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}