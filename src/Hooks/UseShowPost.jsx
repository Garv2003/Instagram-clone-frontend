import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function UseShowPost() {
  const navigate = useNavigate();

  const handleUpdate = () => {
    // axios
    //   .post(`${import.meta.env.VITE_APP_BACKEND_URL}/post/updatepost/${post._id}`, {
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
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/deletepost/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Post deleted successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error("Error deleting post");
      // console.error("Error deleting post:", error);
    }
  };

  return { handleUpdate, handleDeletePost };
}
