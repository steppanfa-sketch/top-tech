import {
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Code2,
  Compass,
  Cpu,
  Globe,
  Headphones,
  Headset,
  Layers,
  LayoutDashboard,
  Lightbulb,
  MessagesSquare,
  PenTool,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

function normalizeIconKey(name?: string): string {
  if (!name) return '';
  return name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function DynamicIcon({ name, className = 'w-5 h-5' }: DynamicIconProps) {
  switch (normalizeIconKey(name)) {
    case 'globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'shopping-bag':
      return <ShoppingBag className={className} aria-hidden="true" />;
    case 'layout-dashboard':
      return <LayoutDashboard className={className} aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone className={className} aria-hidden="true" />;
    case 'pen-tool':
      return <PenTool className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'brain-circuit':
      return <BrainCircuit className={className} aria-hidden="true" />;
    case 'lightbulb':
      return <Lightbulb className={className} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'shield-check':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={className} aria-hidden="true" />;
    case 'users':
      return <Users className={className} aria-hidden="true" />;
    case 'headphones':
      return <Headphones className={className} aria-hidden="true" />;
    case 'headset':
      return <Headset className={className} aria-hidden="true" />;
    case 'messages-square':
      return <MessagesSquare className={className} aria-hidden="true" />;
    case 'target':
      return <Target className={className} aria-hidden="true" />;
    case 'trending-up':
      return <TrendingUp className={className} aria-hidden="true" />;
    case 'award':
      return <Award className={className} aria-hidden="true" />;
    case 'book-open':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'briefcase':
      return <Briefcase className={className} aria-hidden="true" />;
    case 'code-2':
    case 'code2':
      return <Code2 className={className} aria-hidden="true" />;
    case 'zap':
      return <Zap className={className} aria-hidden="true" />;
    case 'layers':
    default:
      return <Layers className={className} aria-hidden="true" />;
  }
}
