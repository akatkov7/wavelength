import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GitHubIcon from '@mui/icons-material/GitHub';
// import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
import SpeedIcon from '@mui/icons-material/Speed';
import { SwipeableDrawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

const HeaderNav = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navListItems = [
    { icon: <ChevronRightIcon />, text: '', onClick: () => toggleDrawer() },
    {
      icon: <SpeedIcon />,
      text: 'Wavelength',
      onClick: () => {
        window.location.href = '/';
      },
    },
    // {
    //   icon: <InfoIcon />,
    //   text: 'About',
    //   onClick: () => {
    //     window.location.href = '/wavelength/docs';
    //   },
    // },
    // {
    //   icon: <MenuBookIcon />,
    //   text: 'Tech Spec',
    //   onClick: () => {
    //     window.location.href = '/wavelength/docs';
    //   },
    // },
    {
      icon: <GitHubIcon />,
      text: 'GitHub',
      onClick: () => {
        window.location.href = 'https://github.com/akatkov7/wavelength';
      },
    },
  ];

  return (
    <>
      <header>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Wavelength</Typography>
            <IconButton edge="end" color="inherit" aria-label="open drawer" onClick={() => toggleDrawer()}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
      <nav>
        <SwipeableDrawer anchor="right" open={drawerOpen} onOpen={() => toggleDrawer()} onClose={() => toggleDrawer()}>
          <List>
            {navListItems.map(({ icon, text, onClick }) => (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </nav>
    </>
  );
};

export default HeaderNav;
