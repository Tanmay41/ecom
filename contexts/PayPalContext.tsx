"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CONFIG } from '@/lib/paypal-config';

interface PayPalContextType {
  isPaymentProcessing: boolean;
  setIsPaymentProcessing: (processing: boolean) => void;
  paymentSuccess: boolean;
  setPaymentSuccess: (success: boolean) => void;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
  resetPaymentState: () => void;
}

const PayPalContext = createContext<PayPalContextType | undefined>(undefined);

export const usePayPal = () => {
  const context = useContext(PayPalContext);
  if (!context) {
    throw new Error('usePayPal must be used within a PayPalProvider');
  }
  return context;
};

interface PayPalProviderProps {
  children: ReactNode;
}

export const PayPalProvider: React.FC<PayPalProviderProps> = ({ children }) => {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const resetPaymentState = () => {
    setIsPaymentProcessing(false);
    setPaymentSuccess(false);
    setPaymentError(null);
  };

  const value: PayPalContextType = {
    isPaymentProcessing,
    setIsPaymentProcessing,
    paymentSuccess,
    setPaymentSuccess,
    paymentError,
    setPaymentError,
    resetPaymentState,
  };

  return (
    <PayPalContext.Provider value={value}>
      <PayPalScriptProvider
        options={{
          clientId: PAYPAL_CONFIG.clientId,
          currency: PAYPAL_CONFIG.currency,
          intent: PAYPAL_CONFIG.intent,
        }}
      >
        {children}
      </PayPalScriptProvider>
    </PayPalContext.Provider>
  );
};
