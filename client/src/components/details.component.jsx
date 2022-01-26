import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import './styles.css'

const PostsWithAxios = () =>{
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const axiosPosts = async () => {
      const response = await axios("/api/user/details");
      setPosts(response.data);
    };
    axiosPosts();
  }, []);

  const useaxiosPosts = posts.map((post) => {
    return (
      <div >
        <div className=" image d-flex flex-column justify-content-center align-items-center">
          {" "}
          <button className="btn-details btn-secondary">
            {" "}
            <img
              src={`${post.user_image}`}
              height="100"
              width="100"
            />
          </button>{" "}
          <span className="name mt-3"><strong>User Name : {post.user_name}</strong></span>{" "}
          <span className="idd"><strong>Email Id: </strong> {post.user_email}</span>
        
            <span className="number">
              <strong>Total Order: </strong>{post.total_order}
            </span>{" "}
            <span className="join">Joined {post.createdAt.split("T")[0] + " " + post.createdAt.split("T")[1].split(".")[0]} </span>
          <div className=" d-flex mt-2">
            {" "}
            <button className="btn1 btn-dark">Edit Profile</button>{" "}
          </div>
       
          <div className=" px-2 rounded mt-4 date ">
            {" "}
            {" "}
          </div>
        </div>
      </div>
    );
  });

  return (
   
      <div >
        <div className="card p-4" style={{display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"}}>{posts && useaxiosPosts}</div>
      </div>
   
  );
}

export default PostsWithAxios;
