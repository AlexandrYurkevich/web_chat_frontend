import { createContext, useState } from "react";

const start_state = JSON.parse(localStorage.getItem("chat-user")) || JSON.parse(sessionStorage.getItem("chat-user")) || null;

export const WebContext = createContext(start_state);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(start_state);
  
  return (
    <WebContext.Provider value={{user, setUser}} >
      {children}
    </WebContext.Provider>
  );
};
