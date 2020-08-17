export interface GridItemModel {
  generated: boolean;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

export const getInitialGridItem = (rowStart, colStart): GridItemModel => {
  return {
    generated: true,
    columnStart: colStart,
    columnEnd: colStart + 1,
    rowStart,
    rowEnd: rowStart + 1
  };
};
