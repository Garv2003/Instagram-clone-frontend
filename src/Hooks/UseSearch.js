import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:3456";

export default function UseSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (search) {
      axios
        .get(`${API_URL}/user/search?user=${search}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUsers([]);
    }
  }, [search]);

  return { search, setSearch, users };
}