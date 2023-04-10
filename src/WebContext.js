import { createContext, useEffect, useReducer } from "react";

const WebReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

const start_state = {
  user: null,
  isFetching: false,
  error: false
};

export const WebContext = createContext(start_state);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WebReducer, start_state);
  
  return (
    <WebContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </WebContext.Provider>
  );
};
