import React, { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import TodoReducer from "./TodoReducer";

import { ADD_TODO, EDIT_TODO, COMPLETE_TODO, DELETE_TODO } from "../types";

const TodoState = (props) => {
  const initialState = {
    todos: [],
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const createTodo = async (todo) => {
    dispatch({
      type: ADD_TODO,
      payload: todo,
    });
  };

  const editTodo = async (todo) => {
    dispatch({
      type: EDIT_TODO,
      payload: todo,
    });
  };

  const completeTodo = async (todo) => {
    dispatch({
      type: COMPLETE_TODO,
      payload: todo,
    });
  };

  const deleteTodo = async (todo) => {
    dispatch({
      type: DELETE_TODO,
      payload: todo,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        deleteTodo,
        createTodo,
        editTodo,
        completeTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
