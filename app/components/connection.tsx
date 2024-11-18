"use client";

import { useState } from "react";

type ConnectionProps = {
  host: string;
  port: string;
  username: string;
  password: string;
};

export const Connection = ({
  connect,
  disconnect,
  status,
}: {
  connect: (
    host: string,
    port: string,
    username: string,
    password: string
  ) => void;
  disconnect: () => void;
  status: string;
}) => {
  const [formData, setFormData] = useState<ConnectionProps>({
    host: "",
    port: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnect = () => {
    console.log(formData);
    connect(formData.host, formData.port, formData.username, formData.password);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-gray-600 border rounded-lg">
      <div>
        <h1 className="text-xl font-bold">Connect</h1>
        <p className="text-gray-600">Please enter details</p>
      </div>
      <form className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Host"
          name="host"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Port"
          name="port"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </form>
      <div className="grid col-span-2 gap-2 pt-2">
        <button
          className="bg-green-600 hover:bg-green-500 duration-200"
          onClick={handleConnect}
        >
          Connect
        </button>
        <button
          className="bg-red-600 hover:bg-red-500 duration-200"
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      </div>
      <p>
        Status:{" "}
        <span
          className={
            status === "Connected"
              ? "text-green-400"
              : status === "Disconnected"
              ? "text-red-500"
              : status === "Idle"
              ? "text-gray-600"
              : "text-yellow-500"
          }
        >
          {status}
        </span>
      </p>
    </div>
  );
};
