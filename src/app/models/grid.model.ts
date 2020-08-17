import { AxisModel, getInitialAxis } from './axis.model';
import { AxisGapModel, getInitialAxisGap } from './axis-gap.model';
import { GridItemModel, getGridItem } from './grid-item.model';

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
      getGridItem(1, 1),
      getGridItem(1, 2),
      getGridItem(1, 3),
      getGridItem(1, 4),
      getGridItem(2, 1),
      getGridItem(2, 2),
      getGridItem(2, 3),
      getGridItem(2, 4),
      getGridItem(3, 1),
      getGridItem(3, 2),
      getGridItem(3, 3),
      getGridItem(3, 4),
      getGridItem(4, 1),
      getGridItem(4, 2),
      getGridItem(4, 3),
      getGridItem(4, 4),
    ]
  };
};
