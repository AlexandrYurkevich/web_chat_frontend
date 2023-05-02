import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { WebContext } from "./WebContext";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

const App = () => {
    const { user } = useContext(WebContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    user ? <Navigate to="/chat" /> : <Navigate to="/login" />
                }/>
                <Route path="/login" element={
                    user ? <Navigate to="/" /> : <Login/>
                }/>
                <Route path="/register" element={
                    user ? <Navigate to="/" /> : <Register/>
                }/>
                <Route path="/chat" element={
                    !user ? <Navigate to="/" /> : <Chat/>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;