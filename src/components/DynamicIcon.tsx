import {
  BrainCircuit,
  Compass,
  Cpu,
  Globe,
  Headphones,
  Layers,
  LayoutDashboard,
  Lightbulb,
  PenTool,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className = 'w-5 h-5' }: DynamicIconProps) {
  switch (name) {
    case 'Globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} aria-hidden="true" />;
    case 'LayoutDashboard':
      return <LayoutDashboard className={className} aria-hidden="true" />;
    case 'Smartphone':
      return <Smartphone className={className} aria-hidden="true" />;
    case 'PenTool':
      return <PenTool className={className} aria-hidden="true" />;
    case 'Compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'BrainCircuit':
      return <BrainCircuit className={className} aria-hidden="true" />;
    case 'Lightbulb':
      return <Lightbulb className={className} aria-hidden="true" />;
    case 'Sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'Cpu':
      return <Cpu className={className} aria-hidden="true" />;
    case 'Users':
      return <Users className={className} aria-hidden="true" />;
    case 'Headphones':
      return <Headphones className={className} aria-hidden="true" />;
    default:
      return <Layers className={className} aria-hidden="true" />;
  }
}
