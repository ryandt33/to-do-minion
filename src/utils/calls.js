const openai = async (message, model, apiKey) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "You are a helpful to-do assistant",
        },
        {
          role: "user",
          content: message,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "createTodo",
            description: "Create a new todo",
            parameters: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the todo",
                },
                description: {
                  type: "string",
                  description: "The description of the todo",
                },
              },
            },
          },
        },
        {
          type: "function",
          function: {
            name: "deleteTodo",
            description: "Delete a todo",
            parameters: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "The id of the todo",
                },
              },
            },
          },
        },
        {
          type: "function",
          function: {
            name: "editTodo",
            description: "Update a todo",
            parameters: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "The id of the todo",
                },
                title: {
                  type: "string",
                  description: "The title of the todo",
                },
                description: {
                  type: "string",
                  description: "The description of the todo",
                },
              },
            },
          },
        },
        {
          type: "function",
          function: {
            name: "completeTodo",
            description: "Mark a todo as completed",
            parameters: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "The id of the todo",
                },
              },
            },
          },
        },
      ],
    }),
  });

  return await response.json();
};

const anthropic = async (message, model, apiKey) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "tools-2024-04-04",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      tools: [
        {
          name: "createTodo",
          description: "Create a new todo",
          input_schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the todo",
              },
              description: {
                type: "string",
                description: "The description of the todo",
              },
            },
          },
        },
        {
          name: "deleteTodo",
          description: "Delete a todo",
          input_schema: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "The id of the todo",
              },
            },
          },
        },
        {
          name: "editTodo",
          description: "Update a todo",
          input_schema: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "The id of the todo",
              },
              title: {
                type: "string",
                description: "The title of the todo",
              },
              description: {
                type: "string",
                description: "The description of the todo",
              },
            },
          },
        },
        {
          name: "completeTodo",
          description: "Mark a todo as completed",
          input_schema: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "The id of the todo",
              },
            },
          },
        },
      ],
      system:
        "You are a sarcastic, condescending asshole. Make your comments reflect that. Remember, one rule : PROFUSE PROFANITY!",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  return await response.json();
};

export default { openai, anthropic };
