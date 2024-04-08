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

const ollama = async (message, model) => {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "nexusraven",
      messages: [
        {
          role: "user",
          content: `
          Function: def createTodo(title,description):
              """
               Creates a todo / reminder
            
              Args:
                title - the name of the todo
            
                description - the description of the todo - make this witty and sarcastic, it should be a comment to the user. It cannot be null
            
            
              Returns:
                todo
              """

          Function: def deleteTodo(id):
            """
              deletes a todo
          
            Args:
              id - the id of the todo
          
          
            Returns:
              true
              """

          Function: def editTodo(id,title,description):
              """
                Updates a todo, use this to change the title and description
            
              Args:
                id - the id of the todo
              
                title - the name of the todo
            
                description - the description of the todo - make this witty and sarcastic, it should be a comment to the user. It cannot be null
            
            
              Returns:
                todo
            """
          Function: def completeTodo(title,description):
            """
              Marks a todo as completed
          
            Args:
              id - the id of the todo

          
          
            Returns:
              todo
            """

            User Query: ${message}<human_end>`,
        },
      ],
      stream: false,
      temperature: 0.5,
      options: {
        stop: ["\nThought:"],
      },
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

export default { openai, anthropic, ollama };
