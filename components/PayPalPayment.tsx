/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { usePayPal } from '@/contexts/PayPalContext';
import { PAYPAL_BUTTON_STYLES } from '@/lib/paypal-config';

interface PayPalPaymentProps {
  total: number;
  currency?: string;
  onSuccess?: (details: unknown) => void;
  onError?: (error: unknown) => void;
  onCancel?: () => void;
}

// Explicit types for PayPal actions and data
type PayPalCreateOrderActions = {
  order: {
    create: (params: {
      purchase_units: Array<{
        amount: {
          currency_code: string;
          value: string;
        };
      }>;
    }) => Promise<string>;
    capture?: () => Promise<unknown>;
  };
};

type PayPalApproveActions = {
  order: {
    capture: () => Promise<unknown>;
  };
};

const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  total,
  currency = 'AUD',
  onSuccess,
  onError,
  onCancel,
}) => {
  const { setIsPaymentProcessing, setPaymentSuccess, setPaymentError } = usePayPal();
  const [{ isPending }] = usePayPalScriptReducer();

  // Use explicit types instead of 'any'
  const createOrder = (
    _data: Record<string, unknown>,
    actions: PayPalCreateOrderActions
  ): Promise<string> => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: total.toFixed(2),
          },
        },
      ],
    });
  };

  const handleApprove = (
    _data: Record<string, unknown>,
    actions: PayPalApproveActions
  ) => {
    setIsPaymentProcessing(true);
    setPaymentError(null);
    return actions.order.capture().then((details: unknown) => {
      console.log('Payment completed:', details);
      setPaymentSuccess(true);
      setIsPaymentProcessing(false);
      onSuccess?.(details);
    });
  };

  const handleError = (err: unknown) => {
    console.error('PayPal payment error:', err);
    setPaymentError('Payment failed. Please try again.');
    setIsPaymentProcessing(false);
    onError?.(err);
  };

  const handleCancel = () => {
    console.log('Payment cancelled');
    setIsPaymentProcessing(false);
    onCancel?.();
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PayPalButtons
        style={PAYPAL_BUTTON_STYLES}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createOrder={(_data: any, actions: any) => createOrder(_data, actions)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onApprove={(_data: any, actions: any) => handleApprove(_data, actions)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError={handleError}
        onCancel={handleCancel}
        disabled={isPending}
      />
    </div>
  );
};

export default PayPalPayment;
