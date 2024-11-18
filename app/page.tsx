"use client";

import { useState, useEffect } from "react";
import { Connection } from "./components/connection";
import mqtt from "mqtt";
import { Subscribe } from "./components/subscribe";
import { Receive } from "./components/receive";

type ReceiveProps = {
  message: string;
  topic: string;
};

export default function Home() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState<ReceiveProps>({
    message: "",
    topic: "",
  });
  const [status, setStatus] = useState<string>("Idle");

  const mqttConnect = (
    host: string,
    port: string,
    username: string,
    password: string
  ) => {
    setStatus("Connecting");

    setClient(
      mqtt.connect(`wss://${host}:${port}/mqtt`, {
        username,
        password,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
      })
    );
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setStatus("Connected");
      });

      client.on("reconnect", () => {
        setStatus("Reconnecting");
      });

      client.on("error", (error) => {
        setStatus(error.message);
      });

      client.on("message", (topic, message) => {
        setMessage({ topic, message: message.toString() });
      });

      return () => {
        client.end();
      };
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end();
      setClient(null);
      setStatus("Disconnected");
    }
  };

  const mqttSubscribe = (topic: string, qosnum: 0 | 1 | 2) => {
    if (client) {
      client.subscribe(topic, { qos: qosnum }, (err) => {
        if (!err) {
          setIsSubscribed(true);
        }
      });
    }
  };

  const mqttUnsubscribe = (topic: string) => {
    if (client) {
      client.unsubscribe(topic, (err) => {
        if (!err) {
          setIsSubscribed(false);
        }
      });
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-12 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold">Welcome to MQTT-APP</h1>
          <p className="text-lg text-gray-600">A simple MQTT client.</p>
        </div>
        <Connection
          connect={mqttConnect}
          disconnect={mqttDisconnect}
          status={status}
        />
        <Subscribe
          subscribe={mqttSubscribe}
          unsubscribe={mqttUnsubscribe}
          status={isSubscribed}
        />

        <Receive message={message} />
      </main>
    </div>
  );
}
