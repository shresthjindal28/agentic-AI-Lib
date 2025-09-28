import { createBaseAgent } from "../baseAgent";

export const calculatorAgent = async (expression: string) => {
  const agent = createBaseAgent(0);
  const prompt = `Calculate the result of: ${expression}`;
  const result = await agent.call({ input: prompt });
  return result.output_text;
};
