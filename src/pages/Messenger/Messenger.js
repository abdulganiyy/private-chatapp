import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import "./Messenger.css";

import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import OnlineChat from "../../components/OnclineChat/OnlineChat";

import { io } from "socket.io-client";

const Messenger = () => {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState();
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewMessage] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnllineUsers] = useState([]);

  const navigate = useNavigate();
  let socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.emit("addUser", user._id);
  }, []);

  useEffect(() => {
    socket.current.on("getUsers", (users) => {
      console.log(users);
      setOnllineUsers(users);
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
    }
  });

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/conversations/${user._id}`
        );

        const { conversations } = response.data;

        console.log(conversations);
        setConversations(conversations);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      console.log(currentChat);
      try {
        const response = await axios.get(
          `http://localhost:8000/messages/${currentChat._id}`
        );

        const { messages } = response.data;

        console.log(messages);
        setMessages([...messages]);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  const onChangeText = (e) => {
    setNewMessage(e.target.value);
  };

  const onSubmitText = async (e) => {
    const message = {
      conversationId: currentChat._id,
      senderId: user._id,
      text: newmessage,
    };

    try {
      await axios.post(
        `http://localhost:8000/conversations/${currentChat._id}`,
        message
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messenger">
      <div className="chatmenu">
        <div>
          <input type="text" />
        </div>
        {conversations &&
          conversations.map((c, index) => {
            return (
              <Conversation
                key={index}
                conversation={c}
                currentUserId={user._id}
                setCurrentChat={setCurrentChat}
              />
            );
          })}
      </div>
      <div className="chatbox">
        {currentChat ? (
          <>
            <div className="chatboxTop">
              {messages.map((m, index) => (
                <Message
                  key={index}
                  message={m}
                  own={m.senderId === user._id}
                />
              ))}
            </div>
            <div className="chatboxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
              <button className="chatMessageButton">Send</button>
            </div>{" "}
          </>
        ) : (
          <span>Open a conversation to chat</span>
        )}
      </div>
      <div className="chatonline">
        <OnlineChat onlineUsers={onlineUsers} user={user} />
      </div>
    </div>
  );
};

export default Messenger;
