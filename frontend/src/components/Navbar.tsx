import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { redirect } from 'react-router-dom';

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home"  icon={<HomeOutlinedIcon/>}>
        </BottomNavigationAction>
        <BottomNavigationAction label="History " icon={<RestoreIcon />} onClick={() => redirect("/history")} />
        <BottomNavigationAction label="Permissions" icon={<KeyOutlinedIcon/>} onClick={() => redirect("/permissions")} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleOutlinedIcon/>} onClick={() => redirect("/profile")} />
      </BottomNavigation>
    </Box>
  );
}