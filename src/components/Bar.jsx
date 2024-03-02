import PropTypes from "prop-types";
import UsePrev from "../Hooks/UsePrev";
import { Icon } from "../utils/iconutitls";

const Bar = ({ text }) => {
  const { prev } = UsePrev();

  return (
    <div className="bar_header">
      <button className="bar_header_btn">
        <Icon
          name="GrFormPreviousLink"
          onClick={() => {
            prev();
          }}
        />
      </button>
      <span>{text}</span>
    </div>
  );
};

Bar.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Bar;
