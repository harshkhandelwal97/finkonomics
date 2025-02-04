import "../styles/companycardWithPoints.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import companyTransection from "../../data/companyTransectionData";
const CompanyCard = () => {
  return (
    <div className="outer-container-history">
      <div key="id" className="month-total-item1">
        <div className="company-info1">
          <div className="company-name"> February, 2025</div>
          <div className="company-points">saved on last month</div>
        </div>

        <div className="company-exchange2">
          <div className="month-money">₹378</div>
          <div className="points">603 points</div>
        </div>
      </div>
      <div className="company-card-container1">
        {companyTransection.map((item) => (
          <div
            key={item.id}
            className={item.success === 1 ? "company-item-history" : "company-item-history1"}
          >
            <div className="company-info">
              <span className="company-name">{item.company_name}</span>
              <span className="company-points">
                {item.date}
                {/* <span className="info-icon">InfoIcon</span> Info icon added here */}
              </span>
            </div>

            <div className="company-exchange1">
              {item.success === 1 ? (
                <div className="money1">₹{item.money}</div>
              ) : (
                <div className="money1">
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
