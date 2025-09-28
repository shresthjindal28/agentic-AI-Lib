import { createBaseAgent } from "../baseAgent";

export const searchAgent = async (query: string) => {
  const agent = createBaseAgent(0.3);
  const prompt = `Search online and provide a concise answer for: ${query}`;
  const result = await agent.call({ input: prompt });
  return result.output_text;
};
