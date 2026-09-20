'use client';

import { MapPin, Navigation, Search, SlidersHorizontal } from 'lucide-react';

import type { GigFiltersProps } from '@/types/gigFilters.types';

const subjects = [
  'All subjects',
  'DSA',
  'Web Development',
  'Java',
  'Python',
  'Database',
];

const radiusOptions = [
  { label: '1 km', value: 1 },
  { label: '2 km', value: 2 },
  { label: '5 km', value: 5 },
  { label: '10 km', value: 10 },
  { label: '25 km', value: 25 },
];

export function GigFilters({
  filters,
  onChange,
  onCurrentLocation,
  isGettingLocation = false,
}: GigFiltersProps) {
  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <section className='mb-6 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'>
      {/* Search */}
      <div className='flex items-center gap-2 w-full'>
        {/* Search */}
        <div className='relative flex-1 min-w-[180px]'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder='Search gigs...'
            className='h-10 w-full rounded-md border pl-9 pr-3 text-sm'
          />
        </div>

        {/* Subject */}
        <select
          value={filters.subject}
          onChange={(e) => updateFilter('subject', e.target.value)}
          className='h-10 rounded-md border px-3 text-sm'
        >
          <option>All subjects</option>
          <option>DSA</option>
          <option>Web Development</option>
          <option>Java</option>
          <option>Python</option>
          <option>Database</option>
        </select>

        {/* Radius */}
        <select
          value={filters.radius}
          onChange={(e) => updateFilter('radius', Number(e.target.value))}
          className='h-10 rounded-md border px-3 text-sm'
        >
          <option value={1}>1 km</option>
          <option value={2}>2 km</option>
          <option value={5}>5 km</option>
          <option value={10}>10 km</option>
          <option value={25}>25 km</option>
        </select>

        {/* College */}
        <input
          value={filters.college}
          onChange={(e) => updateFilter('college', e.target.value)}
          placeholder='College'
          className='h-10 w-36 rounded-md border px-3 text-sm'
        />

        {/* Location */}
        <div className='relative w-48'>
          <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            placeholder='Location'
            className='h-10 w-full rounded-md border pl-9 pr-10 text-sm'
          />

          <button
            type='button'
            onClick={onCurrentLocation}
            disabled={isGettingLocation}
            className='absolute right-1 top-1/2 -translate-y-1/2 rounded p-2 hover:bg-muted'
            title='Use current location'
          >
            <Navigation className='h-4 w-4' />
          </button>
        </div>
      </div>
    </section>
  );
}
