import React from "react";

import "./Conversation.css";

const Conversation = ({ conversation, currentUserId, setCurrentChat }) => {
  const userId = conversation.members.find(
    (memberId) => memberId !== currentUserId
  );
  console.log(userId);
  return (
    <div className="conversation" onClick={() => setCurrentChat(conversation)}>
      <img
        src="https://images.pexels.com/photos/3371434/pexels-photo-3371434.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        alt="user"
        className="conversationImg"
      />
      <span className="lastMsg">Hello there</span>
    </div>
  );
};

export default Conversation;
