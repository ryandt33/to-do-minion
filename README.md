# To Do Minion

A very simple react app that uses OpenAI's function calling to interface with the state.

## Getting started

1. Clone the repo

2. CD into the directory

```
npm -i
```

```
npm run dev
```

## The logic

The following JSON object is sent as the **tools** to OpenAI

````
 [
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
      ]
      ```
````
