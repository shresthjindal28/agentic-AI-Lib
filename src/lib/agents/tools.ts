import { Tool } from "langchain/tools";
export const calculatorTool = new Tool({
  name: "Calculator",
  description: "Performs basic arithmetic calculations.",
  func: async (input: string) => {
    try {
      const result = eval(input);
      return String(result);
    } catch (err) {
      return "Error: Invalid expression";
    }
  },
});


export const searchTool = new Tool({
  name: "Search",
  description: "Search online for information and return a short summary.",
  func: async (query: string) => {
    // In production, integrate with Google API, Bing, or SerpAPI
    // For now, just return a placeholder
    return `Search result for "${query}" (mock response)`;
  },
});

// 3️⃣ Todo manager tool
let todoList: string[] = [];
export const todoTool = new Tool({
  name: "TodoManager",
  description: "Add a task to your to-do list.",
  func: async (task: string) => {
    todoList.push(task);
    return `Task added! Current to-do list: ${todoList.join(", ")}`;
  },
});

// 4️⃣ Export all tools as an array
export const tools: Tool[] = [calculatorTool, searchTool, todoTool];
