import React, { useRef ,useEffect,useState} from "react";
import "./Profilepopup.css";
import axios from "axios";
const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
const Popup = ({ Open, onClose, upload, remove}) => {
  if (!Open) {
    return null;
  }
  const [ImageUrl, setImageUrl] = useState("");
  const hiddeninput = useRef(null);
  const uploadp = () => {
    hiddeninput.current.click();
    Open=false;
  };
  useEffect(() => {
    if (ImageUrl) {
      uploading();
    }
  }, [ImageUrl]);
  const uploading = async () => {
    await axios({
      method: "Post",
      url: URL("/post/addprofilephoto"),
      data: {
        ImageUrl: ImageUrl,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      
    });
  };
  return (
    <div className="Profileppopup">
      <div className="popupprofile">
        <div className="profilepopup_item1">Change Profile Photo</div>
      </div>
      <div className="popupprofile">
        <button className="profilepopup_item bel" onClick={uploadp}>
          Upload Photo
        </button>
        <input
          type="file"
          ref={hiddeninput}
          onChange={(e) => {
            setImageUrl(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />
      </div>
      <div className="popupprofile">
        <button className="profilepopup_item rel" onClick={remove}>
          Remove Current Photo
        </button>
      </div>
      <div>
        <button className="profilepopup_item" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Popup;
