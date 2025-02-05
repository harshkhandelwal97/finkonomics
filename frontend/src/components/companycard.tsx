import "../styles/companycard.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getAllSellersWithUserRegistration } from "../service/authService";
import { useEffect, useState } from "react";
import { CompanyCardProps, SellersDetails } from "../types/types";
import { Box, CircularProgress } from "@mui/material";


const CompanyCard: React.FC<CompanyCardProps> = ({ onSelectionChange }) => {
  const [sellers, setSellers] = useState<SellersDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (onSelectionChange) {
      onSelectionChange(id);
    }
  };

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await getAllSellersWithUserRegistration();
      setSellers(res.sellers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    if (sellers.length > 0) {
      const preCheckedSellers = sellers.filter((seller) => seller.checked).map((seller) => seller.id);
      preCheckedSellers.forEach(id => selectedIds.push(id));
    }
    for (let index = 0; index < selectedIds.length; index++) {
      const element = selectedIds[index];
      onSelectionChange(element)
      
    }
  }, [sellers, selectedIds])

  return (
    <div className="company-card-container">
      {loading ? (
        <Box sx={{ display: 'flex', width:"100%" }}>
          <CircularProgress />
        </Box>

      ) : (
        <>
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
        </>
      )}

    </div>
  );
};

export default CompanyCard;
