import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../context/todo/TodoContext";
import { AiContext } from "../../context/ai/AiContext";

const Main = () => {
  const todoContext = useContext(TodoContext);
  const aiContext = useContext(AiContext);

  const [message, setMessage] = useState("");
  const [inputApiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4-turbo-preview");
  const { todos } = todoContext;
  const { apiKey, functionCall, loading, assistantMessage, error } = aiContext;

  useEffect(() => {
    if (functionCall && model !== "nexusraven") {
      todoContext[functionCall.name](functionCall.parameters);
    } else if (model === "nexusraven" && functionCall) {
      const funcName = functionCall.split("Call: ")[1].split("(")[0];
      const params = functionCall
        .split("(")[1]
        .split(")")[0]
        .replaceAll("=", ":")
        .replaceAll("title", '"title"')
        .replaceAll("description", '"description"')
        .replaceAll("id", '"id"')
        .replaceAll(/(^"|"$|"\b|\b")/g, "'");

      console.log({ params, functionCall });

      const convertedParams = JSON.parse(`{${params}}`);

      console.log({ funcName, convertedParams });
      todoContext[funcName](convertedParams);
    }
  }, [functionCall]);

  return (
    <div className="w-screen h-screen p-5 relative">
      {apiKey ? (
        <div className="flex flex-col max-h-screen min-h-screen">
          <h1 className="text-3xl font-bold text-center">To-Do Generator</h1>
          {error ? (
            <div className="bg-red-500 text-white p-2 rounded-md my-5">
              {error}
            </div>
          ) : (
            ""
          )}
          {todos.length > 0 || assistantMessage ? (
            <div className=" overflow-y-auto grid grid-cols-2 grow">
              <div>
                <h2 className="text-xl font-semibold mt-2">To-dos</h2>
                {todos.map((todo, index) => (
                  <div key={index} className="bg-gray-100 p-3 mt-2 flex">
                    <div className="grow">
                      {" "}
                      <h3 className="font-semibold">{todo.title}</h3>
                      <p>{todo.description}</p>
                    </div>
                    <div>{todo.completed ? <span>✅</span> : ""}</div>
                  </div>
                ))}
              </div>
              {assistantMessage ? (
                <div className="ml-5">
                  <h2 className="text-xl font-semibold mt-2">Assistant</h2>
                  <div className="bg-gray-100 p-3 mt-2">
                    <p>{assistantMessage}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div className="">
            <div className="flex">
              {" "}
              <textarea
                className={`w-full h-24 p-2 ${
                  loading ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
                placeholder="Enter your to-do description"
                disabled={loading}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <select
                className="h-12 ml-5"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-4-turbo-preview">gpt-4-turbo-preview</option>
                <option value="nexusraven">NexusRaven V2</option>
              </select>
            </div>
            <button
              className="bg-blue-500 text-white p-2 mt-2"
              onClick={() => {
                console.log(message);
                aiContext.sendRequest(
                  `${message} ${
                    todos.length > 0
                      ? `\n\n Here are the current todos: ${JSON.stringify(
                          todos
                        )}`
                      : ""
                  }`,
                  model,
                  model === "nexusraven" ? "ollama" : "openai"
                );
                setMessage("");
              }}
            >
              {" "}
              Send Message
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <label className="text-lg font-semibold">
            Enter your OpenAI API Key:{" "}
          </label>
          <input
            className="border p-2 w-96"
            placeholder="API Key"
            value={inputApiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
          />
          <button
            className="bg-blue-500 text-white p-2 mt-2"
            onClick={() => aiContext.setAPIKey(inputApiKey)}
          >
            Submit API Key
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
