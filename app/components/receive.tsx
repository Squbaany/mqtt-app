"use client";

import { useEffect, useState } from "react";

type ReceiveProps = {
  message: string;
  topic: string;
};

type HistoryItem = {
  message: string;
  topic: string;
  time: string;
};

export const Receive = ({ message }: { message: ReceiveProps }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (message.topic) {
      setHistory([
        ...history,
        {
          message: message.message,
          topic: message.topic,
          time: new Date().toLocaleString("en-GB", { timeZone: "CET" }),
        },
      ]);
    }
  }, [message]);

  return (
    <div className="flex flex-col gap-4 p-4 border-gray-600 border rounded-lg">
      <h1 className="text-xl font-bold">Receiver</h1>
      <p className="text-gray-600">Messages from subscribed topics</p>
      {history.length === 0 && <div>No messages yet</div>}
      <div className="flex flex-col gap-2">
        {history.map((message, index) => (
          <div
            key={index}
            className="p-2 border border-gray-600 rounded-lg flex flex-row gap-2 min-w-[470px] text-lg"
          >
            <p className="text-gray-600">{message.topic}</p>
            {message.message}
            <p className="ml-auto">{message.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
