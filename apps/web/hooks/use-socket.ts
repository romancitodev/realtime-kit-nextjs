import { useContext } from "react";
import { SocketContext } from "@/context/socket";

export const useSocket = () => useContext(SocketContext);
