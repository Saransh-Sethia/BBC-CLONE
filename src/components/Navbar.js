import React from "react";
import bbclogo from "../assets/bbclogo.png";
import signin from "../assets/signin.png";
import searchicon from "../assets/search-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";

const Navbar = ({ setMenu, setSearch, search }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log(auth);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  }
  return (
    <div className="grid grid-cols-3 bg-black text-white fixed">
      <div className="flex p-2">
        <img src={bbclogo} alt="logo" className="h-10" />
        {auth.currentUser ? (
          <button
            onClick={logout}
            className="text-white flex hover:border border-white ml-5 mt-1 pt-1 pb-1 w-20 pr-1"
          >
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <button className="text-white flex hover:border border-white ml-5 w-48 pt-2 pr-2 pl-5">
              <img src={signin} alt="user" className="h-7 w-8" />
              Sign in
            </button>
          </Link>
        )}
      </div>
      <div className="flex">
        <button
          onClick={() => setMenu("all")}
          className="font-semibold text-sm"
        >
          Home
        </button>
        <button
          onClick={() => setMenu("science")}
          className="ml-7 font-semibold text-sm"
        >
          Science
        </button>
        <button
          onClick={() => setMenu("movies")}
          className="ml-7 font-semibold text-sm"
        >
          Movies
        </button>
        <button
          onClick={() => setMenu("food")}
          className="ml-7 font-semibold text-sm"
        >
          Food
        </button>
        <button
          onClick={() => setMenu("worklife")}
          className="ml-7 font-semibold text-sm"
        >
          Worklife
        </button>
        <button
          onClick={() => setMenu("travel")}
          className="ml-7 font-semibold text-sm"
        >
          Travel
        </button>
        <button
          onClick={() => setMenu("future")}
          className="ml-7 font-semibold text-sm"
        >
          Future
        </button>
        <button
          onClick={() => setMenu("culture")}
          className="ml-7 font-semibold text-sm"
        >
          Culture
        </button>
      </div>
      <div className="ml-40 flex p-4">
        <img src={searchicon} alt="search" className="h-6 pr-2" />
        <input onChange={handleChange} value={search} className="flex bg-black" placeholder="Search BBC" />
      </div>
    </div>
  );
};

export default Navbar;
