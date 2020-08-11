export interface GridModel {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
}

export const getInitialGrid = (): GridModel => {
  return {
    columns: 2,
    rows: 2,
    columnGap: 10,
    rowGap: 10
  };
};
