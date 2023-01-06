// GEO Location API
export const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_GEO_LOCATION_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_GEO_LOCATION_API_HOST,
  },
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
// Weather API
