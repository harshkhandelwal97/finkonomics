import "../styles/companycard.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Header1 from "../components/Header1";
import CompanyCard from "../components/companycard";
import { useEffect, useState } from "react";
import { addSellers, updateUserPorfolio } from "../service/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import TuneIcon from '@mui/icons-material/Tune';
const PermissionPage: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const medium = searchParams.get('utm_medium') || ""

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
      if (medium === "registration") {
        await addSellers(selectedCompanies);
      } else {
        await updateUserPorfolio(selectedCompanies)
      }
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const token = localStorage.getItem('token') || ""
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); 
  

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
          <button className="filter-button"> <TuneIcon/> Filter</button>
        </div>
        <div>

        <h3>Select all the brands whose services you use</h3>
        </div>
      </div>
      <div className="company-card-scroll-container">
        <CompanyCard onSelectionChange={handleSelection} />
      </div>
      <div className="button-area1">
        <button className="submit-button" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    
    </div>
  );
};

export default PermissionPage;

