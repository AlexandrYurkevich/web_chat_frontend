import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { WebContext } from "./WebContext";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";

const App = () => {
    const { user } = useContext(WebContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    user ? <Chat /> : <Login/>
                }
                />
                <Route path="/login" element={
                    user ? <Navigate to="/" /> : <Login/>
                }
                />
                <Route path="/chat" element={
                    !user ? <Navigate to="/" /> : <Chat/>
                }
                />
            </Routes>
        </BrowserRouter>
    )
}
export default App;