import { useContext, useState, useEffect } from "react";
import "./postCard.css";
import {format} from 'timeago.js';
import {AuthContext} from '../../context/authContext.js';
import { LikePostCall, DeletePostCall, EditPostCall, addCommentCall, getOneUserByIdCall } from "../../apiCalls/apiCalls.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";


export default function PostCard({post, setPosts}) {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext);
  const [postCreator, setPostCreator]=useState(null);
  const [showMenu, setShowMenu]=useState(false);
  const [like, setLike]=useState(post.likes.length);
  const [isLiked, setIsLiked]=useState(post.likes.includes(user._id));
  const [liking, setLiking]=useState(false);
  const [backendError, setBackendError]=useState(null);
  const isOwner = post.userId === user._id;
  const [editMode, setEditMode] = useState(false);
  const [commentText, setCommentText]=useState('');
  const [editedDesc, setEditedDesc] = useState(post.desc);

const [isUpdating, setIsUpdating] = useState(false);
  const displayUser=post.userId === user._id ? user : postCreator;

  const handleLike = async () => {
    if(liking) return;
    setBackendError(null);
  try {
    setLiking(true);
    await LikePostCall(post._id, user._id);

    setLike(isLiked ? like - 1 : like + 1);

    setIsLiked(!isLiked);

  } catch (err) {
    console.log(err);
    const errorMessage=err.response?.data?.message || "can't connect to server";
    setBackendError(errorMessage);
  }
  finally{
    setLiking(false);
  }
};
const handleDelete = async () => {

  try {

    await DeletePostCall(post._id, user._id);

    setPosts((prevPosts) =>
      prevPosts.filter(
        (p) => p._id !== post._id
      )
    );

  } catch (err) {
    console.log(err);
    const errorMessage=err.response?.data?.message || "can't connect to server";
    setBackendError(errorMessage);
  }
};
const handleEdit = async () => {
  setBackendError(false);
  if (!editedDesc.trim()) return;

  try {

    setIsUpdating(true);

    await EditPostCall(
      post._id,
      {
        userId: user._id,
        desc: editedDesc
      }
    );

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p._id === post._id
          ? { ...p, desc: editedDesc }
          : p
      )
    );

    setEditMode(false);

  } catch (err) {

    console.log(err);

    const errorMessage =
      err.response?.data?.message
      || "Can't connect to server";

    setBackendError(errorMessage);

  } finally {

    setIsUpdating(false);

  }
};

  const handleComment = async () => {

  if (!commentText.trim()) return;

  try {

    const updatedPost = await addCommentCall(
      post._id,
      {
        userId: user._id,
        username: user.username,
        text: commentText,
      }
    );

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p._id === post._id ? updatedPost : p
      )
    );

    setCommentText("");

  } catch (err) {

    console.log(err);

  }
};

 useEffect(() => {

  const fetchUser = async () => {

    try {

      const data =
        await getOneUserByIdCall(
          post.userId
        );

      setPostCreator(data);

    } catch (err) {

      console.log(err);

    }
  };

  fetchUser();

}, [post.userId]); 
return (
<div className="postCard">
  <div className="postTop">
    <div className="postTopLeft">
      <Link to={`/profile/${post.user?.username}`}>
      <img src={ displayUser?.profilePic ? PF + displayUser.profilePic : "/assets/person/noAvatar.jpeg"} alt="profile" className="postProfileImg"/>
      </Link>
      <div className="postUserInfo">
      <Link to={`/profile/${post.user?.username}`} className="profileLink">
        <span className="postUsername">
          {post.user?.username}
        </span>
      </Link>

      <span className="postDate">
      {format(post.createdAt)}
      </span>
      </div>
    </div>
    <div className="postTopRight">
      <MoreVertIcon
      className="moreIcon"
      onClick={() => {
      if (isOwner) {
        setShowMenu(!showMenu);
        }
      }}
      />
      {
      showMenu && isOwner && (
      <div className="postMenu">
      <button className="menuItem"
        onClick={() =>{ setEditMode(true);
        setShowMenu(false);
        }
        }
      >
        Edit
      </button>
      <button className="menuItem deleteItem"
      onClick={handleDelete}>
      Delete
      </button>
      </div>
      )
      }
    </div>
  </div>
  <div className="postCenter">
    {
   editMode ? (
    <div className="editSection">
      <textarea
        className="editInput"
        value={editedDesc}
        onChange={(e) => setEditedDesc(e.target.value)}
      />
      <div className="editActions">
        <button
          className="saveBtn"
          onClick={handleEdit}
          disabled={isUpdating}
        >
          {
            isUpdating
              ? "Saving..."
              : "Save"
          }
        </button>
        <button
          className="cancelBtn"
          onClick={() => {
            setEditMode(false);
            setEditedDesc(post.desc);
          }}
        >
          Cancel
        </button>

      </div>

    </div>

  ) : (

    <p className="postText">
      {post.desc}
    </p>

  )
}
        {
          post.img && (
          <img src={PF + post.img}
           alt="postImage"
          className="postImg"
        />
          )
        }
  </div>
  <div className="postBottom">
    <div className="postBottomLeft">
      <img className="likeIcon" src="/assets/like.png" alt="" onClick={handleLike}/>
      <span className="postLikeCount">
      {
      liking ? "updating...":
        <>
        <strong>{like}</strong> people liked it
        </>
      }
      </span>
    </div>
    <div className="postBottomRight">
      <div className="commentSection">

  <input
    type="text"
    placeholder="Write a comment..."
    value={commentText}
    onChange={(e) =>
      setCommentText(e.target.value)
    }
    className="commentInput"
  />
  <button
    onClick={handleComment}
    className="commentButton" disabled={!commentText.trim()}
  >
    Comment
  </button>
    

</div>

    </div>


  </div>
  {post.comments?.length>0 && (
  <div className="commentsContainer">

  {post.comments?.map((comment, index) => (

    <div
      className="commentItem"
      key={index}
    >
      <div className="commentData">
        <span className="commentUsername">
          {comment.username}
        </span>
        <span className="commentText">
          {comment.text}
        </span>
      </div>
      <span className="commentTime">
      {format(comment.createdAt)}
    </span>

    </div>

  ))}

</div>)
}
  <div className="errorText">
        {
          backendError && <p>{backendError}</p>
        }
  </div>
</div>  
);
}