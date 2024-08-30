// Navbar

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  //const navigation = useNavigation();
  const handleNavigate = () => {
    navigate(prompt ? "?search" + prompt : navigate("/"));
    // navigate("/", { replace: true });
  };

  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className=" flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white ">
        <h1 className="text-lg md:text-xl font-extrabold">
          {" "}
          <Link to="/">Blogosphere </Link>
        </h1>
        {path === "/" && (
          <div
            onChange={(e) => setPrompt(e.target.value)}
            className="flex justify-center items-center space-x-0"
          >
            <input
              className="outlin-none rounded-l-xl px-3 text-black bg-white"
              placeholder="Search a pst "
              type="text"
            />
            <p
              onClick={handleNavigate}
              className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 ">
          {user ? (
            <h3>
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}

          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer relative"> </p>
              <FaBars />
              {Menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {Menu && <Menu />}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
