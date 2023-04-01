import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import "./Chat.css";
import DProfile from "../../../public/icons/profile-icon.png";
import searchIcon from "../../../public/icons/search-icon.png";
import chatGraphic from "../../../public/icons/chat-icon-logo.png";
import attachIcon from "../../../public/icons/attach.png";
import sendIcon from "../../../public/icons/sent.png";
import menuIcon from "../../../public/icons/menu-icon.png";
import sentIcon from "../../../public/icons/sent-msg.png";
import recievedIcon from "../../../public/icons/recieved-msg.png";
import addIcon from "../../../public/icons/add-icon.png";
import emailIcon from "../../../public/icons/email-icon.png";
import Spinner from "../../../public/icons/spinner.gif";
import msgData from "../../../data/messages.json";
import { storage } from "../../../actions/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { io } from "socket.io-client";
import Header from "../Header/Header";

const socket = io("https://achat-ra84.onrender.com");

const ChatM = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOption, setIsOption] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsStatus, setContactsStatus] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [messagesStatus, setMessagesStatus] = useState(false);
  const [message, setMessage] = useState();
  const [addContact, setAddContact] = useState(false);
  const [findEmail, setFindEmail] = useState(null);
  const [addContactButton, setAddContactButton] = useState("check");
  const [foundContact, setFoundContact] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      socket.emit("joinRoom", [selectedContact._id, user._id]);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (message) => {
        setAllMessages((allMessages) => [...allMessages, message]);
      });
    }
  }, [socket]);

  const getAllContact = async () => {
    setContactsStatus(true);
    const contactData = await axios.get(
      `https://achat-ra84.onrender.com/api/v1/authuser/get/saved-contacts/${user._id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    setContactsStatus(false);
    setContacts(contactData.data.savedContacts);
    setFilteredContacts(contactData.data.savedContacts);
  };

  useEffect(() => {
    getAllContact();
  }, []);

  const uploadMedia = async (file) => {
    const type = file.type.split("/")[0];

    const imageRef = ref(storage, `message_files/${v4() + file.name}`);
    await uploadBytes(imageRef, file);

    const res = await getDownloadURL(imageRef);

    sendMessage();

    const tempMsg = {
      senderId: user._id,
      recipientId: selectedContact._id,
      type: type,
      message: res,
      time: null,
    };

    setMessage(tempMsg);
    setAllMessages([...allMessages, tempMsg]);
  };

  useEffect(() => {
    let filteredData = contacts.filter((item) => {
      return item.username.toLowerCase().includes(searchKey.toLowerCase());
    });
    setFilteredContacts(filteredData);
  }, [searchKey]);

  const getSelectedChatMessages = async (contact) => {
    setMessagesStatus(true);
    setMessage("");
    setSelectedContact(contact);
    let tempMessages = [];
    const data = await axios.get(
      `https://achat-ra84.onrender.com/api/v1/message/get/${user._id}/${contact._id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    setMessagesStatus(false);
    setAllMessages(data.data);
  };

  const closeChat = () => {
    setIsOption(false);
    setSelectedContact();
    setAllMessages([]);
  };

  const sendMessage = async (type) => {
    const tempMsg = {
      senderId: user._id,
      recipientId: selectedContact._id,
      type: type,
      message: message,
    };

    setAllMessages([...allMessages, tempMsg]);
    setMessage("");
    socket.emit("send-msg", tempMsg);

    await axios.post(
      "https://achat-ra84.onrender.com/api/v1/message/send",
      tempMsg,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const findContact = async () => {
    const foundContact = await axios.get(
      `https://achat-ra84.onrender.com/api/v1/authuser/get/user-by-email/${findEmail}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (foundContact.data.user != null) {
      setFoundContact(foundContact.data.user);
      setAddContactButton("add");
    } else {
    }
  };

  const handleAddContactButton = () => {
    setAddContact(false);
    setFoundContact(null);
    setAddContactButton("check");
  };

  const handleAddContact = async () => {
    await axios.put(
      `https://achat-ra84.onrender.com/api/v1/authuser/add/contact/${user._id}`,
      { contactId: foundContact._id },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    setContacts((contacts) => [...contacts, foundContact]);
    setAddContact(false);
    setFoundContact(null);
    setAddContactButton("check");
  };

  return (
    <>
      <Header />
      <div className="main-chat">
        <div className="contacts">
          <div className="contact-search">
            <div className="search">
              <img src={searchIcon} alt="Search" width={20} />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          {contactsStatus ? (
            <img
              src={Spinner}
              alt="spinner"
              width={70}
              style={{ margin: "0 auto" }}
            />
          ) : (
            <div className="contact-list">
              {filteredContacts &&
                filteredContacts.map((contact, index) => (
                  <div
                    className="singleContact"
                    value={contact}
                    onClick={() => getSelectedChatMessages(contact)}
                  >
                    <img
                      src={contact.profilePic ? contact.profilePic : DProfile}
                      alt={contact.username}
                    />
                    {contact.username}
                  </div>
                ))}
            </div>
          )}

          <span className="add-contact" onClick={() => setAddContact(true)}>
            <img src={addIcon} alt="add" width={40} />
          </span>
        </div>
        <div className="chat-box">
          {selectedContact ? (
            <div className="main-chat-box">
              <div className="chat-header">
                <div className="chat-header-profile">
                  <img
                    src={
                      selectedContact.profilePic
                        ? selectedContact.profilePic
                        : DProfile
                    }
                    alt={selectedContact.username}
                  />
                  {selectedContact.username}
                </div>
                <div className="chat-search-option"></div>

                <div className="chat-header-menu-icon">
                  <img
                    src={menuIcon}
                    alt="option"
                    width={30}
                    onClick={() => {
                      isOption ? setIsOption(false) : setIsOption(true);
                    }}
                  />
                </div>
              </div>

              {isOption ? (
                <div className="chat-header-menu">
                  <p onClick={closeChat}>Close Chat</p>
                  <p>Item 1</p>
                  <p>Item 2</p>
                </div>
              ) : (
                ""
              )}

              {messagesStatus ? (
                <div className="spinner-box" >
                  <img
                  src={Spinner}
                  alt="spinner"
                  width={70}
                />
                </div>
              ) : (
                <div className="chat-list-box">
                  {allMessages &&
                    allMessages.map((message, index) =>
                      message.senderId === user._id ? (
                        <div key={index} className="sent">
                          <div className="sent-msg">
                            {message.type === "text" ? (
                              <div className="sent-msg-msg">
                                {message.message}
                              </div>
                            ) : message.type === "image" ? (
                              <div className="sent-msg-msg">
                                <img src={message.message} alt="img" />
                              </div>
                            ) : message.type === "video" ? (
                              <div className="sent-msg-msg">
                                <ReactPlayer
                                  className="react-player"
                                  url={message.message}
                                  controls
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <img src={sentIcon} alt="" width={10} />
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="recieved">
                          <div className="recieved-msg">
                            <img src={recievedIcon} alt="" width={10} />
                            {message.type === "text" ? (
                              <div className="recieved-msg-msg">
                                {message.message}
                              </div>
                            ) : message.type === "image" ? (
                              <div className="recieved-msg-msg">
                                <img src={message.message} alt="img" />
                              </div>
                            ) : message.type === "video" ? (
                              <div className="recieved-msg-msg">
                                <ReactPlayer
                                  className="react-player"
                                  url={message.message}
                                  controls
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}

              <div className="chat-input">
                <label className="file-input">
                  <img src={attachIcon} alt="Attach" width={30} />
                  <input
                    type="file"
                    onChange={(e) => uploadMedia(e.target.files[0])}
                  />
                </label>
                <div className="text-input">
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="chat-sent">
                  {message ? (
                    <img
                      src={sendIcon}
                      alt="send"
                      width={30}
                      onClick={() => sendMessage("text")}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="noContactSelected">
              <img src={chatGraphic} alt="chat" width={"35%"} />
            </div>
          )}
        </div>

        {addContact ? (
          <div className="add-dialouge-box">
            {foundContact === null ? (
              <div className="add-contact-email">
                <div className="contact-email">
                  <img src={emailIcon} alt="email" width={30} />
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setFindEmail(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="found-contact">
                <div className="found-contact-details">
                  <img
                    src={
                      foundContact && foundContact.profilePic
                        ? foundContact.profilePic
                        : DProfile
                    }
                    alt="email"
                  />
                  {foundContact.username}
                </div>
              </div>
            )}
            <div className="add-cancel-contact">
              <div className="add-cancel-contact-inner">
                <button onClick={handleAddContactButton}>Cancel</button>
                {addContactButton === "check" ? (
                  <button onClick={findContact}>Check</button>
                ) : (
                  <button onClick={handleAddContact}>Add</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ChatM;
