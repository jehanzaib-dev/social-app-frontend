import "./profilePage.css";

import Topbar from "../../components/topbar/topbar.jsx";
import SideBar from "../../components/sidebar/sidebar.jsx";
import Feed from "../../components/feed/feed.jsx";
import RightBar from '../../components/rightBar/rightBar.jsx';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {getOneUserCall, uploadImageCall, updateUserCall} from '../../apiCalls/apiCalls.js';

export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const { user:currentUser, dispatch } = useContext(AuthContext);
const [profileUser, setProfileUser] = useState(null);
  const { username } = useParams();
const isOwnProfile=currentUser._id === profileUser?._id;

 const handleImageUpload = async (file, type) => {

  if (!file) return;

  try {

    const data = new FormData();

    data.append("file", file);

    const uploadRes =
      await uploadImageCall(data);

    const updatedUser =
      await updateUserCall(
        currentUser._id,
        {
          [type]: uploadRes.filename,
        }
      );

    dispatch({
      type: "UPDATE_USER",
      payload: updatedUser,
    });

    setProfileUser(updatedUser);

  } catch (err) {

    console.log(err);

  }
}; 



useEffect(() => {
  const fetchUser = async () => {
    try {
      const data =await getOneUserCall(username); 
      setProfileUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchUser();
}, [username]);
  return (

    <>
      <Topbar />

      <div className="profile">

        <SideBar />

  <div className="profileRight">
   <div className="profileRightTop">
    <div className="profileCover">
     <input
  type="file"
  id="profileInput"
  hidden
  onChange={(e) => {

    console.log("PROFILE INPUT WORKING");

    handleImageUpload(
      e.target.files[0],
      "profilePic"
    );

  }}
/>
 <input
  type="file"
  id="coverInput"
  hidden
  onChange={(e) => {

    console.log("COVER INPUT WORKING");

    handleImageUpload(
      e.target.files[0],
      "coverPic"
    );

  }}
/>
       <img className="profileCoverImg"src={profileUser?.coverPic ? PF+profileUser.coverPic : '/assets/person/noCover.jpeg'}alt=""/>
       {isOwnProfile && (
        <label htmlFor="coverInput" className="editCoverBtn">
        Change Cover
       </label>)
       }
       

              <img
                className="profileUserImg"
                src={profileUser?.profilePic ? PF+profileUser.profilePic:'/assets/person/noAvatar.jpeg'}
                alt=""
              />
            {
              isOwnProfile && (
              <label htmlFor="profileInput" className="editProfileBtn">
    Change Photo
  </label>
              )
            }
              

            </div>
            <div className="profileInfo">

              <h4 className="profileInfoName">
                {username}
              </h4>

              <span className="profileInfoDesc">
                Hello my friends!
              </span>

            </div>

          </div>

          <div className="profileRightBottom">

            <Feed username={username} />

            <RightBar user={profileUser}/>

          </div>

        </div>

      </div>
    </>
  );
}