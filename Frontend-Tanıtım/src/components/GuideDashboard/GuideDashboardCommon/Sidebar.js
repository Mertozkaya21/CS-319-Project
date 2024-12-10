import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  EmojiPeople as EmojiPeopleIcon,
  Assignment as AssignmentIcon,
  EventAvailable as EventAvailableIcon,
  Stadium as StadiumIcon,
  AccountCircle as AccountCircleIcon,
  Person2 as Person2Icon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
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
          backgroundColor: '#8a0303',
          color: '#ffffff',
          boxShadow: 'none',
          border: 'none',
          margin: '0 !important',
          padding: '0 !important',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#8a0303',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0px 20px',
          minHeight: '48px',
          margin: '0',
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: '#ffffff',
          },
        },
        content: {
          gap: '12px',
          alignItems: 'center',
          margin: '0',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: '#8a0303',
          color: '#ffffff',
          padding: '4px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 25px',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          minWidth: '35px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff',
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
            to="/guidedashboard"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <HomeIcon />
            <span>Dashboard</span>
          </NavLink>

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
                  to="/guidedashboardtours"
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
                  to="/guidedashboardfairs"
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

          {/* Trainees */}
          <NavLink
            to="/guidedashboardtrainees"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <EmojiPeopleIcon />
            <span>Trainees</span>
          </NavLink>

          {/* Puantaj */}
          <NavLink
            to="/guidedashboardpuantaj"
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
                  to="/guidedashboardprofile"
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
                  to="/guidedashboardchat"
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
                  to="/guidedashboardsettings"
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