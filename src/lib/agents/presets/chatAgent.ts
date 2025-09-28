import { ChatOpenAI } from "@langchain/openai";
import { initializeAgentExecutor } from "langchain/agents";
import { Tool } from "langchain/tools";

// Example tool
const tools: Tool[] = [
  new Tool({
    name: "Calculator",
    description: "Performs basic math calculations",
    func: async (input: string) => eval(input),
  }),
];

export const chatAgent = async (input: string) => {
  const model = new ChatOpenAI({ temperature: 0.7 });
  const executor = initializeAgentExecutor(tools, model);
  const result = await executor.call({ input });
  return result.output_text;
};
