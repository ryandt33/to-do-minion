import {
  SET_LOADING,
  SET_API_KEY,
  SET_FUNCTION,
  SET_ASSISTANT_MESSAGE,
  SET_ERROR,
} from "../types";

const Reducer = (state, action) => {
  switch (action.type) {
    case SET_API_KEY:
      return {
        ...state,
        apiKey: action.payload,
      };
    case SET_FUNCTION:
      return {
        ...state,
        functionCall: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ASSISTANT_MESSAGE:
      return {
        ...state,
        assistantMessage: action.payload,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default Reducer;
