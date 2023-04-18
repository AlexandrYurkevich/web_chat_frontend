import { createContext, useReducer } from "react";

const WebReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {user: null,
        isAuth: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAuth: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isAuth: true,
        error: true,
      };
      case "REG_START":
        return {user: null,
          isAuth: false,
          error: false,
        };
      case "REG_SUCCESS":
        return {
          user: action.payload,
          isAuth: false,
          error: false,
        };
      case "REG_FAILURE":
        return {
          user: null,
          isAuth: false,
          error: true,
        };
    default:
      return state;
  }
};

console.log(JSON.parse(localStorage.getItem("user")));
const start_state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: false,
  error: false
};

export const WebContext = createContext(start_state);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WebReducer, start_state);
  
  return (
    <WebContext.Provider
      value={{
        user: state.user,
        isAuth: state.isAuth,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </WebContext.Provider>
  );
};
