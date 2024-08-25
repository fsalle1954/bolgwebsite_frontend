import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlogs from "./pages/MyBlogs";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/write",
    element: <CreatePost />,
  },

  {
    path: "/Post/post/:id",
    element: <PostDetails />,
  },

  {
    path: "/edit/:id",
    element: <EditPost />,
  },

  {
    path: "/myblogs/:id",
    element: <MyBlogs />,
  },

  {
    path: "/profile/:id",
    element: <Profile />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
