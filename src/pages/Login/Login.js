import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../../slices/auth";

import "./Login.css";

const Register = () => {
  const { loading, errorMessage, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(data));
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h2>Private Chat App</h2>
        {errorMessage ? <span>{errorMessage}</span> : null}
        {user ? <Navigate to="/messenger" /> : null}

        <form className="form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={data.username}
              placeholder="Name"
              className="form-input"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="password"
              value={data.password}
              placeholder="Password"
              className="form-input"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="form-btn" type="submit" onClick={onSubmit}>
              {loading ? "loading..." : "Submit"}
            </button>
          </div>
          <div className="form-group">
            Not registered yet?{" "}
            <span>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
