"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Agent {
  id: string;
  name: string;
  code: string;
}

export default function SingleAgentPage() {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(`/api/agents/${id}`)
      .then(res => res.json())
      .then(data => setAgent(data))
      .finally(() => setLoading(false));
  }, [id]);

  const runAgent = async () => {
    const res = await fetch("/api/run", {
      method: "POST",
      body: JSON.stringify({ agentId: id }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setResult(data.output || "No result");
  };

  if (loading) return <p>Loading agent...</p>;
  if (!agent) return <p>Agent not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{agent.name}</h1>
      <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded">{agent.code}</pre>
      <button
        onClick={runAgent}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run Agent
      </button>
      {result && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded">
          <h2 className="font-bold mb-2">Output:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
