export interface CommissionTransaction {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  saleAmount: number;
  commissionAmount: number;
  dateTime: string;
  status: 'completed' | 'pending' | 'refunded';
  distributionId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  totalEarned: number;
  lastUpdated: string;
  isActive: boolean;
  avatar?: string;
}

export interface CommissionDistribution {
  id: string;
  transactionId: string;
  orderId: string;
  totalCommission: number;
  sharePerPerson: number;
  distributions: {
    memberId: string;
    memberName: string;
    amount: number;
  }[];
  dateTime: string;
  status: 'distributed' | 'pending' | 'reversed';
}

export interface CommissionSettings {
  commissionPerProduct: number;
  teamMembers: string[];
  autoDistribute: boolean;
  minimumPayout: number;
}