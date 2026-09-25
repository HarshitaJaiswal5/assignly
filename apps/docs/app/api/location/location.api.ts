import { Location } from '@/types/location.types';
import { apiClient } from '@/lib/api/ApiClient';

export class LocationApiService {
  public async getSuggestions(
    query: string
  ): Promise<Location.UserLocation[]> {
    const response =
      await apiClient.get<Location.SuggestionsResponse>(
        '/geolocation/suggestions',
        {
          params: {
            text: query,
          },
        }
      );
    return response.data;
  }

  public async reverseGeocode(
    coordinates: Location.ReverseGeocodeRequest
  ): Promise<Location.UserLocation> {
    const response =
      await apiClient.get<Location.ReverseGeocodeResponse>(
        '/geolocation/address',
        {
          params: {
            lat: coordinates.latitude,
            lon: coordinates.longitude
          }
        }
        
      );
    return response.data;
  }
}

export const locationApiService = new LocationApiService();