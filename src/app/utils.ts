
export const SIZE_XS = 'xs';
export const SIZE_MD = 'md';
export const SIZE_SM = 'sm';
export const SIZE_LG = 'lg';

export let screenSize: string;

if (window.innerWidth < 768) {
  screenSize = SIZE_XS;
} else if (window.innerWidth < 992) {
  screenSize = SIZE_SM;
} else if (window.innerWidth < 1200) {
  screenSize = SIZE_MD;
} else {
  screenSize = SIZE_LG;
}
