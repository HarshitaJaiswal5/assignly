import axios from "axios";
import { env } from "@config/env.js";

const geoapify = axios.create({
  baseURL: env.GEOAPIFY_BASE_URL,
  params: {
    apiKey: env.GEOAPIFY_API_KEY,
  },
});

export const autocompleteLocation = async (
  text: string,
  limit = 5,
) => {
  const response = await geoapify.get("/autocomplete", {
    params: {
      text,
      limit,
      filter: "countrycode:in",
    },
  });

  return response.data;
};

export const reverseGeocode = async (
  lat: number,
  lon: number,
) => {
  console.log(env.GEOAPIFY_BASE_URL);
  const response = await geoapify.get("/reverse", {
    params: {
      lat,
      lon,
    },
  });

  return response.data;
};