import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GuideDashboardProfile.module.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TablePagination from '@mui/material/TablePagination';
import { FaEnvelope } from 'react-icons/fa';

const contactsData = [
    {
      id: 1,
      name: "Samantha William",
      role: "Guide",
      lastMessageTime: "12:30 PM",
      lastMessageDate: "2024-12-01",
      lastMessagePreview: "Looking forward to our meeting next week!",
    },
    {
      id: 2,
      name: "Tony Soap",
      role: "Advisor",
      lastMessageTime: "12:15 PM",
      lastMessageDate: "2024-12-02",
      lastMessagePreview: "Please review the latest document I sent.",
    },
    {
      id: 3,
      name: "Karen Hope",
      role: "Guide",
      lastMessageTime: "12:45 PM",
      lastMessageDate: "2024-12-03",
      lastMessagePreview: "The students were thrilled with the tour!",
    },
    {
      id: 4,
      name: "Jordan Nico",
      role: "Advisor",
      lastMessageTime: "01:00 PM",
      lastMessageDate: "2024-12-04",
      lastMessagePreview: "Can you confirm the schedule for Friday?",
    },
    {
      id: 5,
      name: "Nadila Adja",
      role: "Trainee",
      lastMessageTime: "11:50 AM",
      lastMessageDate: "2024-12-05",
      lastMessagePreview: "I’ve completed my training module.",
    },
    {
      id: 6,
      name: "Michael Benson",
      role: "Guide",
      lastMessageTime: "10:20 AM",
      lastMessageDate: "2024-12-06",
      lastMessagePreview: "Could you provide the final itinerary?",
    },
    {
      id: 7,
      name: "Lucy Graham",
      role: "Advisor",
      lastMessageTime: "02:10 PM",
      lastMessageDate: "2024-12-07",
      lastMessagePreview: "We should discuss the student applications.",
    },
    {
      id: 8,
      name: "Harold Zimmer",
      role: "Guide",
      lastMessageTime: "03:15 PM",
      lastMessageDate: "2024-12-08",
      lastMessagePreview: "Great to see everything coming together.",
    },
    {
      id: 9,
      name: "Emily Jacobs",
      role: "Trainee",
      lastMessageTime: "09:00 AM",
      lastMessageDate: "2024-12-09",
      lastMessagePreview: "What’s the next step in the process?",
    },
    {
      id: 10,
      name: "Oliver Smith",
      role: "Guide",
      lastMessageTime: "12:05 PM",
      lastMessageDate: "2024-12-10",
      lastMessagePreview: "Let me know if you need assistance with the group.",
    },
    {
      id: 11,
      name: "Chloe Carter",
      role: "Advisor",
      lastMessageTime: "04:00 PM",
      lastMessageDate: "2024-12-11",
      lastMessagePreview: "I’ve reviewed the documents, and they look good.",
    },
    {
      id: 12,
      name: "Max Wright",
      role: "Guide",
      lastMessageTime: "11:45 AM",
      lastMessageDate: "2024-12-12",
      lastMessagePreview: "Do you have updates on the next tour?",
    },
    {
      id: 13,
      name: "Sophia Martin",
      role: "Trainee",
      lastMessageTime: "01:30 PM",
      lastMessageDate: "2024-12-13",
      lastMessagePreview: "I’m excited to start next week’s project!",
    },
    {
      id: 14,
      name: "Ryan Lee",
      role: "Advisor",
      lastMessageTime: "03:50 PM",
      lastMessageDate: "2024-12-14",
      lastMessagePreview: "Let’s finalize the travel details for the students.",
    },
    {
      id: 15,
      name: "Isabella Davis",
      role: "Guide",
      lastMessageTime: "08:40 AM",
      lastMessageDate: "2024-12-15",
      lastMessagePreview: "We need to reschedule the meeting.",
    },
    {
      id: 16,
      name: "Ethan Brown",
      role: "Advisor",
      lastMessageTime: "10:25 AM",
      lastMessageDate: "2024-12-16",
      lastMessagePreview: "Can you share the revised guidelines?",
    },
    {
      id: 17,
      name: "Grace Walker",
      role: "Guide",
      lastMessageTime: "09:35 AM",
      lastMessageDate: "2024-12-17",
      lastMessagePreview: "I’ll update the group with the latest plan.",
    },
    {
      id: 18,
      name: "William King",
      role: "Advisor",
      lastMessageTime: "11:15 AM",
      lastMessageDate: "2024-12-18",
      lastMessagePreview: "Thanks for the quick response on the report.",
    },
    {
      id: 19,
      name: "Mia Wilson",
      role: "Guide",
      lastMessageTime: "01:20 PM",
      lastMessageDate: "2024-12-19",
      lastMessagePreview: "I’m available to assist with the upcoming event.",
    },
    {
      
    id: 20,
    name: "Daniel Harris",
    role: "Trainee",
    lastMessageTime: "10:50 AM",
    lastMessageDate: "2024-12-20",
    lastMessagePreview: "I’ve completed all my tasks for today.",
  },
];

const Profile = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contactsData);

  const [messagesSearchValue, setMessagesSearchValue] = useState("");
  const [filteredMessages, setFilteredMessages] = useState(contactsData);

    // Pagination States
    const [contactsPage, setContactsPage] = useState(0);
    const [contactsRowsPerPage, setContactsRowsPerPage] = useState(5);
  
  // Pagination States for Messages
  const [messagesPage, setMessagesPage] = useState(0);
  const [messagesRowsPerPage, setMessagesRowsPerPage] = useState(5);

  // Search Filter
  const handleSearchChange = (event, value) => {
    setSearchValue(value);
    if (value) {
      setFilteredContacts(
        contactsData.filter((contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contactsData);
    }
    setContactsPage(0); // Reset to first page after search
  };


  // Search Filter for Messages
  const handleMessagesSearchChange = (event, value) => {
    setMessagesSearchValue(value);
    if (value) {
      setFilteredMessages(
        contactsData.filter((contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredMessages(contactsData);
    }
    setMessagesPage(0); // Reset to first page after search
  };


  // Pagination Handlers for Contacts
  const handleContactsPageChange = (event, newPage) => {
    setContactsPage(newPage);
  };

  const handleContactsRowsPerPageChange = (event) => {
    setContactsRowsPerPage(parseInt(event.target.value, 10));
    setContactsPage(0);
  };

  // Pagination Handlers for Messages
  const handleMessagesPageChange = (event, newPage) => {
    setMessagesPage(newPage);
  };

  const handleMessagesRowsPerPageChange = (event) => {
    setMessagesRowsPerPage(parseInt(event.target.value, 10));
    setMessagesPage(0);
  };

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}></div>
        <div className={styles.profileDetails}>
          <h2 className={styles.profileName}>Nabila Azalea</h2>
          <p className={styles.profileRole}>Guide</p>
        </div>
        <div className={styles.profileContact}>
          <p className={styles.profileContactItem}>
            📞 +90 345 6789 0
          </p>
          <p className={styles.profileContactItem}>
            ✉️ nabila@mail.com
          </p>
        </div>
      </div>

      {/* Contacts and Messages Section */}
      <div className={styles.contactAndMessages}>
        {/* Contacts Section */}
        <div className={styles.contacts}>
          <div className={styles.contactsHeader}>
            <h3>Contacts</h3>
            <p>You have {contactsData.length} contacts</p>
          </div>
          <div className={styles.contactSearch}>
            <Autocomplete
              disablePortal
              options={contactsData.map((contact) => contact.name)}
              value={searchValue}
              onInputChange={handleSearchChange}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} label="Search Name" variant="outlined" />
              )}
            />
          </div>
          <ul className={styles.contactList}>
            {filteredContacts
              .slice(
                contactsPage * contactsRowsPerPage,
                contactsPage * contactsRowsPerPage + contactsRowsPerPage
              )
              .map((contact) => (
                <li key={contact.id} className={styles.contactItem}>
                  <div className={styles.contactAvatar}></div>
                  <div>
                    <p className={styles.contactName}>{contact.name}</p>
                    <p className={styles.contactRole}>{contact.role}</p>
                  </div>
                  <NavLink
                    to="/guidedashboardchat"
                    className={styles.contactAction}
                  >
                    <FaEnvelope />
                  </NavLink>
                </li>
              ))}
          </ul>
          <TablePagination
            component="div"
            count={filteredContacts.length}
            rowsPerPage={contactsRowsPerPage}
            page={contactsPage}
            onPageChange={handleContactsPageChange}
            onRowsPerPageChange={handleContactsRowsPerPageChange}
          />
        </div>
{/* Messages Section */}
<div className={styles.messages}>
          <div className={styles.messagesHeader}>
            <h3>Messages</h3>
          </div>
          <div className={styles.messageSearch}>
            <Autocomplete
              disablePortal
              options={contactsData.map((contact) => contact.name)}
              value={messagesSearchValue}
              onInputChange={handleMessagesSearchChange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Search Messages" variant="outlined" />
              )}
            />
          </div>
          <ul className={styles.messageList}>
            {filteredMessages
              .slice(
                messagesPage * messagesRowsPerPage,
                messagesPage * messagesRowsPerPage + messagesRowsPerPage
              )
              .map((contact) => (
                <li key={contact.id} className={styles.messageItem}>
                  <div className={styles.messageAvatar}></div>
                  <div>
                    <p className={styles.messageName}>{contact.name}</p>
                    <p className={styles.messagePreview}>
                      {contact.lastMessagePreview}
                    </p>
                  </div>
                  <span className={styles.messageTime}>
                    {contact.lastMessageTime}
                  </span>
                </li>
              ))}
          </ul>
          <TablePagination
            component="div"
            count={filteredMessages.length}
            rowsPerPage={messagesRowsPerPage}
            page={messagesPage}
            onPageChange={handleMessagesPageChange}
            onRowsPerPageChange={handleMessagesRowsPerPageChange}
          />
        </div>
      </div>
    </div>
  );

};

export default Profile;