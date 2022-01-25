import React, { Component } from "react";
import axios from "axios";
const initialFormData = {
  user_password: "",
  user_email: "",
};

const Login = () => {
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyFormData = JSON.stringify(formData)
    console.log(bodyFormData);

    axios({
      method: "post",
      url: "http://localhost:5000/auth/login",
      data: bodyFormData,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <h3>Sign In</h3>

      <div className="form-group mb-2">
        <label>Email address</label>
        <input
          name="user_email"
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-2">
        <label>Password</label>
        <input
          name="user_password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      {/* <div className="form-group mb-2">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
            onChange={handleChange}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div> */}

      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
};
export default Login;
