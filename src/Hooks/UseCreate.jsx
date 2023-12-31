import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

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

      const response = await axios.post(`${API_URL}/post/addpost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    } finally {
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
