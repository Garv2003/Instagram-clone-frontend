import { useNavigate } from "react-router-dom";

export default function UsePrev() {
  const navigate = useNavigate();
  const prev = () => {
    navigate(-1);
  };
  const next = () => {
    navigate(1);
  };
  return { prev, next };
}
