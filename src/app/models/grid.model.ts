import { AxisModel } from './axis.model';

export interface GridModel {
  columns: AxisModel[];
  rows: AxisModel[];
  columnGap: number;
  rowGap: number;
  fillGrid: boolean;
}

export const getInitialGrid = (): GridModel => {
  return {
    columns: [{ size: '1', unit: 'fr' }, { size: '1', unit: 'fr' }],
    rows: [{ size: '1', unit: 'fr' }, { size: '1', unit: 'fr' }],
    columnGap: 10,
    rowGap: 10,
    fillGrid: true
  };
};
