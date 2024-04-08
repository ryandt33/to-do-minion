import React, { useReducer } from "react";
import { AiContext } from "./AiContext";
import AiReducer from "./AiReducer";
import calls from "../../src/utils/calls";

import {
  SET_API_KEY,
  SET_FUNCTION,
  SET_LOADING,
  SET_ASSISTANT_MESSAGE,
  SET_ERROR,
} from "../types";

const AiState = (props) => {
  const initialState = {
    functionCall: null,
    assistantMessage: null,
    apiKey: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(AiReducer, initialState);

  const setAPIKey = async (apiKey) => {
    dispatch({
      type: SET_API_KEY,
      payload: apiKey,
    });
  };

  const sendRequest = async (message, model, platform = "openai") => {
    dispatch({
      type: SET_LOADING,
    });
    const data = await calls[platform](message, model, state.apiKey);

    console.log(data.error);
    if (data.error) {
      dispatch({
        type: SET_ERROR,
        payload: data.error.message,
      });
      return;
    }
    console.log(data?.choices?.[0]?.message?.tool_calls?.[0]?.function);

    if (data?.choices?.[0]?.message?.tool_calls?.[0]?.function) {
      const func = data.choices[0].message.tool_calls[0].function;

      console.log("setting");
      dispatch({
        type: SET_FUNCTION,
        payload: { name: func.name, parameters: JSON.parse(func.arguments) },
      });
    } else if (data?.choices?.[0]?.message?.content) {
      console.log("setting");
      const message = data.choices[0].message.content;

      const func = message.split("```json ")[1]?.split("```")[0];

      if (func) {
        dispatch({
          type: SET_FUNCTION,
          payload: JSON.parse(func),
        });

        return;
      }
      dispatch({
        type: SET_ASSISTANT_MESSAGE,
        payload: data.choices[0].message.content,
      });
    } else if (data.message.content) {
      console.log(data.message.content);
      dispatch({
        type: SET_FUNCTION,
        payload: data.message.content,
      });
    }
  };

  return (
    <AiContext.Provider
      value={{
        functionCall: state.functionCall,
        apiKey: state.apiKey,
        loading: state.loading,
        assistantMessage: state.assistantMessage,
        error: state.error,
        setAPIKey,
        sendRequest,
      }}
    >
      {props.children}
    </AiContext.Provider>
  );
};

export default AiState;
