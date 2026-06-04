import "./feed.css";
import { useEffect, useState, useContext } from "react";
import PostCard from "../postCard/postCard.jsx";

import { getUserPostsCall, getTimelinePostsCall } from "../../apiCalls/apiCalls.js";
import { AuthContext } from "../../context/authContext.js";


export default function Feed({username, refreshPosts}) {

  const {user}=useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        setBackendError(null);
        setIsLoading(true);

        const data = username ? await getUserPostsCall(username): await getTimelinePostsCall(user._id);

        setPosts(data);

      } catch (err) {

        console.log(err);

        const errorMessage =
          err.response?.data?.message ||
          "Server not running please check";

        setBackendError(errorMessage);

      } finally {

        setIsLoading(false);
      }
    };

    fetchPosts();

  }, [user,username, refreshPosts]);

  return (
    <div className="feed">

      {
        isLoading && (
          <p className="feedMessage">
            Loading posts...
          </p>
        )
      }

      {
        backendError && (
          <p className="feedMessage errorMessage">
            {backendError}
          </p>
        )
      }

      <div className="postsContainer">
      {
  posts.length === 0 ? (

    <div className="emptyFeed">

      <h2>Welcome to SocialSphere! 🎉</h2>

      <p>
        It looks like your feed is empty.
        Share your first post and start connecting
        with people around the world.
      </p>

    </div>

  ) : (

    posts.map((post) => (
      <PostCard
        key={post._id}
        post={post} setPosts={setPosts}
      />
    ))

  )
}

     </div>

    </div>
  );
}