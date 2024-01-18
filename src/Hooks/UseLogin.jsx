import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function UseLogin(setProgress) {
  const [username, setUsername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordhidden = useRef(null);
  const [showPassword2, setShowPassword2] = useState(false);
  const confirmpasswordhidden = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/login") {
      if (showPassword) {
        passwordhidden.current.type = "text";
      } else {
        passwordhidden.current.type = "password";
      }
    }
  }, [showPassword]);

  useEffect(() => {
    if (window.location.pathname === "/signup") {
      if (showPassword2) {
        confirmpasswordhidden.current.type = "text";
      } else {
        confirmpasswordhidden.current.type = "password";
      }
    }
  }, [showPassword2]);

  function changeVisibility() {
    if (passwordhidden.current.type === "password") {
      passwordhidden.current.type = "text";
      setShowPassword(true);
    } else {
      passwordhidden.current.type = "password";
      setShowPassword(false);
    }
  }
  function changeVisibility2() {
    if (confirmpasswordhidden.current.type === "password") {
      confirmpasswordhidden.current.type = "text";
      setShowPassword2(true);
    } else {
      confirmpasswordhidden.current.type = "password";
      setShowPassword2(false);
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    setProgress(20);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      if (!response.data.success) {
        setProgress(50);
        console.log(response.data.msg);
        toast.error(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
        setProgress(100);
        return;
      }

      setProgress(70);
      toast.success("Login Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      setLoading(false);
      setProgress(100);
      setTimeout(() => {
        localStorage.setItem("token", response.data.token);
        window.location.assign("/profile");
      }, 500);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while logging in.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !name || !email) {
      toast.error("Please fill all the fields", {
        theme: "dark",
      });
      if (!email.includes("@")) {
        toast.error("Please enter a valid email", {
          theme: "dark",
        });
      }
      if (password.length < 8) {
        toast.error("Password must be atleast 8 characters long", {
          theme: "dark",
        });
      }
      return;
    } else if (password !== confirmpassword) {
      toast.error("Passwords do not match", {
        theme: "dark",
      });
      return;
    }
    const data = { username, name, password, email };
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setemail("");
    setname("");
    try {
      setLoading(true);
      await axios
        .post(`${API_URL}/auth/register`, {
          data,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: "dark",
            });
            navigate("/login");
          } else {
            toast.error(res.data.message, {
              theme: "dark",
            });
          }
        });

      setLoading(false);
      toast.success("Account created successfully", {
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while signing up.", {
        theme: "dark",
      });
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    passwordhidden,
    loading,
    setLoading,
    changeVisibility,
    confirmpasswordhidden,
    confirmpassword,
    setConfirmPassword,
    name,
    setname,
    email,
    setemail,
    changeVisibility2,
    handleLogin,
    handleRegister,
    showPassword2,
  };
}
