import React, { useEffect, useState } from "react";
import "../styles/paymentReceipt.css";
import { PaymentDetails } from "../components/payment_Details";
import { RewardPointsCard } from "../components/RewardPointCard";
import { AppliedDiscountTypes } from "../types/types";
import Header1 from "../components/Header1";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentDrawer from "../components/PaymentDrawer";
import { transactionByFinko } from "../service/authService";
import PageLoader from "../components/PageLoader";


export const PaymentReceipt: React.FC = () => {
  const [searchParams] = useSearchParams();
  const amount = parseInt(searchParams.get('amount') || '0');
  const lg = searchParams.get('lg') || "";
  const sid = localStorage.getItem('sid') || '';

  const [discountTotal, setDiscountTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(amount);
  const [discountApplied, setDiscountApplied] = useState<AppliedDiscountTypes[]>([])
  const storedDiscounts = localStorage.getItem("selectedSellers");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch discount details from localStorage
    if (storedDiscounts) {
      const parsedDiscounts: AppliedDiscountTypes[] = JSON.parse(storedDiscounts);

      // Calculate total discount
      const totalDiscount = parsedDiscounts.reduce(
        (sum, item) => sum + (item.discount),
        0
      );

      setDiscountApplied(parsedDiscounts);
      setDiscountTotal(totalDiscount);
      setFinalAmount(amount - totalDiscount);
    }
  }, [amount]);

  const [openPaymentDrawer, setPaymentDrawer] = useState<boolean>(false);

  const navigate = useNavigate()

  const handlePayment = async () => {
    if (finalAmount == 0) {
      // that mean all the amount is given by finkonmonics that mean you have to store the details in the database

      const transactionId = `txn_${Date.now()}`; // Generate a unique transaction ID
      const sellerTransferredToId = sid; // Retrieve sellerTransferredToId from localStorage

      if (storedDiscounts) {
        const parsedDiscounts: AppliedDiscountTypes[] = JSON.parse(storedDiscounts);
        setLoading(true)

        // Create fromSellers array in required format
        const fromSellers = parsedDiscounts.map((seller) => ({
          sellerId: seller.id,
          amount: seller.discount, // Discount is the INR amount provided by the seller
          points: 0, // Assuming points are not stored, defaulting to 0
        }));

        const payload = {
          transactionId,
          sellerTransferredToId,
          totalAmount: amount,
          fromSellers,
        };

        try {
          const res = await transactionByFinko(payload);
          navigate(res.redirectTo);
          localStorage.clear()
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }

      }

    } else {
      // else open the payment gateway
      setPaymentDrawer(true);
    }
  }

  const token = localStorage.getItem('token') || ""


  useEffect(() => {
    if (!token || token === "") {
      navigate("/login")
    }
  })

  return (
    <div>
      <Header1 />
      <div className="container">
        <main className="main">
          <PaymentDetails
            amount={`₹${amount}`}
            discount={`-₹${discountTotal}`}
            finalAmount={`₹${finalAmount}`}
            time="9:25"
            merchant={lg}
          />

          <section className="transactionSection">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Discount details</h2>
                <div className="sectionSubtitle">Used Reward points</div>
              </div>
              {/* <div className="actionButtons">
                <GetAppIcon className="actionButton" aria-label="Download" color="disabled" />
                <ShareIcon className="actionButton" aria-label="Share" color="disabled" />
              </div> */}
            </div>

            <div className="rewardsList">
              {discountApplied.length > 0 ? (
                discountApplied.map((data, index) => (
                  <RewardPointsCard key={index} data={data} />
                ))
              ) : (
                <p>No reward points used.</p>
              )}
            </div>
          </section>
        </main>

        <footer className="footer">
          <button className="paymentButton" onClick={handlePayment}>Proceed to Payment</button>
        </footer>
      </div>
      <PaymentDrawer open={openPaymentDrawer} onClose={() => setPaymentDrawer(false)} />
      {loading && <PageLoader />}
    </div>
  );
};
