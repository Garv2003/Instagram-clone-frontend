import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Bar.css";

const Bar = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="bar_header">
      <button className="bar_header_btn">
        <ArrowBackIcon
          onClick={() => {
            goBack();
          }}
        />
      </button>
      <span>{props.text}</span>
    </div>
  );
};

export default Bar;
