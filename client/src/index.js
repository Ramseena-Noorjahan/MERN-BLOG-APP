import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home"
import PostDetails from "./pages/PostDetails";
import Register from "./pages/Register"
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout"
import AuthorPosts from "./pages/AuthorsPosts"
import Dashbord from "./pages/Dashbord"
import CategoryPosts from "./pages/CategoryPosts";
import "./index.css"
import DeletePost from "./pages/DeletePost"
const router = createBrowserRouter([
  {
    path: "/",
    element: <userProvider><Layout/></userProvider>    ,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element:<Home/>},
      {path:"posts/:id",element:<PostDetails/>},
      {path:"register",element:<Register/>},
      
      {path:"login",element:<Login/>},
      {path:"profile/:id",element:<UserProfile/>},
      {path:"authors",element:<Authors/>},
      {path:"create",element:<CreatePost/>},
      {path:"posts/category/:category",element:<CategoryPosts/>},
      {path:"posts/users/:id",element:<AuthorPosts/>},
      {path:"myposts/:id",element:<Dashbord/>},
      {path:"posts/:id/edit",element:<EditPost/>},
      {path:"posts/:id/delete",element:<DeletePost/>},
      {path:"logout",element:<Logout/>},
      {path:"",element:<ErrorPage/>}

     
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
