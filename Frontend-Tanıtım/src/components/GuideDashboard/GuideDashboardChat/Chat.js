import React, { useState } from "react";
import styles from "./GuideDashboardChat.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

// Dummy Data
const groupsData = [
    {
      id: 1,
      name: "Guides",
      members: [
        { id: 1, name: "Samantha William", role: "Guide" },
        { id: 6, name: "Michael Benson", role: "Guide" },
        { id: 12, name: "Max Wright", role: "Guide" },
        { id: 17, name: "Grace Walker", role: "Guide" },
        { id: 19, name: "Mia Wilson", role: "Guide" },
      ],
      lastMessageTime: "12:45 PM",
      lastMessagePreview: "Lorem ipsum dolor sit amet...",
      unreadCount: 2,
    },
];

const groupChatHistory = {
  "Guides": [
    { id: 1, type: "received", sender: "Samantha William", content: "Hey team, the tour for group A went great!", time: "12:30 PM" },
    { id: 2, type: "received", sender: "Michael Benson", content: "That's awesome to hear, Samantha!", time: "12:32 PM" },
    { id: 3, type: "sent", sender: "Nabila A.", content: "Great job, everyone! Keep me updated on upcoming tours.", time: "12:35 PM" },
    { id: 4, type: "received", sender: "Grace Walker", content: "Will do, Nabila. Thanks for the support!", time: "12:40 PM" },
    { id: 5, type: "received", sender: "Mia Wilson", content: "By the way, do we have any updates for next week's schedule?", time: "12:43 PM" },
    { id: 6, type: "received", sender: "Mia Wilson", content: "By the way, do we have any updates for next week's schedule?", time: "12:43 PM" },
    { id: 7, type: "received", sender: "Michael Benson", content: "That's awesome to hear, Samantha!", time: "12:32 PM" },
    { id: 8, type: "received", sender: "Michael Benson", content: "See you guy tomorrow!", time: "12:32 PM" },
    { id: 9, type: "received", sender: "Michael Benson", content: "Goodbye!", time: "12:32 PM" },
  ],
};

const chatsData = [
    {
      id: 1,
      name: "Samantha William",
      role: "Guide",
      lastMessageTime: "12:45 PM",
      lastMessagePreview: "Looking forward to our meeting next week!",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "Tony Soap",
      role: "Advisor",
      lastMessageTime: "12:15 PM",
      lastMessagePreview: "Please review the latest document I sent.",
      unreadCount: 2,
    },
    {
      id: 3,
      name: "Karen Hope",
      role: "Guide",
      lastMessageTime: "12:45 PM",
      lastMessagePreview: "The students were thrilled with the tour!",
      unreadCount: 2,
    },
    {
      id: 4,
      name: "Jordan Nico",
      role: "Advisor",
      lastMessageTime: "01:00 PM",
      lastMessagePreview: "Can you confirm the schedule for Friday?",
      unreadCount: 1,
    },
    {
      id: 5,
      name: "Nadila Adja",
      role: "Trainee",
      lastMessageTime: "11:50 AM",
      lastMessagePreview: "I’ve completed my training module.",
      unreadCount: 0,
    },
    {
      id: 6,
      name: "Harold Zimmer",
      role: "Guide",
      lastMessageTime: "10:10 AM",
      lastMessagePreview: "The itinerary has been finalized.",
      unreadCount: 1,
    },
    {
      id: 7,
      name: "Emily Jacobs",
      role: "Trainee",
      lastMessageTime: "09:30 AM",
      lastMessagePreview: "What’s the next step in the process?",
      unreadCount: 0,
    },
    {
      id: 8,
      name: "James Gordan",
      role: "Advisor",
      lastMessageTime: "1:25 PM",
      lastMessagePreview: "Thank you, Jordan. Appreciate the support.",
      unreadCount: 1,
    },
    {
      id: 9,
      name: "Mathew Adja",
      role: "Trainee",
      lastMessageTime: "12:10 PM",
      lastMessagePreview: "Thank you so much!",
      unreadCount: 0,
    },
    {
      id: 10,
      name: "Harry Zimmer",
      role: "Guide",
      lastMessageTime: "10:40 AM",
      lastMessagePreview: "Will do. Thanks, Nabila.",
      unreadCount: 0,
    },
    {
      id: 11,
      name: "Eren Jacobs",
      role: "Trainee",
      lastMessageTime: "9:50 AM",
      lastMessagePreview: "Got it. Thanks again!",
      unreadCount: 0,
    },
  ];

const messagesData = {
    "Samantha William": [
      { id: 1, type: "received", content: "Hello Nabila!", time: "12:45 PM" },
      { id: 2, type: "received", content: "Can I highlight an issue regarding tour allocation?", time: "12:45 PM" },
      { id: 3, type: "sent", content: "Hello Samantha!", time: "12:45 PM" },
      { id: 4, type: "sent", content: "Sure, go ahead.", time: "12:45 PM" },
      { id: 5, type: "received", content: "The tour for group A overlaps with another schedule.", time: "12:50 PM" },
      { id: 6, type: "sent", content: "Let me look into it and adjust accordingly.", time: "12:55 PM" },
      { id: 7, type: "received", content: "Thank you! Please let me know once it’s finalized.", time: "1:00 PM" },
      { id: 8, type: "sent", content: "Will do, Samantha.", time: "1:05 PM" },
    ],
    "Tony Soap": [
      { id: 1, type: "received", content: "Please review the latest document I sent.", time: "12:15 PM" },
      { id: 2, type: "sent", content: "I’ve received it, thank you!", time: "12:20 PM" },
      { id: 3, type: "sent", content: "Are there any specific changes you need from my side?", time: "12:22 PM" },
      { id: 4, type: "received", content: "Yes, check section 3. The details are outdated.", time: "12:25 PM" },
      { id: 5, type: "sent", content: "Got it. I’ll update and resend by EOD.", time: "12:30 PM" },
      { id: 6, type: "received", content: "Thanks, Nabila. Appreciate it!", time: "12:35 PM" },
    ],
    "Karen Hope": [
      { id: 1, type: "received", content: "The students were thrilled with the tour!", time: "12:45 PM" },
      { id: 2, type: "sent", content: "That’s great to hear, Karen!", time: "12:50 PM" },
      { id: 3, type: "sent", content: "Do you need any updates for the upcoming session?", time: "12:52 PM" },
      { id: 4, type: "received", content: "Not right now, but I’ll keep you posted.", time: "12:55 PM" },
      { id: 5, type: "received", content: "Also, great job with the organization lately!", time: "12:57 PM" },
      { id: 6, type: "sent", content: "Thank you, Karen. Your feedback means a lot.", time: "1:00 PM" },
    ],
    "Jordan Nico": [
      { id: 1, type: "received", content: "Can you confirm the schedule for Friday?", time: "01:00 PM" },
      { id: 2, type: "sent", content: "Yes, Friday’s schedule is confirmed.", time: "01:10 PM" },
      { id: 3, type: "received", content: "Great! Let me know if there are any last-minute changes.", time: "01:12 PM" },
      { id: 4, type: "sent", content: "Absolutely, I’ll notify you if anything changes.", time: "01:15 PM" },
      { id: 5, type: "received", content: "Thanks! By the way, good job with the itinerary.", time: "01:20 PM" },
      { id: 6, type: "sent", content: "Thank you, Jordan. Appreciate the support.", time: "01:25 PM" },
    ],
    "Nadila Adja": [
      { id: 1, type: "received", content: "I’ve completed my training module.", time: "11:50 AM" },
      { id: 2, type: "sent", content: "Well done, Nadila!", time: "11:55 AM" },
      { id: 3, type: "sent", content: "Do you need any assistance with the next steps?", time: "11:57 AM" },
      { id: 4, type: "received", content: "I’d appreciate guidance on submitting the final report.", time: "12:00 PM" },
      { id: 5, type: "sent", content: "Sure. I’ll send you a template shortly.", time: "12:05 PM" },
      { id: 6, type: "received", content: "Thank you so much!", time: "12:10 PM" },
    ],
    "Harold Zimmer": [
      { id: 1, type: "received", content: "The itinerary has been finalized.", time: "10:10 AM" },
      { id: 2, type: "sent", content: "Great! Thanks for updating me.", time: "10:20 AM" },
      { id: 3, type: "sent", content: "Did you share this with the guides yet?", time: "10:25 AM" },
      { id: 4, type: "received", content: "Not yet. I was waiting for your confirmation.", time: "10:30 AM" },
      { id: 5, type: "sent", content: "Please go ahead. Let me know once it’s done.", time: "10:35 AM" },
      { id: 6, type: "received", content: "Will do. Thanks, Nabila.", time: "10:40 AM" },
    ],
    "Emily Jacobs": [
      { id: 1, type: "received", content: "What’s the next step in the process?", time: "09:30 AM" },
      { id: 2, type: "sent", content: "I’ll share the next steps shortly.", time: "09:35 AM" },
      { id: 3, type: "received", content: "Thanks! I’ll keep an eye out for your email.", time: "09:40 AM" },
      { id: 4, type: "sent", content: "Make sure to check the guidelines I shared earlier.", time: "09:45 AM" },
      { id: 5, type: "received", content: "Got it. Thanks again!", time: "09:50 AM" },
    ],
    "James Gordan": [
      { id: 1, type: "received", content: "Can you confirm the schedule for Friday?", time: "01:00 PM" },
      { id: 2, type: "sent", content: "Yes, Friday’s schedule is confirmed.", time: "01:10 PM" },
      { id: 3, type: "received", content: "Great! Let me know if there are any last-minute changes.", time: "01:12 PM" },
      { id: 4, type: "sent", content: "Absolutely, I’ll notify you if anything changes.", time: "01:15 PM" },
      { id: 5, type: "received", content: "Thanks! By the way, good job with the itinerary.", time: "01:20 PM" },
      { id: 6, type: "sent", content: "Thank you, Jordan. Appreciate the support.", time: "01:25 PM" },
    ],
    "Mathew Adja": [
      { id: 1, type: "received", content: "I’ve completed my training module.", time: "11:50 AM" },
      { id: 2, type: "sent", content: "Well done, Nadila!", time: "11:55 AM" },
      { id: 3, type: "sent", content: "Do you need any assistance with the next steps?", time: "11:57 AM" },
      { id: 4, type: "received", content: "I’d appreciate guidance on submitting the final report.", time: "12:00 PM" },
      { id: 5, type: "sent", content: "Sure. I’ll send you a template shortly.", time: "12:05 PM" },
      { id: 6, type: "received", content: "Thank you so much!", time: "12:10 PM" },
    ],
    "Harry Zimmer": [
      { id: 1, type: "received", content: "The itinerary has been finalized.", time: "10:10 AM" },
      { id: 2, type: "sent", content: "Great! Thanks for updating me.", time: "10:20 AM" },
      { id: 3, type: "sent", content: "Did you share this with the guides yet?", time: "10:25 AM" },
      { id: 4, type: "received", content: "Not yet. I was waiting for your confirmation.", time: "10:30 AM" },
      { id: 5, type: "sent", content: "Please go ahead. Let me know once it’s done.", time: "10:35 AM" },
      { id: 6, type: "received", content: "Will do. Thanks, Nabila.", time: "10:40 AM" },
    ],
    "Eren Jacobs": [
      { id: 1, type: "received", content: "What’s the next step in the process?", time: "09:30 AM" },
      { id: 2, type: "sent", content: "I’ll share the next steps shortly.", time: "09:35 AM" },
      { id: 3, type: "received", content: "Thanks! I’ll keep an eye out for your email.", time: "09:40 AM" },
      { id: 4, type: "sent", content: "Make sure to check the guidelines I shared earlier.", time: "09:45 AM" },
      { id: 5, type: "received", content: "Got it. Thanks again!", time: "09:50 AM" },
    ],
  };
  const Chat = () => {
    const [messagesSearchValue, setMessagesSearchValue] = useState("");
    const [filteredChats, setFilteredChats] = useState(chatsData);
    const [activeChat, setActiveChat] = useState(null);
    const [isGroupChat, setIsGroupChat] = useState(false); // Track if it's a group chat
    const [messageInput, setMessageInput] = useState(""); // State for the message input
  
    const handleMessagesSearchChange = (event, value) => {
      setMessagesSearchValue(value);
      if (value) {
        setFilteredChats(
          chatsData.filter((chat) =>
            chat.name.toLowerCase().includes(value.toLowerCase())
          )
        );
    
        // Automatically set the first matching chat as active
        const matchingChat = chatsData.find((chat) =>
          chat.name.toLowerCase() === value.toLowerCase()
        );
    
        if (matchingChat) {
          setActiveChat(matchingChat.name);
          setIsGroupChat(false); // It's a private chat, not a group chat
        }
      } else {
        setFilteredChats(chatsData);
      }
    };
  
    // Handle selecting a group chat
    const handleGroupClick = (groupName) => {
      setActiveChat(groupName);
      setIsGroupChat(true);
    };
  
    // Handle selecting a regular chat
    const handleChatClick = (chatName) => {
      setActiveChat(chatName); // Set the clicked chat as active
      setIsGroupChat(false); // It's a private chat
    };
  
    // Handle sending a message
    const handleSendMessage = () => {
      if (messageInput.trim() && activeChat) {
        const newMessage = {
          id: Date.now(),
          type: "sent",
          content: messageInput,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
  
        if (isGroupChat) {
          groupChatHistory[activeChat] = [...(groupChatHistory[activeChat] || []), newMessage];
        } else {
          messagesData[activeChat] = [...(messagesData[activeChat] || []), newMessage];
        }
  
        setMessageInput(""); // Clear input after sending
      }
    };
  
    return (
      <div className={styles.chatContainer}>
        {/* Left Section */}
        <div className={styles.leftPane}>
          <div className={styles.searchBar}>
            <Autocomplete
              disablePortal
              options={chatsData.map((chat) => chat.name)}
              value={messagesSearchValue}
              onInputChange={handleMessagesSearchChange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Search Messages" variant="outlined" />
              )}
            />
          </div>
          <div className={styles.groups}>
            <h4>Groups</h4>
            {groupsData.map((group) => (
              <div
                key={group.id}
                className={`${styles.groupItem} ${
                  activeChat === group.name ? styles.active : ""
                }`}
                onClick={() => handleGroupClick(group.name)}
              >
                <p className={styles.groupName}>{group.name}</p>
                <p className={styles.groupPreview}>
                  {
                    groupChatHistory[group.name]?.slice(-1)[0]?.content || // Get last message content
                    "No messages yet."
                  }
                </p>
              </div>
            ))}
          </div>
          <div className={styles.chats}>
            <h4>Chats</h4>
            <div className={styles.chatList}>
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${
                    activeChat === chat.name ? styles.active : ""
                  }`}
                  onClick={() => handleChatClick(chat.name)}
                >
                  <p className={styles.chatName}>{chat.name}</p>
                  <p className={styles.chatPreview}>{chat.lastMessagePreview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Right Section */}
        <div className={styles.rightPane}>
          {activeChat ? (
            <div className={styles.chatDisplay}>
              <h3>{activeChat}</h3>
              <div className={styles.messages}>
                {(isGroupChat
                  ? groupChatHistory[activeChat]
                  : messagesData[activeChat]
                )?.length > 0 ? (
                  (isGroupChat ? groupChatHistory[activeChat] : messagesData[activeChat])?.map((msg) => (
                    <div key={msg.id} className={styles.messageWrapper}>
                      {isGroupChat && msg.type === "received" && (
                        <p className={styles.senderName}>{msg.sender}</p>
                      )}
                      <div
                        className={`${styles.message} ${
                          msg.type === "sent" ? styles.sent : styles.received
                        }`}
                      >
                        <p>{msg.content}</p>
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noChat}>No messages yet.</p>
                )}
              </div>
              {/* Message Sending Bar */}
              <div className={styles.messageInputContainer}>
                <TextField
                  placeholder="Write your message..."
                  variant="outlined"
                  fullWidth
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className={styles.messageInput}
                />
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: '#8a0303', // Red background
                    color: '#fff', // White text
                    '&:hover': {
                      backgroundColor: '#b71c1c', // Darker red on hover
                    },
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <p className={styles.noChat}>Select a chat to view messages</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Chat;