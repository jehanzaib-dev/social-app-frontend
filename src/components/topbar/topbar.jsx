
import "./topbar.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../context/authActions";
import {Link} from 'react-router-dom';
import {getAllUsersCall} from '../../apiCalls/apiCalls.js';

export default function Topbar() {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const navigate=useNavigate();

  const handleSearch = (e) => {
   const value = e.target.value;
   setSearchTerm(value);
   const matches = allUsers.filter((user) =>
      user.username
         .toLowerCase()
         .includes(value.toLowerCase())
   );
   setFilteredUsers(matches);
};


  const handleLogout = () => {
    dispatch(Logout());
    navigate('/login');
  };

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data =await getAllUsersCall(); 
      setAllUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchUsers();
}, []);

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
            className="searchInput" value={searchTerm} onChange={handleSearch}
          />
          {
          searchTerm && filteredUsers.length > 0 && (
            <div className="searchResults">
              {
              filteredUsers.map((user) => (
              <div
                  key={user._id}
                  className="searchUser"
                  onClick={() => {

   navigate(`/profile/${user?.username}`);

   setSearchTerm("");

   setFilteredUsers([]);

}}
               >
  <img
            src={user?.profilePic ? PF + user.profilePic : '/assets/person/noAvatar.jpeg'}
            alt="profile"
            className="searchImg"
          />

  <span>
    {user?.username}
  </span>   
               </div>

            ))
         }

      </div>

   )
}

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