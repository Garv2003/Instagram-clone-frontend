import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function UseShowPost() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    // axios
    //   .post(`${API_URL}/post/updatepost/${post._id}`, {
    //     ImageUrl: post.ImageUrl,
    //     title: post.title,
    //     description: post.description,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })    
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/post/deletepost/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return { handleBack, handleUpdate, handleDeletePost };
}
