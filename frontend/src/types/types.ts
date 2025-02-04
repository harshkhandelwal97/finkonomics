export interface PointsSummaryProps {
    totalPoints: number;
    totalValue: string;
    savedAmount: string;
  }

  export interface NotificationItem {
    type: string;
    title: string;
    time: string;
    message: string;
    expiryDate: string;
    actionText: string;
  }
  
  export interface NotificationCardProps {
    notification: NotificationItem;
  }
  
  export interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }

  export interface RewardPointsData {
    quantity: number;
    pointValue: string;
    icon: string;
    name: string;
    amount: string;
  }
  
  export interface PaymentDetailsProps {
    amount: string;
    discount: string;
    finalAmount: string;
    time: string;
    merchant: string;
  }

  export interface CompanyCardProps {
    onSelectionChange: (id: string) => void;
    // userPortFolio: UserPortfolio[];

  }
  
  export interface SellersDetails {
    id: string;
    legalName: string;
    logo: string;
    coinName: string;
    coinLogo: string;
    checked: boolean;
  }
  

  export interface UserPortfolio{
    id: string;
    logo: string;
    sellerId: string;
    coinName: string;
    legalName: string;
    currentExchangeRatio : string;
    coinsAvailable: string;
    companyPointsLogo: string ;
  }
  export interface ActionButtonProps {
    label: string;
    disabled?: boolean;
    variant: "primary" | "secondary";
    onClick?: () => void;
  }