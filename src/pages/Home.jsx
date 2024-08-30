import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import HomePosts from "../components/HomePost";
import Footer from "../components/Footer";
import { URL } from "../url";
import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { BrowserRouter } from "react-router-dom";
function Home() {
  const { search } = useLocation();
  const [posts, setPosts] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [Loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      setFilterData(res.data);
      let cata = res.data.map((item) => {
        return item.categories;
      });
      let sets = new Set();
      cata.forEach((category) => {
        category?.forEach((catas) => {
          if (cata.length > 0) sets.add(catas);
        });
      });
      setCat(Array.from(sets));
      console.log(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setNoResults(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [search]);

  const fillterData = (filerData) => {
    let newpost = posts.filter((pos) => {
      return pos?.categories.includes(fillterData);
    });
    setFilterData(newpost);
  };
  return (
    <>
      <div>
        <Navbar />

        <div>
          <div className="flex flex-wrap ">
            <div className=" p-3 m-5 flex flex-wrap justify-center ">
              {cat.length &&
                cat?.map((category) => {
                  return (
                    <button
                      className=" p-3 m-5 h-[90px] w-[150px] border text-lg font-semibold bg-white
hover: shadow-blue-20@ shadow shadow-black"
                      onClick={() => fillterData(category)}
                    >
                      {category}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
