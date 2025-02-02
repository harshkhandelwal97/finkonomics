import "../styles/companycardHome.css";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import companyTransection from "../../data/companyTransectionData";
const CompanyCard = () => {
  return (
    <div>
   <div className="company-outer-box">

      <div className="company-card-container">
        {companyTransection.map((item) => (
          <div
            key={item.id}
            className= "company-item"
            >
            <div className="company-info">
            <span className="company-pts"> Qty= {item.points}</span>
              <span className="company-name">{item.company_name} Points</span>
              <span className="company-points">
                {item.upcoming_expire_pts} points get expired by {item.upcoming_expire_date}
                {/* <span className="info-icon">InfoIcon</span> Info icon added here */}
              </span>
            </div>

            <div className="company-exchange">
           
              <div className="points"> 1 point = ₹{item.pointvalue} <InfoOutlinedIcon style= {{fontSize : "13px"}} /></div>
                {/* <div className="money">₹{item.points*item.pointvalue}</div> */}
                <div className="money">₹{Math.round(item.points * item.pointvalue)}</div>

    
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
