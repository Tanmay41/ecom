export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'client-id',
  currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'AUD',
  intent: process.env.NEXT_PUBLIC_PAYPAL_INTENT || 'capture',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
};

export const PAYPAL_BUTTON_STYLES = {
  layout: 'vertical' as const,
  color: 'black' as const,
  shape: 'rect' as const,
  label: 'pay' as const,
  height: 45,
};
