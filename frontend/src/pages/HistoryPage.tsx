import CompanyCard from "../components/companycardWithPoints";
import TuneIcon from '@mui/icons-material/Tune';
import Header1 from "../components/Header1";
import Footer1 from "../components/footer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import '../styles/HistoryPage.css'
import { Class } from "@mui/icons-material";
import { ClassNames } from "@emotion/react";
const HistoryPage = () => {
  return (
    <div className="landing-page-container">
    <Header1 />
    <div className="search-container">
      <h3>Select all the brands whose services you use</h3>
      <div className="searchbox-wrapper">
        <div className="searchbox">
          <input
            type="search"
            name="search-box"
            id="search-input1"
            placeholder="Search your brand"
            className="searchbox-input"
          />
          <SearchOutlinedIcon />
        </div>
        <button className="filter-button1"> <TuneIcon/> 
        <div className="filter-text">
        Filter
        </div>
        </button>
      </div>
    </div>
    <div className="company-card-scroll-container1">
      <CompanyCard />
    </div>
    <Footer1/>
  </div>
  );
};

export default HistoryPage;
