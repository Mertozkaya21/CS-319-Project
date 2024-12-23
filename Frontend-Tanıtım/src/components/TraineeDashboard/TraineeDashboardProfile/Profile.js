import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TraineeDashboardProfile.module.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TablePagination from '@mui/material/TablePagination';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
    const [trainee, setTrainee] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [messagesSearchValue, setMessagesSearchValue] = useState("");
    const [filteredMessages, setFilteredMessages] = useState([]);
    const traineeId = localStorage.getItem('userId');

    // Pagination States
    const [contactsPage, setContactsPage] = useState(0);
    const [contactsRowsPerPage, setContactsRowsPerPage] = useState(5);
    const [messagesPage, setMessagesPage] = useState(0);
    const [messagesRowsPerPage, setMessagesRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchTraineeData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/user/trainee/${traineeId}`);
                setTrainee(response.data);
            } catch (error) {
                console.error('Error fetching trainee data:', error);
            }
        };

        const fetchContacts = async () => {
            try {
                // Fetch advisors
                const advisorsResponse = await axios.get('http://localhost:8080/v1/user/advisor');
                // Fetch guides
                const guidesResponse = await axios.get('http://localhost:8080/v1/user/guide');
                
                const allContacts = [
                    ...advisorsResponse.data.map(advisor => ({
                        ...advisor,
                        role: 'Advisor'
                    })),
                    ...guidesResponse.data.map(guide => ({
                        ...guide,
                        role: 'Guide'
                    }))
                ];
                
                setContacts(allContacts);
                setFilteredContacts(allContacts);
                setFilteredMessages(allContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        if (traineeId) {
            fetchTraineeData();
            fetchContacts();
        }
    }, [traineeId]);

    const handleSearchChange = (event, value) => {
        setSearchValue(value);
        if (value) {
            setFilteredContacts(
                contacts.filter((contact) =>
                    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredContacts(contacts);
        }
        setContactsPage(0);
    };

    const handleMessagesSearchChange = (event, value) => {
        setMessagesSearchValue(value);
        if (value) {
            setFilteredMessages(
                contacts.filter((contact) =>
                    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredMessages(contacts);
        }
        setMessagesPage(0);
    };

    const handleContactsPageChange = (event, newPage) => {
        setContactsPage(newPage);
    };

    const handleContactsRowsPerPageChange = (event) => {
        setContactsRowsPerPage(parseInt(event.target.value, 10));
        setContactsPage(0);
    };

    const handleMessagesPageChange = (event, newPage) => {
        setMessagesPage(newPage);
    };

    const handleMessagesRowsPerPageChange = (event) => {
        setMessagesRowsPerPage(parseInt(event.target.value, 10));
        setMessagesPage(0);
    };

    if (!trainee) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}></div>
                <div className={styles.profileDetails}>
                    <h2 className={styles.profileName}>{`${trainee.firstName} ${trainee.lastName}`}</h2>
                    <p className={styles.profileRole}>Trainee</p>
                    <p className={styles.profileLocation}>📍 Ankara, Turkey</p>
                </div>
                <div className={styles.profileContact}>
                    <p className={styles.profileContactItem}>
                        📞 {trainee.phoneNo}
                    </p>
                    <p className={styles.profileContactItem}>
                        ✉️ {trainee.email}
                    </p>
                </div>
            </div>

            <div className={styles.contactAndMessages}>
                <div className={styles.contacts}>
                    <div className={styles.contactsHeader}>
                        <h3>Contacts</h3>
                        <p>You have {contacts.length} contacts</p>
                    </div>
                    <div className={styles.contactSearch}>
                        <Autocomplete
                            disablePortal
                            options={contacts.map(contact => `${contact.firstName} ${contact.lastName}`)}
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
                                        <p className={styles.contactName}>
                                            {`${contact.firstName} ${contact.lastName}`}
                                        </p>
                                        <p className={styles.contactRole}>{contact.role}</p>
                                    </div>
                                    <NavLink
                                        to="/traineedashboardchat"
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

                <div className={styles.messages}>
                    <div className={styles.messagesHeader}>
                        <h3>Messages</h3>
                    </div>
                    <div className={styles.messageSearch}>
                        <Autocomplete
                            disablePortal
                            options={contacts.map(contact => `${contact.firstName} ${contact.lastName}`)}
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
                                        <p className={styles.messageName}>
                                            {`${contact.firstName} ${contact.lastName}`}
                                        </p>
                                        <p className={styles.messagePreview}>
                                            Click to start a conversation
                                        </p>
                                    </div>
                                    <span className={styles.messageTime}>
                                        New
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