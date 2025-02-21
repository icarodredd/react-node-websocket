import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

interface User {
  username: string;
  state: { x: number; y: number };
}

export default function Play({ username }: { username: string }) {
  const wsUrl = "ws://localhost:8080";
  const {
    sendJsonMessage,
    lastJsonMessage,
  }: { sendJsonMessage: SendJsonMessage; lastJsonMessage: User[] } =
    useWebSocket(wsUrl, {
      queryParams: { username },
    });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  const renderCursors = (users: User[]) => {
    return Object.keys(users).map((uuid) => {
      return (
        <Cursor key={uuid} point={[users[uuid].state.x, users[uuid].state.y]} />
      );
    });
  };

  const renderUsersList = (users: User[]) => {
    return Object.keys(users).map((uuid) => {
      return <li key={uuid}>{users[uuid].username} is online!</li>;
    });
  };

  useEffect(
    () =>
      window.addEventListener("mousemove", (e) => {
        sendJsonMessageThrottled.current({ x: e.clientX, y: e.clientY });
      }),
    []
  );

  if (lastJsonMessage) {
    return (
      <>
        {renderCursors(lastJsonMessage)}
        {renderUsersList(lastJsonMessage)}
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Hello, {username}!</h1>
    </>
  );
}
