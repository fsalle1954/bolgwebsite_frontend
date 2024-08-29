// frontend > src > pages > % EditPostjsx > W EditPost
import React from "react";
import { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function EditPost() {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("a");
  const [cats, setCats] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get("/api/posts/" + postId);
      setTitle(res.data.title);

      setDesc(res.data.desc);

      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.Log(data)

      //img upload

      try {
        const imgUpload = await axios.post("/api/upload", data);
        // console. log(imgUpLoad. data)
      } catch (err) {
        console.log(err);
      }
    }

    //post upload
    // console. log(post)

    try {
      const res = await axios.put("/api/posts/", postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  return (
    <div>
      <Navbar />
      <div className=" flex justify-center ">
        <div className="p-4 border w-[70%] flex flex-col justify-center px-6 md:px-[200px] mt-8">
          <h1 className=" font-bold flex justify-center md:text-2xl text-xl ">
            {" "}
            Update Your Post{" "}
          </h1>
          <form className=" w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter post Title"
              className=" px-4 py-2 outline-none "
            />

            <input
              type="file"
              className="px-4"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="flex flex-col">
              <div className=" flex items-center space-x-4 md:space-x-8 ">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  placeholder="Enter post Category"
                  className=" px-4 py-2 outline-none "
                />
                <div
                  onClick={addCategory}
                  className=" bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                >
                  Add
                </div>
              </div>
              <div className="flex px-4 mt-3">
                {cats?.map((c, i) => (
                  <div
                    key={i}
                    className=" flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md  "
                  >
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-black rounded-full cursor-pointer text-sm "
                    >
                      {" "}
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
