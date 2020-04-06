import sizes from './sizes';

export const isMobile = () => {
  return window.matchMedia(`(max-width: ${sizes.sm}px)`).matches;
};

export const isTablet = () => {
  return !isMobile() && window.matchMedia(`(max-width: ${sizes.md}px)`).matches;
};

export const isDesktop = () => {
  return !isMobile() && !isTablet();
};
