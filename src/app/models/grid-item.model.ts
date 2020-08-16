export interface GridItemModel {
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

export const getInitialGridItem = (): GridItemModel => {
  return {
    columnStart: 1,
    columnEnd: 1,
    rowStart: 1,
    rowEnd: 1
  };
};
