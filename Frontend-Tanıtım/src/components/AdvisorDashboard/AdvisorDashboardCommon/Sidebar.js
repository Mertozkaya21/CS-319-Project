import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  Group as GroupIcon,
  EmojiPeople as EmojiPeopleIcon,
  ContentPasteGo as ContentPasteGoIcon,
  EventAvailable as EventAvailableIcon,
  Stadium as StadiumIcon,
  AccountCircle as AccountCircleIcon,
  Person2 as Person2Icon,
  Chat as ChatIcon,
  EventNote as EventNoteIcon, 
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import styles from './Sidebar.module.css';
import bilkentLogo from '../../../assets/bilkent-logo.png';

// Create a custom theme for the sidebar
const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#8a0303', // Red background for accordion
          color: '#ffffff', // White text
          boxShadow: 'none', // No shadow
          border: 'none', // No border
          margin: '0 !important', // Ensure no outer margin
          padding: '0 !important', // Ensure no padding
          '&:before': {
            display: 'none', // Remove default separator line
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#8a0303', // Red background for accordion summary
          color: '#ffffff', // White text
          display: 'flex',
          alignItems: 'center', // Align icon and text vertically
          gap: '10px', // Add space between icon and text
          padding: '0px 20px', // Match padding with other items
          minHeight: '48px', // Set a consistent height
          margin: '0', // Remove any internal margin
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: '#ffffff', // White expand/collapse icon
          },
        },
        content: {
          gap: '12px', // Add space between icon and text
          alignItems: 'center', // Ensure alignment of text with icon
          margin: '0', // Remove any internal margin
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: '#8a0303', // Red background for dropdown content
          color: '#ffffff', // White text
          padding: '4px 16px', // Compact padding
          marginTop: '-20px', // Remove extra gap from dropdown
          marginBottom: '-10px', // Remove extra gap from dropdown
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          gap: '4px', // Compact spacing between items
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#ffffff', // White text for list items
          display: 'flex',
          alignItems: 'center', // Align items vertically
          gap: '8px', // Add space between icon and text
          padding: '8px 25px', // Compact padding for items
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff', // White icons for list items
          minWidth: '35px', // Adjust spacing between icon and text
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          marginTop: '-20px', // Remove extra gap from dropdown
          marginBottom: '-10px', // Remove extra gap from dropdown
          '& .MuiListItem-root:hover': {
            backgroundColor: '#b14343', // Hover background for dropdown items
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff', // White text for primary list items
        },
      },
    },
  },
});

const Sidebar = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.sidebar}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <img src={bilkentLogo} alt="Bilkent Logo" />
          <h2>Tanıtım Ofisi</h2>
        </div>

        {/* Navigation Links */}
        <nav>
          {/* Dashboard */}
          <NavLink
            to="/advisordashboard"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <HomeIcon />
            <span>Dashboard</span>
          </NavLink>

          {/* Applications Dropdown */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ContentPasteGoIcon className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.activeIcon : ''}`
            } />
              <span>Applications</span>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardtourapplications"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <EventNoteIcon className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.activeIcon : ''}`
            }/>
                  </ListItemIcon>
                  <ListItemText primary="Tour Applications" />
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardindividualtourapplications"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <StadiumIcon className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.activeIcon : ''}`
            }/>
                  </ListItemIcon>
                  <ListItemText primary="Individual Applications" />
                </ListItem>
                
              </List>
            </AccordionDetails>
          </Accordion>


          {/* Events Dropdown */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <EventAvailableIcon />
              <span>Events</span>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardtours"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tours" />
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardfairs"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <StadiumIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fairs" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Users Dropdown */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <GroupIcon />
              <span>Users</span>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardguides"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Guides" />
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardtrainees"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <EmojiPeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trainees" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Puantaj */}
          <NavLink
            to="/advisordashboardpuantaj"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <AssignmentIcon />
            <span>Puantaj</span>
          </NavLink>

          {/* User Dropdown */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <AccountCircleIcon />
              <span>User</span>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardprofile"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <Person2Icon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardchat"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="Chat" />
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/advisordashboardsettings"
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </nav>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;