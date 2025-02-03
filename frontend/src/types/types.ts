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