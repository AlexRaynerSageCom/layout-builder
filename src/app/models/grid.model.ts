import { AxisModel, getInitialAxis } from './axis.model';
import { AxisGapModel, getInitialAxisGap } from './axis-gap.model';
import { GridItemModel } from './grid-item.model';

export interface GridModel {
  columns: AxisModel[];
  rows: AxisModel[];
  columnGap: AxisGapModel;
  rowGap: AxisGapModel;
  items: GridItemModel[];
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
    columnGap: getInitialAxisGap(),
    rowGap: getInitialAxisGap(),
    items: []
  };
};
