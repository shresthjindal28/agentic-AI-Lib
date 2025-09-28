import Link from "next/link";

interface Agent {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/dashboard/agents/${agent.id}`}>
      <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
        <h2 className="font-bold text-lg">{agent.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {agent.code.slice(0, 100)}...
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Created at: {new Date(agent.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
