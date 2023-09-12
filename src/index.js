import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
import { PostProvider } from "./Context/Post/PostContext";
import { UserProvider } from "./Context/User/UserContext";
import { ExploreProvider } from "./Context/Explore/ExploreContext";
import { AuthProvider } from "./Context/Auth/AuthContext";

root.render(
  <Router>
    <AuthProvider>
      <PostProvider>
        <UserProvider>
          <ExploreProvider>
            <App />
          </ExploreProvider>
        </UserProvider>
      </PostProvider>
    </AuthProvider>
  </Router>
);
