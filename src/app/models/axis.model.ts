export interface AxisModel {
  size: string;
  unit: string;
}

export const getInitialAxis = (): AxisModel => {
  return { size: '1', unit: 'fr' };
};
