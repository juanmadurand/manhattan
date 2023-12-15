# Manhattan

This project shows a responsive map with air pollution indicators, weather and ferry stops.

## Run locally

In order to run it locally, you should get api keys from these providers:

- [Weather](https://www.weatherapi.com/)
- [Mapbox](https://docs.mapbox.com/)
- [PurpleAir](https://develop.purpleair.com/keys)

Once you have those keys, fill an `.env` file. You can run:

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
