import React, { useEffect, useState } from "react";
import "./Chat.css";
import DProfile from "../../../public/icons/profile-icon.png";
import searchIcon from "../../../public/icons/search-icon.png";
import chatGraphic from "../../../public/images/notSelectedGraphic.png";
import attachIcon from "../../../public/icons/attach.png";
import sentIcon from "../../../public/icons/sent.png";
import menuIcon from "../../../public/icons/menu-icon.png";
import data from "../../../data/contacts.json";

const Chat = () => {
  const [isOption, setIsOption] = useState(false);
  const [contacts, setContacts] = useState(data.contacts);
  const [filteredContacts, setFilteredContacts] = useState(data.contacts);
  const [searchKey, setSearchKey] = useState("");
  const [selectedContact, setSelectedContact] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    let filteredData = contacts.filter((item) => {
      return item.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    setFilteredContacts(filteredData);
  }, [searchKey]);

  const closeChat = () => {
    setIsOption(false)
    setSelectedContact()
  }

  return (
    <>
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
          <div className="contact-list">
            {filteredContacts &&
              filteredContacts.map((contact, index) => (
                <div
                  className="singleContact"
                  onClick={() => setSelectedContact(contact)}
                >
                  <img
                    src={
                      contact.profilePic === null
                        ? DProfile
                        : contact.profilePic
                    }
                    alt={contact.name}
                    width={45}
                  />
                  {contact.name}
                </div>
              ))}
          </div>
        </div>
        <div className="chat-box">
          {selectedContact ? (
            <div className="main-chat-box">
              <div className="chat-header">
                <div className="chat-header-profile">
                  <img
                    src={
                      selectedContact.profilePic === null
                        ? DProfile
                        : selectedContact.profilePic
                    }
                    alt={selectedContact.name}
                    width={40}
                  />
                  {selectedContact.name}
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

              {isOption ? <div className="chat-header-menu">
                <p onClick={closeChat} >Close Chat</p>
                <p>Item 1</p>
                <p>Item 2</p>
              </div> : ""}

              <div className="chat-list-box"></div>
              <div className="chat-input">
                <label className="file-input">
                  <img src={attachIcon} alt="Attach" width={30} />
                  <input type="file" />
                </label>
                <div className="text-input">
                  <input
                    type="text"
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="chat-sent">
                  {message ? <img src={sentIcon} alt="send" width={30} /> : ""}
                </div>
              </div>
            </div>
          ) : (
            <img src={chatGraphic} alt="chat" width={"35%"} />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
