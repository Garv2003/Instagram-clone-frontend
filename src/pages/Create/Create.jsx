import { useEffect } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../layout/Navbar/Navbar";
import logo from "../../assets/load-37.gif";
import "./Create.css";
import UseCreate from "../../Hooks/UseCreate";
import Bar from "../../components/Bar/Bar";

const Create = ({ setProgress }) => {
  document.title = "Create Post • Instagram";
  const {
    title,
    setTitle,
    description,
    setDescription,
    setFile,
    loading,
    handleSubmit,
  } = UseCreate();
  useEffect(() => {
    setProgress(10);
    setProgress(100);
  }, [setProgress]);
  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <Bar text="Create Post" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "85vh",
            alignItems: "center",
          }}
        >
          {loading ? (
            <div className="loader" style={{ textAlign: "center" }}>
              <img src={logo} alt="Loading" />
              <h1>Creating Post....</h1>
            </div>
          ) : (
            <div className="container">
              <div className="tic">
                <h1>Create New Post</h1>
              </div>
              <AddPhotoAlternateIcon className="fas" sx={{ fontSize: 150 }} />
              <div>
                <form onSubmit={handleSubmit} className="dl-2">
                  <div className="field">
                    <input
                      id="Title"
                      type="text"
                      className="login-input"
                      placeholder="Title"
                      name="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="login-label" htmlFor="Title">
                      Title
                    </label>
                  </div>
                  <div className="field">
                    <input
                      id="Description"
                      type="text"
                      className="login-input"
                      placeholder="Description"
                      name="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className="login-label" htmlFor="Description">
                      Description
                    </label>
                  </div>
                  <div>
                    <input
                      className="input12"
                      type="file"
                      accept="image/*,video/*"
                      name="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button className="submitbtn" type="submit">
                    Create Post
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
