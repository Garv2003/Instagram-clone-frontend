import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
import { AuthProvider } from "./Context/Auth/AuthContext";
import { PostProvider } from "./Context/Post/PostContext";

root.render(
  <Router>
    <AuthProvider>
      {/* <PostProvider> */}
        <App />
      {/* </PostProvider> */}
    </AuthProvider>
  </Router>
);
