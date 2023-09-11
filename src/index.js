import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
import { PostProvider } from "./Context/Post/PostContext";
import { UserProvider } from "./Context/User/UserContext";

root.render(
  <Router>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </Router>
);
