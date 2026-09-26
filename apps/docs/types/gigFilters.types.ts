import { Location } from '@/types/location.types'; 

export interface GigFilters {
  search: string;
  subject: string;
  radius: number;
  college: string;
  address: string;
  coordinates: Location.Coordinates | null;
  startDate: string | null;
  endDate: string | null;
}


export interface GigFiltersProps {
  filters: GigFilters;
  onChange: (filters: GigFilters) => void;
  isGettingLocation?: boolean;
}