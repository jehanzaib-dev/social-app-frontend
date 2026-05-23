import "./rightBar.css";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { followUserCall, unfollowUserCall } from "../../apiCalls/apiCalls.js";
import { Follow, UnFollow } from "../../context/authActions.js";

export default function RightBar({user}) {
  const location = useLocation();

  const isProfilePage = location.pathname.includes("/profile");
  const [isFollowed, setIsFollowed]=useState(false);
		const {user:currentUser, dispatch}=useContext(AuthContext);
  const [followersCount, setFollowersCount] = useState(
  user?.followers?.length || 0
);
 const handleFollow = async () => {
  try {

    if (isFollowed) {

      await unfollowUserCall(
        user._id,
        currentUser._id
      );

      dispatch(UnFollow(user._id));
      setFollowersCount((prev)=>prev-1);

    } else {

      await followUserCall(
        user._id,
        currentUser._id
      );
      dispatch(Follow(user._id));
      setFollowersCount((prev)=>prev+1);
    }

    setIsFollowed(!isFollowed);

  } catch (err) {

    console.log(err);

  }
};   

useEffect(() => {
  setIsFollowed(
    currentUser.following.includes(user?._id)
  );
}, [currentUser, user]);

useEffect(() => {
  setFollowersCount(user?.followers?.length || 0);
}, [user]);

/* PROFILE RIGHTBAR */

const ProfileRightBar = ({ user }) => {

  return (
    <>
      {user?._id !== currentUser._id && (
				<button className="rightbarFollowButton" onClick={handleFollow}>
					{isFollowed ? "unFollow":"Follow"} {isFollowed ? <RemoveIcon/>:<AddIcon/>}
					</button>
			)}
      <h4 className="rightBarTitle">
        User Information
      </h4>

      <div className="rightBarDataCntnr">
        <span className="rightBarDataKey">
          City:
        </span>

        <span className="rightBarDataValue">
          {user?.city || "-"}
        </span>
      </div>

      <div className="rightBarDataCntnr">
        <span className="rightBarDataKey">
          From:
        </span>

        <span className="rightBarDataValue">
          {user?.from || "-"}
        </span>
      </div>

      <div className="rightBarDataCntnr">
        <span className="rightBarDataKey">
          Relationship:
        </span>

        <span className="rightBarDataValue">
          {
            user?.relationship === 1
              ? "Single"
              : user?.relationship === 2
              ? "Married"
              : "-"
          }
        </span>
      </div>

      <h4 className="userFriendsHeading">
        User Friends
      </h4>

      <div className="followInfoContainer">

  <div className="followInfoItem">
    <span className="followInfoCount">
      {followersCount}
    </span>

    <span className="followInfoText">
      Followers
    </span>
  </div>

  <div className="followInfoItem">
    <span className="followInfoCount">
      {user?.following?.length}
    </span>

    <span className="followInfoText">
      Following
    </span>
  </div>

</div>

    </>
  );
};

/* HOME RIGHTBAR */

const HomeRightBar = () => {

  return (
    <>

      <div className="birthdayContainer">

        <img
          src="/assets/gift.png"
          alt=""
          className="birthdayImg"
        />

        <span className="birthdayReminder">
          <b>Jacky Short</b> and <b>3 others</b> have birthdays today.
        </span>

      </div>

      <img
        src="/assets/ad.png"
        alt=""
        className="rightbarAd"
      />

      <h4 className="onlineTitle">
        Online Friends
      </h4>

      <ul className="onlineFriendsList">

        {/* ONLINE USERS LATER */}

      </ul>

    </>
  );
};
return (
    <div className="rightBar">

      <div className="rightbarWrapper">

        {isProfilePage
          ? <ProfileRightBar user={user} />
          : <HomeRightBar />
        }

      </div>

    </div>
  );
}