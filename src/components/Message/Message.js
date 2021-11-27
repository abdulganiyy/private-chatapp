import React from "react";

import "./Message.css";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messagetop">
        <img
          src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="user"
          className="messageImg"
        />
        <span className="messageText">{message.text}</span>
      </div>
      <div className="messagebottom">2 hours ago</div>
    </div>
  );
};

export default Message;
