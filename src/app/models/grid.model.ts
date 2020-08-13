import { AxisModel, getInitialAxis } from './axis.model';

export interface GridModel {
  columns: AxisModel[];
  rows: AxisModel[];
  columnGap: number;
  rowGap: number;
  fillGrid: boolean;
}

export const getInitialGrid = (): GridModel => {
  return {
    columns: [
      getInitialAxis(),
      getInitialAxis(),
      getInitialAxis(),
      getInitialAxis()
    ],
    rows: [
      getInitialAxis(),
      getInitialAxis(),
      getInitialAxis(),
      getInitialAxis()
    ],
    columnGap: 10,
    rowGap: 10,
    fillGrid: true
  };
};
