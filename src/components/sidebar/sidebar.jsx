import "./sidebar.css";

import { Link, useLocation } from "react-router-dom";

import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

import {useState, useEffect} from 'react';
import {getAllUsersCall} from '../../apiCalls/apiCalls.js';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import {useSidebar} from '../../context/sidebarContext.js';


export default function SideBar() {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext);
  const {isSidebarOpen, setIsSidebarOpen}=useSidebar();
  const [users, setUsers]=useState([]);
  const location = useLocation();
  const displayUsers = users.map((u) => {

  if (u._id === user._id) {

    return user;

  }

  return u;

});

  const sidebarItems = [
    {
      icon: <RssFeedIcon className="sidebarListItemIcon" />,
      text: "Feed",
      path: "/",
    },
    {
      icon: <ChatIcon className="sidebarListItemIcon" />,
      text: "Chats",
      path: "/chats",
    },
    {
      icon: <PlayCircleIcon className="sidebarListItemIcon" />,
      text: "Videos",
      path: "/videos",
    },
    {
      icon: <GroupIcon className="sidebarListItemIcon" />,
      text: "Groups",
      path: "/groups",
    },
    {
      icon: <BookmarkIcon className="sidebarListItemIcon" />,
      text: "Bookmarks",
      path: "/bookmarks",
    },
    {
      icon: <HelpOutlineOutlinedIcon className="sidebarListItemIcon" />,
      text: "Questions",
      path: "/questions",
    },
    {
      icon: <WorkOutlineOutlinedIcon className="sidebarListItemIcon" />,
      text: "Jobs",
      path: "/jobs",
    },
    {
      icon: <EventIcon className="sidebarListItemIcon" />,
      text: "Events",
      path: "/events",
    },
    {
      icon: <SchoolIcon className="sidebarListItemIcon" />,
      text: "Courses",
      path: "/courses",
    },
  ];

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data =await getAllUsersCall(); 
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchUsers();
}, []);

  return (
      <div
      className={
        isSidebarOpen
          ? "sidebar mobileOpen"
          : "sidebar"
      }
    >    

      <div className="sidebarWrapper">
        <ul className="sidebarList">

          {sidebarItems.map((item) => (

            <Link
              to={item.path}
              className="sidebarLink"
              key={item.text} onClick={()=>setIsSidebarOpen(false)}
            >

              <li
                className={
                  location.pathname === item.path
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >

                {item.icon}

                <span className="sidebarListItemText">
                  {item.text}
                </span>

              </li>

            </Link>

          ))}

        </ul>

        <button className="sidebarButton">
          Show More
        </button>

        <hr className="sidebarHr" />
        <h3>People</h3>
        <ul className="sidebarFriendList">
        {
        displayUsers.map((u) => (
    <Link to={`/profile/${u.username}`} key={u._id} className="sidebarUserLink" onClick={()=>setIsSidebarOpen(false)}
    >
    <li key={u._id} className="sidebarFriendItem">

      <img
        src={u.profilePic ? PF+u.profilePic : "/assets/person/noAvatar.jpeg"}
        alt=""
        className="sidebarFriendImg"
      />

      <span className="sidebarFriendName">
        {u.username}
      </span>

    </li>
  </Link>
  ))}
        

        </ul>

      </div>

    </div>
  );
}