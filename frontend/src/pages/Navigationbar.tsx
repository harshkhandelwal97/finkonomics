import '../styles/navigationbar.css';
import React, { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Link, useLocation } from 'react-router-dom';
import TryDemoDialog from '../components/TryDemoDialog';
import LogoImage from "../assets/finkonomics_logo.svg"

const NavigationBar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  return (
    <nav className="navigation-bar" >
      <TryDemoDialog open={open} onClose={() => setOpen(false)} />
      <Link to={"/"} className={`nav-item ${location.pathname === '/' && 'active-css'}`} >
        <span className="icon"><HomeOutlinedIcon /></span>
        <span className="label">Home</span>
      </Link>
      <Link to={"/history"} className="nav-item">
        <span className="icon"><RestoreRoundedIcon /></span>
        <span className="label">Recent</span>
      </Link>
      <Link to={"/permissions"} className="nav-item">
        <span className="icon"><TuneRoundedIcon /></span>
        <span className="label">Permission</span>
      </Link>
      <button className="nav-item1" onClick={() => setOpen(true)}>
        <span className="icon">
          <img src={LogoImage} alt="Profile" width={25} height={25} />
        </span>
        <span className="label">Demo</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
