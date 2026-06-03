
import "./topbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../context/authActions";
import {Link} from 'react-router-dom';


export default function Topbar() {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  const navigate=useNavigate();

  console.log(user);
  const handleLogout = () => {
    dispatch(Logout());
    navigate('/login');
  };

  return (

    <div className="topbarContainer">

      {/* Left Section */}
      <div className="topbarLeft">

        <span className="logo">
          SocialSphere
        </span>

      </div>

      {/* Center Section */}
      <div className="topbarCenter">

        <div className="searchBar">

          <input
            type="text"
            placeholder="Search friends, posts..."
            className="searchInput"
          />

        </div>

      </div>

      {/* Right Section */}
      <div className="topbarRight">

        <div className="topbarLinks">
          <Link className="topbarLink link" to='/home'>
            Homepage
        </Link>

          <Link to={`/profile/${user?.username}`} className="topbarLink link">
          <span className="topbarLink">
            Profile
          </span>
          </Link>
        </div>

        <div className="topbarIcons">

          <div className="topbarIconItem">
            <span>🔔</span>
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <span>💬</span>
            <span className="topbarIconBadge">5</span>
          </div>

        </div>

        <div className="topbarProfile">
          <Link to={`/profile/${user?.username}`}>
            <img
            src={user?.profilePic ? PF + user.profilePic : '/assets/person/noAvatar.jpeg'}
            alt="profile"
            className="topbarImg"
            />
          </Link>
          <button
            className="logoutBtn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}