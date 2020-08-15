export const Units = ['fr', '%', 'px', 'em', 'auto', 'min-content', 'max-content', 'minmax'];
type UnitTypeTuple = typeof Units;
export type UnitType = UnitTypeTuple[number];

export interface AxisModel {
  size?: string;
  unit: UnitType;
}

export const getInitialAxis = (): AxisModel => {
  return { size: '1', unit: 'fr' };
};
