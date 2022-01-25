import React, {useState, useEffect} from 'react'
import '../App.css';
import axios from 'axios'

function PostsWithAxios() {
  const [posts, setPosts] = useState( [] );
 
  useEffect(() => {
    const axiosPosts = async () => {
      const response = await axios('/api/user/details');
      setPosts(response.data);
    };
    axiosPosts();
  }, []);

const useaxiosPosts = posts.map((post)=>{
  return <div>
               <div className="avatar">
                    <img
                      src={post.user_image}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
            </div> 
  })

  return (
    <>
      
      <div className="">
          {posts && useaxiosPosts}
      </div>
    </>
  );
}

export default PostsWithAxios;