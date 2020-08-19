export interface GridItemModel {
  generated: boolean;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

export const getGridItem = (rowStart, colStart, generated = true, rowEnd?, colEnd?): GridItemModel => {
  return {
    generated,
    columnStart: colStart,
    columnEnd: colEnd ?? colStart + 1,
    rowStart,
    rowEnd: rowEnd ?? rowStart + 1
  };
};
