import "../styles/companycard.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getAllSellers } from "../service/authService";
import { useEffect, useState } from "react";
import { CompanyCardProps, SellersDetails } from "../types/types";


const CompanyCard: React.FC<CompanyCardProps> = ({ onSelectionChange }) => {
  const [sellers, setSellers] = useState<SellersDetails[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (onSelectionChange) {
      onSelectionChange(id);
    }
  };

  const fetchSellers = async () => {
    try {
      const res = await getAllSellers();
      setSellers(res.sellers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="company-card-container">
      {sellers.length > 0 ? (
        <>
          {sellers.map((seller) => {
            return (
              <div key={seller.id} className="company-item">
                <div className="company-info">
                  <span className="company-name">{seller.legalName}</span>
                  <span className="company-points">
                    {seller.coinName}
                    <InfoOutlinedIcon className="info-icon" />
                  </span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="company-checkbox"
                    onChange={() => handleCheckboxChange(seller.id)}
                    defaultChecked={seller.checked}
                  />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>Data not Available</>
      )}
    </div>
  );
};

export default CompanyCard;
