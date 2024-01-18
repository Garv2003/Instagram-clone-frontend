import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/Auth/AuthContext";
import { ThemeProvider } from "./Context/Theme/ThemeContext";
import { SocketProvider } from "./Context/Socket/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <ThemeProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ThemeProvider>
    </AuthProvider>
  </Router>
);
