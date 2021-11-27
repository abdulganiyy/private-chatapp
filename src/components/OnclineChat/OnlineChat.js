import React from "react";

import "./OnlineChat.css";

const OnlineChat = ({ onlineUsers, user }) => {
  console.log(user.followers);
  //   if (user) {
  //     const usersOnlineId = onlineUsers.map((user) => user.senderId);
  //     const friends = user.followers.filter((f) => usersOnlineId.includes(f));
  //     console.log(friends);
  //   }

  return (
    <div className="OnlineChat">
      <div className="OnlineChatImgContainer">
        <img
          src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="user"
          className="OnlineChatImg"
        />
        <div className="OnlineChatBadge"></div>
      </div>
      <div className="OnlineUserName">Alice Derrk</div>
    </div>
  );
};

export default OnlineChat;
