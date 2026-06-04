import "./homepage.css";
import Topbar from "../../components/topbar/topbar.jsx";
import SideBar from "../../components/sidebar/sidebar.jsx";
import CreatePost from "../../components/createPost/createPost.jsx";
import Feed from "../../components/feed/feed.jsx";
import RightBar from '../../components/rightBar/rightBar.jsx';
import { useState } from "react";

export const HomePage = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePostCreated = () => {
    setRefreshPosts((prev) => !prev);
  };
  const toggleSidebar = () => {
  setIsSidebarOpen(prev => !prev);
};

  return (
    <div className="homePage">
      <Topbar toggleSidebar={toggleSidebar}/>

      <div className="homeContainer">
        <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

        <div className="homeFeed">
          <CreatePost postCreated={handlePostCreated} />
          <Feed refreshPosts={refreshPosts} />
        </div>
        <RightBar/>
      </div>
    </div>
  );
};