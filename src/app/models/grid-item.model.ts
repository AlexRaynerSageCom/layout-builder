export interface GridItemModel {
  generated: boolean;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

export const getGridItem = (rowStart, colStart, generated = true): GridItemModel => {
  return {
    generated,
    columnStart: colStart,
    columnEnd: colStart + 1,
    rowStart,
    rowEnd: rowStart + 1
  };
};
