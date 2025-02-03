import "../styles/companycardHome.css";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/material/Avatar";
import companyTransection from "../../data/companyTransectionData";
const CompanyCard = () => {
  return (
    <div className="company-outer-box1">
      <div className="company-card-container">
        {companyTransection.map((item) => (
          <div key={item.id} className="company-item">
            <div className="qty-point">
              <div>Qty = {item.qty}</div>
              <div className="point-info">
              <div>1 point = ₹{item.pointvalue} </div>
              <div><InfoOutlinedIcon  sx = {{width: 15}}/></div>
              </div>
              
            </div>

            {/* brandname and logo */}
            <div className="brand-logo">
              <div className="brand-logo-name">
                <div className="avatar-image">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 32, height: 32 }}/>
                </div>
                  <div className="brand-name">{item.company_name} Points</div>
              </div>
              <span className="money-arrow">
                <div className="moneydetail">
              ₹{item.money}

                </div>
                <button className="home-arrow">
                  <ArrowForwardIosIcon />
                </button>
              </span>
            </div>

            <div className="expiry-info">
              {item.upcoming_expire_pts} points get expired by{" "}
              {item.upcoming_expire_date}
            </div>
            {/* <div className="company-info">
                <span className="company-pts"> Qty= {item.points}</span>
                <span className="company-name">{item.company_name} Points</span>
                <span className="company-points">
                  {item.upcoming_expire_pts} points get expired by{" "}
                  {item.upcoming_expire_date}
                  <span className="info-icon">InfoIcon</span> Info icon added
                  here
                </span>
              </div> */}

            {/* <div className="company-exchange-1">
                <div className="points">
                  {" "}
                  1 point = ₹{item.pointvalue}{" "}
                  <InfoOutlinedIcon style={{ fontSize: "13px" }} />
                </div>
                <div className="money">₹{item.points*item.pointvalue}</div>
                <div className="money">
                  ₹{Math.round(item.points * item.pointvalue)}
                </div>
              </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCard;
