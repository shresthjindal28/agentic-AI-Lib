import { ChatOpenAI } from "@langchain/openai";

import { initializeAgentExecutor } from "langchain/agents";
import { tools } from "./tools";

export const createBaseAgent = (temperature = 0) => {
  const model = new ChatOpenAI({ temperature });
  const executor = initializeAgentExecutor(tools, model);
  return executor;
};
