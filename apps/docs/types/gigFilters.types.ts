import { Location } from '@/types/location.types'; 

export interface GigFilters {
  search: string;
  subject: string;
  radius: number;
  college: string;
  address: string;
  coordinates: Location.Coordinates | null;
  startDate: Date | null;
  endDate: Date | null;
}


export interface GigFiltersProps {
  filters: GigFilters;
  onChange: (filters: GigFilters) => void;
  onCurrentLocation: () => void;
  isGettingLocation?: boolean;
}