import { createBaseAgent } from "../baseAgent";

export const todoAgent = async (task: string) => {
  const agent = createBaseAgent(0.3);
  const prompt = `Add this task to a to-do list: ${task}`;
  const result = await agent.call({ input: prompt });
  return result.output_text;
};
