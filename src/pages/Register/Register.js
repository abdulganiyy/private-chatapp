import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="register">
      <div className="wrapper">
        <h2>Private Chat App</h2>
        <form className="form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Name"
              className="form-input"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="Email"
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
            Already registered?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
