import "../styles/companycard.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Header1 from "../components/Header1";
import CompanyCard from "../components/companycard";
import { useEffect, useState } from "react";
import { addSellers } from "../service/authService";
import { useNavigate } from "react-router-dom";

const PermissionPage: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  // Function to update selected companies
  const handleSelection = (id: string) => {
    setSelectedCompanies((prev) => {
      if (prev.includes(id)) {
        // Remove the ID if already selected
        return prev.filter((companyId) => companyId !== id);
      } else {
        // Add the ID if not already selected
        return [...prev, id];
      }
    });
  };

  const navigate = useNavigate();

  // Function to send selected IDs to the backend
  const handleSubmit = async () => {
    try {
      console.log(selectedCompanies.toString());
      await addSellers(selectedCompanies);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

    const token = localStorage.getItem('token') || ""
    useEffect(() => {
      if (!token || token === "") {
        navigate("/login")
      }
    })

  return (
    <div className="landing-page-container">
      <Header1 />
      <div className="search-container">
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
        <h3>Select all the brands whose services you use</h3>
      </div>
      <div className="company-card-scroll-container">
        <CompanyCard onSelectionChange={handleSelection} />
      </div>
      <div className="button-area">
        <button className="submit-button" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PermissionPage;
