import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

import stops from './stops.json';
import { format } from 'timeago.js';
import { wrap } from '@/services/cache';

const getTimePassed = tsStr => {
  if (!tsStr) {
    return null;
  }
  const dateUtc = new Date(parseInt(tsStr) * 1000);

  return format(dateUtc, 'en_US');
};

async function _getTrips() {
  try {
    const response = await fetch(
      'http://nycferry.connexionz.net/rtt/public/utility/gtfsrealtime.aspx/tripupdate'
    ).catch(err => {
      console.error('fetching ferry API', err);
      return null;
    });

    if (!response) {
      return null;
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    // return feed.toJSON();
    return feed
      .toJSON()
      .entity.map(entity => {
        if (entity?.tripUpdate && entity.tripUpdate.stopTimeUpdate.length > 0) {
          const stopId = parseInt(entity.tripUpdate.stopTimeUpdate[0].stopId);
          const stopData = stops.find(stop => stop.stop_id === stopId) || {};
          return {
            tripId: entity.tripUpdate.trip.tripId,
            stops: entity.tripUpdate.stopTimeUpdate.map(st => ({
              arrival: getTimePassed(st.arrival?.time),
              departure: getTimePassed(st.departure?.time),
            })),
            vehicle: entity.tripUpdate.vehicle,

            ...stopData,
          };
        }
        return [];
      })
      .flat();
  } catch (err) {
    console.error('parsing ferry API', err);
    return {};
  }
}

export function getTrips() {
  return wrap('ferrystops', 120, _getTrips);
}
