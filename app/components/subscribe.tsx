"use client";

import { useState } from "react";

type SubscribeProps = {
  topic: string;
  qos: 0 | 1 | 2;
};

export const Subscribe = ({
  subscribe,
  unsubscribe,
  status,
}: {
  subscribe: (topic: string, qos: 0 | 1 | 2) => void;
  unsubscribe: (topic: string) => void;
  status: boolean;
}) => {
  const [formData, setFormData] = useState<SubscribeProps>({
    topic: "",
    qos: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      qos: parseInt(e.target.value) as 0 | 1 | 2,
    });
  };

  const handleSubscribe = () => {
    console.log(formData);
    subscribe(formData.topic, formData.qos);
  };

  const handleUnsubscribe = () => {
    unsubscribe(formData.topic);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-gray-600 border rounded-lg">
      <div>
        <h1 className="text-xl font-bold">Subscribe</h1>
        <p className="text-gray-600">Please enter topic</p>
      </div>
      <form className="grid grid-cols-5 gap-2">
        <input
          type="text"
          placeholder="Topic"
          name="topic"
          onChange={handleChange}
          className="col-span-4"
        />
        <div className="flex items-center gap-2 justify-items-end">
          <label htmlFor="qos">QoS</label>
          <select name="qos" onChange={handleSelect}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </form>
      <div className="grid col-span-2 gap-2 pt-2">
        <button
          className="bg-green-600 hover:bg-green-500 duration-200"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
        <button
          className="bg-red-600 enabled:hover:bg-red-500 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleUnsubscribe}
          disabled={!status}
        >
          Unsubscribe
        </button>
      </div>
    </div>
  );
};
