import { Location } from '@/types/location.types';

export class LocationService {
  public getCurrentCoordinates(): Promise<Location.Coordinates> {
    if (!navigator.geolocation) {
      return Promise.reject(
        new Error('Geolocation is not supported by this browser')
      );
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          reject(this.getLocationError(error));
        },
        {
          enableHighAccuracy: true,
          timeout: 10_000,
          maximumAge: 5 * 60 * 1000,
        }
      );
    });
  }

  private getLocationError(error: GeolocationPositionError): Error {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return new Error('Location permission denied');

      case error.POSITION_UNAVAILABLE:
        return new Error('Location unavailable');

      case error.TIMEOUT:
        return new Error('Location request timed out');

      default:
        return new Error('Unable to get location');
    }
  }
}

export const locationService = new LocationService();