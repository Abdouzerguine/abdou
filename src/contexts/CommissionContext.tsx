import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CommissionTransaction, TeamMember, CommissionDistribution, CommissionSettings } from '../types/commission';

interface CommissionContextType {
  transactions: CommissionTransaction[];
  teamMembers: TeamMember[];
  distributions: CommissionDistribution[];
  settings: CommissionSettings;
  addTransaction: (transaction: Omit<CommissionTransaction, 'id' | 'dateTime'>) => void;
  processCommission: (orderId: string, products: { id: string; name: string; storeId: string; storeName: string; saleAmount: number }[]) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  updateSettings: (updates: Partial<CommissionSettings>) => void;
  getTotalCompanyIncome: () => number;
  getMemberIncome: (memberId: string) => number;
  getMonthlyStats: () => { month: string; income: number; commissions: number }[];
}

const CommissionContext = createContext<CommissionContextType | undefined>(undefined);

export const CommissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<CommissionTransaction[]>([]);
  const [distributions, setDistributions] = useState<CommissionDistribution[]>([]);
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Abdou',
      totalEarned: 0,
      lastUpdated: new Date().toISOString(),
      isActive: true,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: '2',
      name: 'Ahmed',
      totalEarned: 0,
      lastUpdated: new Date().toISOString(),
      isActive: true,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
    },
    {
      id: '3',
      name: 'Didou',
      totalEarned: 0,
      lastUpdated: new Date().toISOString(),
      isActive: true,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
    }
  ]);

  const [settings, setSettings] = useState<CommissionSettings>({
    commissionPerProduct: 300,
    teamMembers: ['Abdou', 'Ahmed', 'Didou'],
    autoDistribute: true,
    minimumPayout: 1000
  });

  const addTransaction = (transactionData: Omit<CommissionTransaction, 'id' | 'dateTime'>) => {
    const transaction: CommissionTransaction = {
      ...transactionData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      dateTime: new Date().toISOString()
    };

    setTransactions(prev => [...prev, transaction]);

    // Auto-distribute if enabled
    if (settings.autoDistribute && transaction.status === 'completed') {
      distributeCommission(transaction);
    }
  };

  const distributeCommission = (transaction: CommissionTransaction) => {
    const sharePerPerson = transaction.commissionAmount / teamMembers.length;
    
    const distribution: CommissionDistribution = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      transactionId: transaction.id,
      orderId: transaction.orderId,
      totalCommission: transaction.commissionAmount,
      sharePerPerson,
      distributions: teamMembers.map(member => ({
        memberId: member.id,
        memberName: member.name,
        amount: sharePerPerson
      })),
      dateTime: new Date().toISOString(),
      status: 'distributed'
    };

    setDistributions(prev => [...prev, distribution]);

    // Update team member totals
    setTeamMembers(prev => prev.map(member => ({
      ...member,
      totalEarned: member.totalEarned + sharePerPerson,
      lastUpdated: new Date().toISOString()
    })));

    // Update transaction with distribution ID
    setTransactions(prev => prev.map(t => 
      t.id === transaction.id 
        ? { ...t, distributionId: distribution.id }
        : t
    ));
  };

  const processCommission = (orderId: string, products: { id: string; name: string; storeId: string; storeName: string; saleAmount: number }[]) => {
    products.forEach(product => {
      addTransaction({
        orderId,
        productId: product.id,
        productName: product.name,
        storeId: product.storeId,
        storeName: product.storeName,
        saleAmount: product.saleAmount,
        commissionAmount: settings.commissionPerProduct,
        status: 'completed'
      });
    });
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const updateSettings = (updates: Partial<CommissionSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const getTotalCompanyIncome = () => {
    return transactions
      .filter(t => t.status === 'completed')
      .reduce((total, t) => total + t.commissionAmount, 0);
  };

  const getMemberIncome = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member?.totalEarned || 0;
  };

  const getMonthlyStats = () => {
    const monthlyData: { [key: string]: { income: number; commissions: number } } = {};
    
    transactions
      .filter(t => t.status === 'completed')
      .forEach(transaction => {
        const month = new Date(transaction.dateTime).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short' 
        });
        
        if (!monthlyData[month]) {
          monthlyData[month] = { income: 0, commissions: 0 };
        }
        
        monthlyData[month].income += transaction.saleAmount;
        monthlyData[month].commissions += transaction.commissionAmount;
      });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data
    }));
  };

  return (
    <CommissionContext.Provider value={{
      transactions,
      teamMembers,
      distributions,
      settings,
      addTransaction,
      processCommission,
      updateTeamMember,
      updateSettings,
      getTotalCompanyIncome,
      getMemberIncome,
      getMonthlyStats
    }}>
      {children}
    </CommissionContext.Provider>
  );
};

export const useCommission = () => {
  const context = useContext(CommissionContext);
  if (!context) {
    throw new Error('useCommission must be used within a CommissionProvider');
  }
  return context;
};