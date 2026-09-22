export namespace Location {
  export interface Coordinates {
    latitude: number;
    longitude: number;
  }

  export interface UserLocation extends Coordinates {
    address: string;
  }

  export interface SuggestionsResponse {
    success: boolean;
    data: UserLocation[];
  }

  export interface ReverseGeocodeRequest extends Coordinates {}

  export interface ReverseGeocodeResponse {
    success: boolean;
    data: UserLocation;
  }
}