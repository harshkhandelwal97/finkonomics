import CompanyCard from "../components/companycardWithPoints";
import Header1 from "../components/Header1";
import Footer1 from "../components/footer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import '../styles/HistoryPage.css'
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

export default HistoryPage;
