export type Box = { x: number; h: number; y: number; w: number };

export type Point = {
  x: number;
  y: number;
};

export type Options = {
  strengthMultiplier: number;
  onScrollChange: (left: number, top: number) => void;
  verticalStrength: (box: Box, coords: Point) => number;
  horizontalStrength: (box: Box, coords: Point) => number;
};
