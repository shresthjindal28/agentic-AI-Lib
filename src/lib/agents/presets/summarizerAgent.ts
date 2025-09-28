import { createBaseAgent } from "../baseAgent";

export const summarizerAgent = async (text: string) => {
  const agent = createBaseAgent(0.5);
  const prompt = `Summarize the following text in 2-3 sentences:\n\n${text}`;
  const result = await agent.call({ input: prompt });
  return result.output_text;
};
