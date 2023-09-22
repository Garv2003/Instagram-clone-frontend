import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function UseSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      axios
        .get(`${API_URL}/user/search?user=${search}`)
        .then((res) => {
          setLoading(false);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
      setUsers([]);
    }
  }, [search]);

  return { search, setSearch, users ,loading};
}
