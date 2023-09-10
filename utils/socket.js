import { io } from "socket.io-client";
const socket = io.connect("http://13.213.35.217:3000");
export default socket;
