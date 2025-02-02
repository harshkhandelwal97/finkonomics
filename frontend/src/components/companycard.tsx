import "../styles/companycard.css";
// import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import company from "../../data/companyData";

const CompanyCard = () => {
  return (
    
      <div className="company-card-container">
        {company.map((item) => (
          <div key={item.id} className="company-item">
            <div className="company-info">
              <span className="company-name">{item.company_name}</span>
              <span className="company-points">
                {item.company_points_name}
                {/* <span className="info-icon">InfoIcon</span> Info icon added here */}
                <InfoOutlinedIcon className="info-icon" />
              </span>
            </div>

            <div>
              <input type="checkbox" className="company-checkbox" />
            </div>
          </div>
        ))}
      </div>
  
  );
};

export default CompanyCard;
