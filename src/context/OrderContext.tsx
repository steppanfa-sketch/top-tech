import React, { createContext, useContext, useState } from 'react';
import type { ServiceItem } from '../types/content';

interface OrderContextValue {
  fallbackService: ServiceItem | null;
  openFallbackOrder: (service: ServiceItem) => void;
  closeFallbackOrder: () => void;
  preselectedService: string;
  setPreselectedService: (serviceName: string) => void;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [fallbackService, setFallbackService] = useState<ServiceItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');

  const openFallbackOrder = (service: ServiceItem) => {
    setFallbackService(service);
  };

  const closeFallbackOrder = () => {
    setFallbackService(null);
  };

  return (
    <OrderContext.Provider
      value={{
        fallbackService,
        openFallbackOrder,
        closeFallbackOrder,
        preselectedService,
        setPreselectedService,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return ctx;
}
