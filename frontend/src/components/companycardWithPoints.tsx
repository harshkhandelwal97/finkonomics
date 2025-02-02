import "../styles/companycardWithPoints.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import companyTransection from "../../data/companyTransectionData";
const CompanyCard = () => {
  return (
    <div>
      <div key="id" className="month-total-item">
        <div className="company-info">
          <span className="company-name"> February, 2025</span>
          <span className="company-points">saved on last month</span>
        </div>

        <div className="company-exchange">
          <div className="month-money">₹378</div>
          <div className="points">603 points</div>
        </div>
      </div>
      <div className="company-card-container">
        {companyTransection.map((item) => (
          <div
            key={item.id}
            className={item.success === 1 ? "company-item" : "company-item1"}
          >
            <div className="company-info">
              <span className="company-name">{item.company_name}</span>
              <span className="company-points">
                {item.date}
                {/* <span className="info-icon">InfoIcon</span> Info icon added here */}
              </span>
            </div>

            <div className="company-exchange">
              {item.success === 1 ? (
                <div className="money">₹{item.money}</div>
              ) : (
                <div className="money">
                  ₹{item.money}
                  <CancelOutlinedIcon
                    style={{ color: "red", fontSize: "18px" }}
                  />
                </div>
              )}

              <div className="points">{item.points} points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCard;
