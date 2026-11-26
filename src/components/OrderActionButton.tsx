import { ArrowUpRight, ShoppingCart } from 'lucide-react';
import type { ServiceItem } from '../types/content';
import { interfaceCopy } from '../lib/cms';
import { isValidExternalUrl } from '../lib/assets';
import { useOrder } from '../context/OrderContext';
import { MagneticButton } from './effects/MagneticButton';

interface OrderActionButtonProps {
  service: ServiceItem;
  className?: string;
}

export function OrderActionButton({ service, className = '' }: OrderActionButtonProps) {
  const { openFallbackOrder } = useOrder();
  const hasOrderingUrl = service.available && isValidExternalUrl(service.orderingUrl);
  const label = service.buttonText?.trim() || interfaceCopy.ordering.defaultOrderButtonLabel;

  if (hasOrderingUrl) {
    return (
      <MagneticButton className={className.includes('w-full') ? 'w-full' : ''}>
        <a
          href={service.orderingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
        >
          <span>{label}</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton className={className.includes('w-full') ? 'w-full' : ''}>
      <button
        type="button"
        onClick={() => openFallbackOrder(service)}
        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      >
        <ShoppingCart className="w-4 h-4" aria-hidden="true" />
        <span>{service.available ? label : interfaceCopy.ordering.unavailableButtonLabel}</span>
      </button>
    </MagneticButton>
  );
}
