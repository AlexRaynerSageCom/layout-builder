export const GapUnits = ['%', 'px', 'em'];
type GapUnitTypeTuple = typeof GapUnits;
export type GapUnitType = GapUnitTypeTuple[number];

export interface AxisGapModel {
  size: number;
  unit: GapUnitType;
}

export const getInitialAxisGap = (): AxisGapModel => {
  return { size: 1, unit: 'px' };
};
