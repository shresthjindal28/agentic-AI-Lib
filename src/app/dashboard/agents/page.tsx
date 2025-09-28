"use client";

import { useEffect, useState } from "react";
import AgentCard from "@/components/AgentCard";

interface Agent {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents")
      .then(res => res.json())
      .then(data => setAgents(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading agents...</p>;
  if (!agents.length) return <p>No agents found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
