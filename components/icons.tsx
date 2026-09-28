// Stroke icons copied from the design files.
import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, strokeWidth = 2, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (p: IconProps) => (
  <Icon strokeWidth={2.5} {...p}><path d="M20 6 9 17l-5-5" /></Icon>
);
export const SendIcon = (p: IconProps) => (
  <Icon strokeWidth={2.4} {...p}><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></Icon>
);
export const HandoffIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M17 11l2 2 4-4" /></Icon>
);
export const PlusCircleIcon = (p: IconProps) => (
  <Icon strokeWidth={2.2} {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></Icon>
);
export const BoltIcon = (p: IconProps) => (
  <Icon strokeWidth={2.4} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></Icon>
);
export const CalculatorIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M8 6h8" /><path d="M8 11h.01" /><path d="M12 11h.01" /><path d="M16 11h.01" />
    <path d="M8 15h.01" /><path d="M12 15h.01" /><path d="M16 15h.01" /><path d="M8 18.5h8" />
  </Icon>
);
export const MenuIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Icon>
);
export const CloseIcon = (p: IconProps) => (
  <Icon {...p}><path d="M6 6l12 12" /><path d="M18 6 6 18" /></Icon>
);
export const ChevronIcon = (p: IconProps) => (
  <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>
);
export function ArrowIcon(p: IconProps) {
  return (
    <svg width={40} height={24} viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M2 12h34" /><path d="M28 4l8 8-8 8" />
    </svg>
  );
}

// Feature card icons, in the order of dictionary.features.items.
export const FEATURE_ICONS = [
  <Icon key="agent" size={26}><rect x="4" y="7" width="16" height="12" rx="3" /><path d="M12 3v4" /><circle cx="9" cy="13" r="1.2" /><circle cx="15" cy="13" r="1.2" /></Icon>,
  <Icon key="campaign" size={26}><path d="M3 11l16-7v16L3 13z" /><path d="M7 13v5a2 2 0 0 0 4 0v-3" /></Icon>,
  <Icon key="funnel" size={26}><path d="M3 4h18l-7 8v6l-4 2v-8z" /></Icon>,
  <Icon key="voice" size={26}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></Icon>,
  <Icon key="handoff" size={26}><circle cx="8" cy="8" r="3" /><circle cx="17" cy="15" r="3" /><path d="M10.5 10.5l4 2.5" /><path d="M3 21a5 5 0 0 1 10 0" /></Icon>,
  <Icon key="usage" size={26}><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></Icon>,
];
