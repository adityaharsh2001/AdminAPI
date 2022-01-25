import React, { Component } from "react";
import axios from "axios"
const initialFormData = {
  user_name: "",
  user_password: "",
  user_email: "",
  total_order: "",
  image: null
};


const SignUp = () => {
  const [formData, updateFormData] = React.useState(initialFormData);
  var bodyFormData = new FormData();
  const handleFileInput = (e) => {
    updateFormData({
      ...FormData,
      [e.target.name]: e.target.files[0]
    })

  }
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for ( var key in formData ) {
        bodyFormData.append(key, formData[key]);
    }
    console.log(bodyFormData)
    axios({
        method: "post",
        url: "/api/auth/insert",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then( (response) => {
          console.log(response);
        })
        .catch((err) => {
      
          console.log(err);
        });
    
  };
  return (
    <form>
      <h3>Sign Up</h3>

      <div className="form-group mb-2">
        <label>Name</label>
        <input
          name="user_name"
          type="text"
          className="form-control"
          placeholder="User Name"
          onChange={handleChange}
        />
      </div>

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
      <div className="form-group mb-2">
        <label>Total Order</label>
        <input
          type="text"
          className="form-control"
          placeholder="Total Order"
          name="total_order"
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-2">
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleFileInput}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block mb-2"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered <a href="#">sign in?</a>
      </p>
    </form>
  );
};

export default SignUp;
