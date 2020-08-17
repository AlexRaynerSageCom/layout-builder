import { AxisModel, getInitialAxis } from './axis.model';
import { AxisGapModel, getInitialAxisGap } from './axis-gap.model';
import { GridItemModel, getInitialGridItem } from './grid-item.model';

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
    items: [
      getInitialGridItem(1, 1),
      getInitialGridItem(1, 2),
      getInitialGridItem(1, 3),
      getInitialGridItem(1, 4),
      getInitialGridItem(2, 1),
      getInitialGridItem(2, 2),
      getInitialGridItem(2, 3),
      getInitialGridItem(2, 4),
      getInitialGridItem(3, 1),
      getInitialGridItem(3, 2),
      getInitialGridItem(3, 3),
      getInitialGridItem(3, 4),
      getInitialGridItem(4, 1),
      getInitialGridItem(4, 2),
      getInitialGridItem(4, 3),
      getInitialGridItem(4, 4),
    ]
  };
};
