import {io} from 'socket.io-client';

const SOCKET_HOST = process.env.REACT_APP_SOCKET_HOST || 'localhost';
const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT || '5000';
const SOCKET_URL = `http://${SOCKET_HOST}:${SOCKET_PORT}`;

const socket = io(SOCKET_URL);

export default socket;