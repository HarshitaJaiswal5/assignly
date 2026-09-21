export interface GigFilters {
  search: string;
  subject: string;
  radius: number;
  college: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface GigFiltersProps {
  filters: GigFilters;
  onChange: (filters: GigFilters) => void;
  onCurrentLocation: () => void;
  isGettingLocation?: boolean;
}