import React, { useEffect } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "../pages/Home/Home";

const AuthLayouts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div>
      <div>
        <Link to="">Dashboard</Link>
        <Link to="users">Users</Link>
        <Link to="posts">Posts</Link>
      </div>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="users" element={<div>users</div>} />
        <Route path="posts" element={<div>posts</div>} />
      </Routes>
    </div>
  );
};

export default AuthLayouts;
