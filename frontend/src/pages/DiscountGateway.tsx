import { PaymentDetails } from "../components/payment_Details"
import Header1 from "../components/Header1"
import { getUserPortfolio } from "../service/authService"
import { UserPortfolio } from "../types/types"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Avatar } from "@mui/material"

import "../styles/companycardHome.css";

export default function DiscountGateway() {
    const [searchParams] = useSearchParams();
    const amount = parseInt(searchParams.get('amount') || '0');
    const sid = searchParams.get('sid') || "";
    const lg = searchParams.get('lg') || "";

    const [userPortfolio, setUserPortfolio] = useState<UserPortfolio[]>([]);
    const [selectedSellers, setSelectedSellers] = useState<{ id: string, discount: number }[]>([]);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(amount);

    useEffect(() => {
        fetchUserPortfolio();
    }, []);

    const fetchUserPortfolio = async () => {
        try {
            const res = await getUserPortfolio();
            setUserPortfolio(res.sellers);
        } catch (error) {
            console.error("Error fetching user portfolio:", error);
        }
    };

    /** Handles selection of sellers and updates discount calculation */
    const handleCheckboxChange = (seller: UserPortfolio) => {
        setSelectedSellers(prev => {
            const isSelected = prev.some(item => item.id === seller.id);
            let updatedSellers;

            if (isSelected) {
                // Remove seller if already selected
                updatedSellers = prev.filter(item => item.id !== seller.id);
            } else {
                // Calculate discount from this seller and add
                const sellerDiscount = Math.min(amount, Math.round(parseInt(seller.coinsAvailable) * parseInt(seller.currentExchangeRatio)));
                updatedSellers = [...prev, { id: seller.id, discount: sellerDiscount, legalName : seller.legalName, logo: seller.logo }];
            }

            // Update total discount and final amount
            const newDiscountTotal = updatedSellers.reduce((acc, curr) => acc + curr.discount, 0);
            setDiscountTotal(newDiscountTotal);
            setFinalAmount(amount - newDiscountTotal);

            // Store in localStorage
            localStorage.setItem("selectedSellers", JSON.stringify(updatedSellers));

            return updatedSellers;
        });
    };

    const navigate = useNavigate()

    const handleNext = () => {
        localStorage.setItem('sid', sid)
        navigate(`/payment/receipt?amount=${amount}&lg=${lg}`)
    };

    return (
        <div className="discount-gateway">
            <Header1 />
            <div className="container">
                <PaymentDetails
                    amount={`₹${amount}`}
                    discount={`-₹${discountTotal}`} 
                    finalAmount={`₹${finalAmount}`}
                    time="9:25"
                    merchant={lg}
                />

                <div className="company-outer-box1">
                    <div className="company-card-container">
                        {userPortfolio.map((seller: UserPortfolio) => {
                            const isChecked = selectedSellers.some(item => item.id === seller.id);
                            return (
                                <div key={seller.id} className="company-item">
                                    <div className="qty-point">
                                        <div>Qty = {seller.coinsAvailable}</div>
                                        <div className="point-info">
                                            <div>1 point = ₹{seller.currentExchangeRatio}</div>
                                            <div>
                                                <InfoOutlinedIcon sx={{ width: 15 }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Brand Name and Logo */}
                                    <div className="brand-logo">
                                        <div className="brand-logo-name">
                                            <div className="avatar-image">
                                                <Avatar
                                                    alt={seller.legalName}
                                                    src={`https://res.cloudinary.com/${import.meta.env.CLOUDINARY_CLOUD_NAME}/image/upload/${seller.logo}`}
                                                    sx={{ width: 32, height: 32 }}
                                                />
                                            </div>
                                            <div className="brand-name">{seller.legalName} Points</div>
                                        </div>
                                        <span className="money-arrow">
                                            <div className="moneydetail">₹{Math.round(Number(seller.coinsAvailable) * Number(seller.currentExchangeRatio))}</div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    className="company-checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleCheckboxChange(seller)}
                                                />
                                            </div>
                                        </span>
                                    </div>

                                    <div className="expiry-info">
                                        {seller.coinName}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="proceed-button">
                <button onClick={handleNext}>
                    Proceed Next
                </button>
            </div>
        </div>
    );
}
