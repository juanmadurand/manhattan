// TBD
export function getCruisePoints() {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.014229, 40.683355],
        },
        properties: {
          cruise_state: 'off',
          cruise_message:
            'MSC Meraviglia is docked at the Brooklyn Cruise Terminal. It has capacity for 5000 guests and 1536 crew members. It is NOT capable to connect to shore power.',
        },
      },
    ],
  };
}
