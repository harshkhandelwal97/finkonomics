import "./App.css";
// import landingPage from "./pages/LandingPage";
import Permission from "./pages/Permission";
import HistoryPage from "./pages/HistoryPage";
import CompanyLoginPage from "./pages/CompanyLoginPage";
import PhoneNumberScreen from "./pages/UserPhoneRegistration";
import OTPScreenPhone from "./pages/UserPhoneOtp";
import { Route, Routes } from "react-router-dom";
// import UserRegistration from "./pages/UserRegistration";
import UserRegistrationPage from "./pages/UserRegistration";
import Header1 from "./components/Header1";
import CompanyRegistrationPage from "./pages/CompanyRegistration";
import CompanyFinancialDetailsPage from "./pages/CompanyFinancialRegistration";
import CompanyBankDetails from "./pages/CompanyBankDetails";
import { NotificationsPage } from "./pages/NotificationPage";
import { PaymentReceipt } from "./pages/paymentReceipt";
import UserOtpScreen from "./pages/UserEmailOtp";
import UserLoginPage from "./pages/LoginPage";
import { Homepage } from "./pages/HomePage";
import DiscountGateway from "./pages/DiscountGateway";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import NavigationBar from "./pages/Navigationbar";
// import { RewardPointsCard } from "./components/RewardPointCard";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header1 />
              <Homepage />
              <NavigationBar />

            </>
          }
        />
        <Route
          path="/permissions"
          element={
            <>
              <Permission />
              <NavigationBar />
            </>
          }
        />
        <Route path="/login" element={<UserLoginPage />} />

        <Route
          path="/history"
          element={
            <>
              <HistoryPage />
              <NavigationBar />
            </>
          }
        />
        <Route path="/user/register" element={<UserRegistrationPage />} />
        <Route
          path="/register/email-otp/verification"
          element={<UserOtpScreen />}
        />

        <Route
          path="/register/phone/verification"
          element={<PhoneNumberScreen />}
        />

        <Route
          path="/home/notification"
          element={
            <>
              <NotificationsPage />
              <NavigationBar />
            </>
          }
        />

        <Route
          path="/register/phone-otp/verification"
          element={<OTPScreenPhone path={"register"} />}
        />

        <Route
          path="/login/phone-otp/verification"
          element={<OTPScreenPhone path={"login"} />}
        />

        <Route
          path="/payment/receipt"
          element={<PaymentReceipt />}
        />

        <Route
          path="/discount/gateway"
          element={<DiscountGateway />}
        />

        <Route
          path="/payment/success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment/failure"
          element={<PaymentFailure />}
        />
        <Route path="/company/register" element={<CompanyRegistrationPage />} />
        <Route
          path="/company/register/financial"
          element={<CompanyFinancialDetailsPage />}
        />
        <Route
          path="/company/register/financial/bank"
          element={<CompanyBankDetails />}
        />
        <Route path="/company/login" element={<CompanyLoginPage />} />
        <Route path="/payment" element={<PaymentReceipt />} />


        {/* <Route
  path="/homepage"
  element={
    <>
      <Header1 />
      <Homepage totalPoints={0} totalValue="0
      " savedAmount="₹5467" />
    </>
  }
/> */}

      </Routes>
    </div>
  );
}

export default App;
