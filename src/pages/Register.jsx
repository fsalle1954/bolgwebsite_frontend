// > src > pages > # Registerjsx >   Register
import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { registercss } from "../components/register/register.css";
import { Link, useNavigation } from "react-router-dom";
import { URL } from "../url";

function Register() {
  const navigate = useNavigation();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { username, email, password } = data;
    try {
      const { data } = await axios.post(URL + "/register", {
        username,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Successful. Welcome! ");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="enter username..."
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className=" px-4 py-2 outline-none "
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className=" px-4 py-2 outline-none "
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className=" px-4 py-2 outline-none "
        />
        <button type="submit ">Submit</button>
      </form>
    </div>
  );
}
export default Register;
