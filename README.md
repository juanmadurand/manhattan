# Manhattan

This project shows a responsive map with air quality indicators, weather and ferry stops.

See it online: [https://manhattan.jmdurand.dev/](https://manhattan.jmdurand.dev/)

Part of it was made as an interview exercise, which I really liked, so I developed it for a city I love :)

It is not available worldwide, since we rely on local APIs:

- Bike service: [citibikenyc](https://citibikenyc.com/system-data)
- Ferry service: [ferrynyc](https://www.ferry.nyc/developer-tools/)

## Get API Keys

- [Mapbox](https://docs.mapbox.com/): to show the map
- [Weather](https://www.weatherapi.com/): to get humidity, temperature, precipitation, etc.
- [PurpleAir](https://develop.purpleair.com/keys): to get air quality

## Run locally

Once you have the api keys, fill the `.env` file. You can run:

```bash
# creates env file
cp .env.example .env

# start redis locally
docker-compose up
```

And finally, after installing dependencies, start the app in development mode:

```bash
npm run dev
```
