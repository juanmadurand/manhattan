const THRESHOLDS = [
  {
    name: 'good',
    label: 'ok',
    air: 0,
    description: 'Satisfactory air quality with minimal pollution risk.',
  },
  {
    name: 'moderate',
    label: 'moderate',
    air: 50,
    description: 'Acceptable air quality, slight risk for sensitive individuals.',
  },
  {
    name: 'unhealthy-sensitive',
    label: 'unhealthy for sensitive groups',
    air: 100,
    description: 'Potential health effects for sensitive groups.',
  },
  {
    name: 'unhealthy',
    label: 'unhealthy',
    air: 150,
    description: 'Some may experience health effects, especially sensitive groups.',
  },
  {
    name: 'very-unhealthy',
    label: 'awful',
    air: 200,
    description: 'Health alert: Increased risk of health effects for everyone.',
  },
  {
    name: 'hazardous',
    label: 'worst',
    air: 300,
    description: 'Emergency health warning: High risk for everyone.',
  },
];

export const INACTIVE = {
  name: 'inactive',
  label: 'The air quality monitor is not reporting data',
};

export const CACHETTL = {
  air: 60,
  cruise: 300,
  bike: 120,
  ferry: 300,
  weather: 300,
};

export const NAV_TICKS_ZOOM = [
  [0, 12.5, 25],
  [0, 25, 37.5, 50],
  [0, 25, 37.5, 50, 75],
];

export default THRESHOLDS;
