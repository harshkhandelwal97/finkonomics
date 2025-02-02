import "../styles/companycard.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Header1 from "../components/Header1";
import Footer1 from "../components/footer";
import CompanyCard from "../components/companycard";

const PermissionPage = () => {
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
          <button className="filter-button">Filter</button>
        </div>
      </div>
      <div className="company-card-scroll-container">
        <CompanyCard />
      </div>
      <Footer1/>
    </div>
  );
};

export default PermissionPage;


