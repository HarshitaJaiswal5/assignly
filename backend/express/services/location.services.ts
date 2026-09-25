import axios from 'axios';
import { env } from '@config/env.js';

const geoapify = axios.create({
  baseURL: env.GEOAPIFY_BASE_URL,
  params: {
    apiKey: env.GEOAPIFY_API_KEY,
  },
});

export const autocompleteLocation = async (query: string) => {
  const response = await geoapify.get('/autocomplete', {
    params: {
      text: query,
      filter: 'countrycode:in',
    },
  });

  return response.data.features.map((feature: any) => ({
    name: feature.properties.name,
    address: feature.properties.formatted,
    latitude: feature.properties.lat,
    longitude: feature.properties.lon,
  }));
};

export const reverseGeocode = async (lat: number, lon: number) => {
  const response = await geoapify.get('/reverse', {
    params: {
      lat,
      lon,
    },
  });

  const feature = response.data.features[0];
  if (!feature) {
    throw new Error('Location not found');
  }

  return {
    address: feature.properties.formatted,
    latitude: feature.properties.lat,
    longitude: feature.properties.lon,
  };
};
