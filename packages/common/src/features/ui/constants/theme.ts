export enum Breakpoints {
  xs = 375,
  sm = 576,
  md = 768,
  lg = 960,
  xl = 1200,
  xxl = 1400,
  xxxl = 1600,
}

export const hoverMedia = (): string =>
  '@media (hover: hover) and (pointer: fine)';

export const media = {
  breakpoints: Breakpoints,
  up: (value: keyof typeof Breakpoints | number): string => {
    const breakpoint = typeof value === 'number' ? value : Breakpoints[value];

    return `@media screen and (min-width: ${breakpoint}px)`;
  },
  down: (value: keyof typeof Breakpoints | number): string => {
    const breakpoint = typeof value === 'number' ? value : Breakpoints[value];

    return `@media screen and (max-width: ${breakpoint}px)`;
  },
};
