/* SVG icons reproduced from the original site. All accept a color via `color` (currentColor). */
import type { CSSProperties, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "strokeWidth"> & { strokeWidth?: number; style?: CSSProperties };

/** Small diagonal arrow used inside buttons (8.5 x 9.03 viewBox, stretched to its box). */
export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 8.5 9.031" preserveAspectRatio="none" overflow="visible" fill="none" stroke="currentColor" {...props}>
      <path d="M 0 8.5 L 8.5 0" />
      <path d="M 0 0 L 8.5 0 L 8.5 9.031" />
    </svg>
  );
}

/** Right arrow (Framer "Arrow Right" icon) used by text links. */
export function ArrowRight({ strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M 0 7 L 18 7 M 18 7 L 11 0 M 18 7 L 11 14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 5)"
      />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" {...props}>
      <path d="M 12.96 13.96 L 16.96 17.96 L 20.96 13.96" stroke="currentColor" strokeMiterlimit={10} />
    </svg>
  );
}

export function QuoteMark(props: IconProps) {
  return (
    <svg viewBox="0 0 64 59" preserveAspectRatio="none" {...props}>
      <path
        d="M 36.571 19.932 L 56.196 0 L 62.661 6.566 L 45.714 23.78 L 45.714 26.5 L 64 26.5 L 64 59 L 36.571 59 Z M 27.429 26.498 L 9.143 26.498 L 9.143 23.778 L 26.09 6.567 L 19.625 0 L 0 19.932 L 0 59 L 27.429 59 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 16 15" {...props}>
      <path
        d="M 7.049 0.927 C 7.349 0.006 8.652 0.006 8.951 0.927 L 10.021 4.219 C 10.155 4.63 10.538 4.909 10.971 4.909 L 14.433 4.909 C 15.402 4.909 15.804 6.149 15.021 6.719 L 12.221 8.753 C 11.87 9.007 11.723 9.459 11.857 9.871 L 12.927 13.163 C 13.227 14.084 12.172 14.851 11.388 14.281 L 8.588 12.247 C 8.237 11.992 7.763 11.992 7.412 12.247 L 4.612 14.281 C 3.828 14.851 2.774 14.084 3.073 13.163 L 4.143 9.871 C 4.277 9.459 4.13 9.008 3.78 8.753 L 0.98 6.72 C 0.196 6.15 0.598 4.91 1.567 4.91 L 5.028 4.91 C 5.461 4.91 5.845 4.632 5.979 4.22 L 7.05 0.927 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---- Line icons (24x24, stroke) ---------------------------------------- */
function LineIcon({ d, transform, strokeWidth = 1, ...props }: IconProps & { d: string; transform: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={transform}
      />
    </svg>
  );
}

export const MailIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(3 5)"
    d="M 17.5 0.5 L 9 8 L 0.5 0.5 M 1 14 L 17 14 C 17.552 14 18 13.552 18 13 L 18 1 C 18 0.448 17.552 0 17 0 L 1 0 C 0.448 0 0 0.448 0 1 L 0 13 C 0 13.552 0.448 14 1 14 Z"
  />
);

export const PhoneIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(2 2)"
    d="M 1.511 0 L 5.15 0.132 C 5.917 0.159 6.597 0.643 6.891 1.37 L 7.967 4.032 C 8.217 4.652 8.15 5.358 7.787 5.916 L 6.408 8.037 C 7.225 9.21 9.445 11.956 11.795 13.563 L 13.548 12.485 C 13.994 12.21 14.527 12.129 15.031 12.258 L 18.516 13.152 C 19.443 13.389 20.067 14.278 19.994 15.255 L 19.77 18.238 C 19.692 19.285 18.835 20.107 17.818 19.989 C 4.392 18.428 -3.481 0 1.511 0 Z"
  />
);

/* Feature icons ("Values" grid on the home page) */
export const BadgeCheckIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(0 0)"
    d="M 9 12 L 11 14 L 13 12 L 15 10 M 7.946 4.249 L 6.252 4.237 C 5.136 4.228 4.229 5.135 4.237 6.252 L 4.25 7.946 C 4.254 8.487 4.039 9.006 3.653 9.386 L 2.446 10.575 C 1.651 11.358 1.651 12.641 2.446 13.425 L 3.653 14.614 C 4.039 14.993 4.254 15.513 4.25 16.053 L 4.237 17.748 C 4.229 18.864 5.136 19.771 6.252 19.763 L 7.946 19.75 C 8.487 19.746 9.007 19.961 9.386 20.346 L 10.575 21.554 C 11.359 22.349 12.641 22.349 13.425 21.554 L 14.614 20.346 C 14.993 19.961 15.513 19.746 16.054 19.75 L 17.748 19.763 C 18.864 19.771 19.771 18.864 19.763 17.748 L 19.75 16.053 C 19.746 15.513 19.961 14.993 20.347 14.614 L 21.554 13.425 C 22.349 12.641 22.349 11.358 21.554 10.575 L 20.347 9.386 C 19.961 9.006 19.746 8.487 19.75 7.946 L 19.763 6.252 C 19.771 5.135 18.864 4.228 17.748 4.237 L 16.054 4.249 C 15.513 4.254 14.993 4.038 14.614 3.653 L 13.425 2.446 C 12.641 1.651 11.359 1.651 10.575 2.446 L 9.386 3.653 C 9.007 4.038 8.487 4.254 7.946 4.249 Z"
  />
);

export const UsersIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(2 3)"
    d="M 0 18 L 0 14 C 0 12.895 0.895 12 2 12 L 12 12 C 13.105 12 14 12.895 14 14 L 14 18 M 14 0 C 14.86 0.22 15.623 0.721 16.168 1.422 C 16.712 2.124 17.008 2.987 17.008 3.875 C 17.008 4.763 16.712 5.626 16.168 6.328 C 15.623 7.029 14.86 7.53 14 7.75 M 17 12 L 18 12 C 19.105 12 20 12.895 20 14 L 20 18 M 11 4 C 11 6.209 9.209 8 7 8 C 4.791 8 3 6.209 3 4 C 3 1.791 4.791 0 7 0 C 9.209 0 11 1.791 11 4 Z"
  />
);

export const TargetIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(2 2)"
    d="M 20 10 C 20 15.523 15.523 20 10 20 C 4.477 20 0 15.523 0 10 C 0 4.477 4.477 0 10 0 M 14 6 L 14 3 L 17 0 L 18.125 1.875 L 20 3 L 17 6 Z M 14 6 L 10 10 M 15 10 C 15 12.761 12.761 15 10 15 C 7.239 15 5 12.761 5 10 C 5 7.239 7.239 5 10 5"
  />
);

export const ScrollIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(2 3)"
    d="M 18 13.722 L 18 3 C 18 1.343 16.657 0 15 0 L 2 0 M 2 0 C 3.105 0 4 0.895 4 2 L 4 3.5 L 0 3.5 L 0 2 C 0 0.895 0.895 0 2 0 Z M 18 18 L 8 18 M 18 18 C 19.105 18 20 17.105 20 16 L 20 14 L 8 14 L 8 16 C 8 17.105 7.105 18 6 18 M 18 18 L 6 18 M 6 18 C 4.895 18 4 17.105 4 16 L 4 3 M 8 5 L 14 5 M 8 9 L 14 9"
  />
);

export const MegaphoneIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(2 2)"
    d="M 5.5 6 L 9.5 20 M 16.638 1.379 L 19.935 13.658 C 20.293 14.993 19.119 16.238 17.762 15.961 L 15.041 15.405 C 12.014 14.787 8.884 14.881 5.899 15.679 C 3.401 16.347 0.83 14.86 0.161 12.366 C -0.509 9.873 0.972 7.302 3.471 6.634 C 6.456 5.835 9.213 4.354 11.525 2.308 L 13.603 0.469 C 14.639 -0.448 16.28 0.044 16.638 1.379 Z"
  />
);

export const ChatIcon = (p: IconProps) => (
  <LineIcon
    {...p}
    transform="translate(2 2)"
    d="M 5 7 L 15 7 M 5 11 L 9 11 M 20 10 C 20 15.523 15.523 20 10 20 L 1.103 20 C 0.673 20 0.444 19.494 0.727 19.171 L 2.738 16.875 C 1.041 15.083 0 12.663 0 10 C 0 4.477 4.477 0 10 0 C 15.523 0 20 4.477 20 10 Z"
  />
);

/* ---- Social (Phosphor regular, 256 viewBox) ------------------------------ */
export const LinkedInIcon = (p: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...p}>
    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...p}>
    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...p}>
    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...p}>
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
  </svg>
);

export const TikTokIcon = (p: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...p}>
    <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z" />
  </svg>
);

/** Icon per social network key used in content (site.social[].icon). */
export const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  x: XIcon,
};

/** Chevron centred in its box, so it can rotate in place (accordion toggles). */
export const ChevronCentered = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 9.5 12 15.5 18 9.5" transform="translate(0 -0.5)" />
  </svg>
);
