import { useState } from "react";
import axios from "axios";
const shortid = require("shortid");
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function UseCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", file.type);
      formData.append("file", file);
      formData.append("post_short_id", shortid.generate());

      const response = await axios.post(`${API_URL}/post/addpost`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };
  return {
    title,
    setTitle,
    description,
    setDescription,
    file,
    setFile,
    loading,
    setLoading,
    handleSubmit,
  };
}
