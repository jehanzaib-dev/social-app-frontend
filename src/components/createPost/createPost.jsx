import "./createPost.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { CreatePostCall, uploadImageCall } from "../../apiCalls/apiCalls.js";


export default function CreatePost({postCreated}) {

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  // Current logged-in user
  const { user } = useContext(AuthContext);

  // Controlled textarea state
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  // Optional loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [FrontendError, setFrontendError]=useState(null);
  const [backendError, setBackendError]=useState(null);


  const handleShare = async (e) => {

  e.preventDefault();

  setFrontendError(null);
  setBackendError(null);

  if (!desc.trim() && !file) {
    setFrontendError(
      "Post cannot be empty"
    );
    return;
  }

  try {

    setIsSubmitting(true);

    let imageName = "";

    // IMAGE UPLOAD
    if (file) {

      const data =
        new FormData();

      data.append("file", file);

      const uploadRes =
        await uploadImageCall(data);

      imageName =
        uploadRes.filename;
    }

    // CREATE POST OBJECT
    const newPost = {

      userId: user._id,

      desc: desc,

      img: imageName,

    };

    // CREATE POST
    await CreatePostCall(newPost);

    // RESET STATES
    setDesc("");

    setFile(null);

    // OPTIONAL REFRESH
    postCreated();

    console.log(
      "Post created successfully"
    );

  } catch (err) {

    console.log(err);

    const errorMessage =
      err.response?.data?.message ||
      "Server error";

    setBackendError(errorMessage);

  } finally {

    setIsSubmitting(false);

  }
};

  
  return (
    <div className="createPostCard">
    <form
      className="createPostForm"
      onSubmit={handleShare}
    >
      <div className="topSection">

        <img
          src={user.profilePic ? PF+user.profilePic : '/assets/person/noAvatar.jpeg'}
          alt="profile"
          className="profilePic"
        />

        <textarea
          placeholder={`What's on your mind ${user?.username}?`}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="postInput"
        />

      </div>
      <hr className="createPostDivider"/>

      {/* Bottom Section */}
      <div className="bottomSection">

        <div className="optionsCntnr">

          <input type="file" onChange={(e) =>setFile(e.target.files[0])} className='postOption chooseFile'/>
          <span className="postOption">Tag</span>
          <span className="postOption">Location</span>
          <span className="postOption">Feeling</span>

        </div>

        <div className="btnCntnr">

          <button
            type="submit"
            className="shareButton"
            disabled={isSubmitting || (!desc.trim() && !file)}
          >
            {isSubmitting ? "Sharing..." : "Share"}
          </button>

        </div>

      </div>
      <div className="errorText">
		{
			FrontendError ? <p>{FrontendError}</p>: backendError && <p>{backendError}</p>
		}
  </div>
    </form>
  </div>
  );
}