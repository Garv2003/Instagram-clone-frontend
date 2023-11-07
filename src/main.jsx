import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/Auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      {/* <PostProvider> */}
      <App />
      {/* </PostProvider> */}
    </AuthProvider>
  </Router>
);
