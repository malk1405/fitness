import sizes from './sizes';

export const matches = (size) => {
  if (size === Infinity) return true;

  return window.matchMedia(`(max-width: ${size}px)`).matches;
};

export const isMobile = () => {
  return matches(sizes.sm);
};

export const isTablet = () => {
  return !isMobile() && matches(sizes.md);
};

export const isDesktop = () => {
  return !isMobile() && !isTablet();
};
