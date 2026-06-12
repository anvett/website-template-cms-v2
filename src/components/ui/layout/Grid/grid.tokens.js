export const gridGaps = {
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
};

export const gridAlignments = {
  start: "start",
  center: "center",
  end: "end",
  stretch: "stretch",
};

export const gridJustify = {
  start: "start",
  center: "center",
  end: "end",
  stretch: "stretch",
};

export function resolveGridCols(cols) {
  if (typeof cols !== "number" || cols < 1 || cols > 12) {
    return 1;
  }

  return cols;
}

export function resolveGridSpan(span) {
  if (typeof span !== "number" || span < 1 || span > 12) {
    return 1;
  }

  return span;
}