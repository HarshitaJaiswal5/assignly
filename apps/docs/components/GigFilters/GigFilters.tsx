'use client';

import {
  Calendar,
  ChevronDown,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GigFiltersProps } from '@/types/gigFilters.types';
import { locationService } from '../../services/locationService';
import { locationApiService } from '@/app/api/location/location.api';
import {
  reverseGeocodeMutation,
  useLocationSuggestions,
} from '../../hooks/location/useLocationSuggestions';

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

const DEFAULT_COORDS = {
  latitude: 22.7196,
  longitude: 75.8577,
};

/* =========================================================
   THEME  (orange #F04E23 · peach #FFF3EA · peach border #F9D5C6)
========================================================= */

const fieldClass =
  'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#F04E23]/60 focus:ring-2 focus:ring-[#FDE8DF]';
const selectClass = `${fieldClass} appearance-none pr-9`;
const labelClass = 'mb-1.5 block text-xs font-medium text-gray-500';

const toolbarBtnBase =
  'flex h-11 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm transition';
const toolbarBtnIdle =
  'border-gray-200 bg-white text-gray-700 hover:border-[#F9D5C6] hover:bg-[#FFF3EA] hover:text-[#F04E23]';
const toolbarBtnActive = 'border-[#F9D5C6] bg-[#FFF3EA] text-[#F04E23]';

const TOP_RATIO = 0.14; // modal rests 14% of the screen height from the top
const SEARCH_TOP = 24; // px from the top of the screen while searching

export function GigFilters({ filters, onChange }: GigFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOffset, setSearchOffset] = useState(0);
  // top: where the modal rests. fromY: how far it sits from the bar when closed.
  const [anchor, setAnchor] = useState({ top: 120, fromY: 0 });

  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [addressInput, setAddressInput] = useState(filters.address);
  const [debouncedAddress, setDebouncedAddress] = useState(filters.address);
  
  const barRef = useRef<HTMLElement>(null); // the static bar (modal measures this)
  const searchRef = useRef<HTMLDivElement>(null); // only this travels
  
  const isGettingCurrentLocation = isGettingLocation || reverseGeocodeMutation.isPending;
  const { data: locationSuggestions = [], isFetching: isLoadingSuggestions } =
  useLocationSuggestions(debouncedAddress);
  
  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => onChange({ ...filters, [key]: value });
  
  /* ---------------- Search: only the search field travels ---------------- */
  
  const handleSearchFocus = () => {
    const rect = searchRef.current?.getBoundingClientRect();
    // Only ever move UP
    if (rect) setSearchOffset(Math.min(0, SEARCH_TOP - rect.top));
    setSearchFocused(true);
  };
  
  const handleSearchBlur = () => {
    setSearchFocused(false);
    setSearchOffset(0);
  };
  
  /* ---------------- Modal ---------------- */
  
  const open = () => {
    if (isOpen) return;

    // Drop the search state so the field settles back while the modal opens
    setSearchFocused(false);
    setSearchOffset(0);
    (document.activeElement as HTMLElement | null)?.blur();

    const rect = barRef.current?.getBoundingClientRect();
    const top = Math.round(window.innerHeight * TOP_RATIO);

    // Place the closed modal exactly at the bar (still invisible)...
    setAnchor({ top, fromY: rect ? rect.top - top : -16 });

    // ...then open on the next frames so it animates from the bar
    requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)));
  };

  const close = () => {
    setIsOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  // Esc to close + lock page scroll while the modal or search is active
  useEffect(() => {
    if (!isOpen && !searchFocused) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, searchFocused]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedAddress(addressInput);
    }, 500);

    return () => clearTimeout(timeout);
  }, [addressInput]);
  /* ---------------- Filters helpers ---------------- */

  const clearFilters = () =>
    onChange({
      ...filters,
      subject: 'All subjects',
      radius: 25,
      address: '',
      college: '',
      coordinates: DEFAULT_COORDS,
      startDate: null,
      endDate: null,
    });

  const removeFilter = (
    key: keyof typeof filters,
    defaultValue: (typeof filters)[keyof typeof filters]
  ) => updateFilter(key as never, defaultValue as never);

  const hasDate = Boolean(filters.startDate || filters.endDate);

  const dateLabel =
    filters.startDate && filters.endDate
      ? `${filters.startDate} – ${filters.endDate}`
      : filters.startDate
        ? `From ${filters.startDate}`
        : filters.endDate
          ? `Until ${filters.endDate}`
          : 'Any date';

  const activeFilters = [
    filters.subject !== 'All subjects' && {
      key: 'subject',
      label: filters.subject,
      onRemove: () => removeFilter('subject', 'All subjects'),
    },
    filters.radius !== 25 && {
      key: 'radius',
      label: `${filters.radius} km`,
      onRemove: () => removeFilter('radius', 25),
    },
    filters.college && {
      key: 'college',
      label: filters.college,
      onRemove: () => removeFilter('college', ''),
    },
    filters.address && {
      key: 'address',
      label: filters.address,
      onRemove: () => removeFilter('address', ''),
    },
    hasDate && {
      key: 'date',
      label: dateLabel,
      onRemove: () => onChange({ ...filters, startDate: null, endDate: null }),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const parseDate = (value: string) =>
    value ? new Date(`${value}T00:00:00`) : null;

  const handleCurrentLocation = async () => {
    try {
      setIsGettingLocation(true);

      const coordinates = await locationService.getCurrentCoordinates();
      const response = await reverseGeocodeMutation.mutateAsync(coordinates);

      onChange({
        ...filters,
        address: response.address,
        coordinates: {
          latitude: response.latitude,
          longitude: response.longitude,
        },
      });

      setAddressInput(response.address);
    } catch (error) {
      console.error('Failed to get current location:', error);
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <>
      {/* Overlay (modal OR search focus) */}
      <div
        aria-hidden
        onMouseDown={close}
        className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          isOpen || searchFocused
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      <div className='mb-6'>
        {/* ================= FILTER BAR (static, never moves) ================= */}
        <section
          ref={barRef}
          className='rounded-2xl border border-[#e8e8e8] bg-white p-2 shadow-sm transition-shadow hover:shadow-md'
        >
          <div className='flex w-full items-center gap-2'>
            {/* Search: the only piece that travels to the top */}
            <div
              ref={searchRef}
              style={{ transform: `translateY(${searchOffset}px)` }}
              className={`relative min-w-0 flex-1 rounded-xl transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                searchFocused
                  ? 'z-50 shadow-[0_16px_40px_-12px_rgba(240,78,35,0.35)]'
                  : ''
              }`}
            >
              {/* <Search
                strokeWidth={2.6}
                className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 focus:text-orange-200 text-[#F04E23]'
              />
              <input
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={(e) => e.key === 'Escape' && e.currentTarget.blur()}
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                placeholder='Search gigs'
                className='h-11 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#FDE8DF]'
              /> 
              */}
              <div className='group relative'>
                <Search
                  strokeWidth={3}
                  className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F04E23] transition-all duration-200 group-focus-within:text-[#f8a27d]'
                />

                <input
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onKeyDown={(e) =>
                    e.key === 'Escape' && e.currentTarget.blur()
                  }
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder='Search gigs'
                  className='h-11 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#FDE8DF]'
                />
              </div>
            </div>

            <button
              type='button'
              onMouseDown={(e) => e.preventDefault()}
              onClick={open}
              aria-haspopup='dialog'
              className={`${toolbarBtnBase} hidden sm:flex ${
                hasDate ? toolbarBtnActive : toolbarBtnIdle
              }`}
            >
              <Calendar className='h-4 w-4 text-[#F04E23]' strokeWidth={2.5} />
              <span className='max-w-[130px] truncate'>{dateLabel}</span>
              <ChevronDown className='h-4 w-4' strokeWidth={2.5} />
            </button>

            <button
              type='button'
              onMouseDown={(e) => e.preventDefault()}
              onClick={open}
              aria-haspopup='dialog'
              className={`${toolbarBtnBase} font-medium ${
                activeFilters.length > 0 ? toolbarBtnActive : toolbarBtnIdle
              }`}
            >
              <SlidersHorizontal
                className='h-4 w-4 text-[#F04E23]'
                strokeWidth={2.5}
              />
              <span className='hidden sm:inline'>Filters</span>
              {activeFilters.length > 0 && (
                <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F04E23] px-1.5 text-[11px] font-semibold text-white'>
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>
        </section>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className='mt-2 flex flex-wrap items-center gap-1.5'>
            {activeFilters.map((f) => (
              <div
                key={f.key}
                className='inline-flex items-center gap-1 rounded-full border border-[#F9D5C6] bg-[#FFF3EA] px-2.5 py-1 text-xs font-medium text-[#C93E14]'
              >
                <span>{f.label}</span>
                <button
                  type='button'
                  onClick={f.onRemove}
                  aria-label={`Remove ${f.label} filter`}
                  className='rounded-full p-0.5 text-[#F04E23]/60 transition hover:bg-[#FBDDCF] hover:text-[#F04E23]'
                >
                  <X className='h-3 w-3' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CENTERED MODAL ================= */}
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Filter gigs'
        aria-hidden={!isOpen}
        style={{
          top: anchor.top,
          transform: isOpen
            ? 'translate(-50%, 0) scale(1)'
            : `translate(-50%, ${anchor.fromY}px) scale(0.97)`,
        }}
        className={`fixed left-1/2 z-50 w-[min(900px,calc(100vw-2rem))] origin-top rounded-2xl border border-[#F9D5C6] bg-white shadow-[0_24px_60px_-12px_rgba(240,78,35,0.25)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen
            ? 'visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <div
          style={{ maxHeight: `calc(100vh - ${anchor.top}px - 32px)` }}
          className='overflow-y-auto px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-5'
        >
          {/* Header */}
          <div className='mb-5 flex items-start justify-between border-b border-[#FBE6DC] pb-4'>
            <div>
              <h3 className='text-sm font-semibold text-gray-900'>
                Filter gigs
              </h3>
              <p className='mt-0.5 text-xs text-gray-500'>
                Refine results by subject, date and location
              </p>
            </div>
            <button
              type='button'
              onClick={close}
              aria-label='Close filters'
              className='rounded-lg p-1.5 text-gray-400 transition hover:bg-[#FFF3EA] hover:text-[#F04E23]'
            >
              <X className='h-4 w-4' />
            </button>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {/* Subject */}
            <div>
              <label className={labelClass}>Subject</label>
              <div className='relative'>
                <select
                  value={filters.subject}
                  onChange={(e) => updateFilter('subject', e.target.value)}
                  className={selectClass}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F04E23]/70' />
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className={labelClass}>Distance</label>
              <div className='relative'>
                <select
                  value={filters.radius}
                  onChange={(e) =>
                    updateFilter('radius', Number(e.target.value))
                  }
                  className={selectClass}
                >
                  {radiusOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      Within {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F04E23]/70' />
              </div>
            </div>

            {/* College */}
            <div>
              <label className={labelClass}>College</label>
              <input
                value={filters.college}
                onChange={(e) => updateFilter('college', e.target.value)}
                placeholder='Any college'
                className={fieldClass}
              />
            </div>

            {/* Location */}
            <div className='sm:col-span-2 lg:col-span-1'>
              <label className={labelClass}>Location</label>
              <div className='relative'>
                <MapPin
                  strokeWidth={2.4}
                  className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F04E23]/70'
                />
                <input
                  value={filters.address}
                  onChange={(e) => {
                    const value = e.target.value;

                    setAddressInput(value);

                    onChange({
                      ...filters,
                      address: value,
                      coordinates: null,
                    });
                  }}
                  placeholder='City or area'
                  className={`${fieldClass} pl-9 pr-10`}
                />
                <button
                  type='button'
                  onClick={handleCurrentLocation}
                  disabled={isGettingLocation}
                  title='Use current location'
                  className='absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 transition hover:bg-[#FFF3EA] hover:text-[#F04E23] disabled:opacity-50'
                >
                  <Navigation strokeWidth={2.5} className='h-4 w-4' />
                </button>
                {addressInput.trim().length >= 2 &&
                  (locationSuggestions.length > 0 || isLoadingSuggestions) && (
                    <div className='absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg'>
                      {isLoadingSuggestions ? (
                        <div className='px-3 py-3 text-sm text-gray-500'>
                          Searching locations...
                        </div>
                      ) : (
                        locationSuggestions.map((suggestion) => (
                          <button
                            key={`${suggestion.latitude}-${suggestion.longitude}`}
                            type='button'
                            onClick={() => {
                              onChange({
                                ...filters,
                                address: suggestion.address,
                                coordinates: {
                                  latitude: suggestion.latitude,
                                  longitude: suggestion.longitude,
                                },
                              });

                              setAddressInput(suggestion.address);
                              setDebouncedAddress('');
                            }}
                            className='flex w-full items-start gap-3 px-3 py-2.5 text-left text-sm transition hover:bg-[#FFF3EA]'
                          >
                            <MapPin
                              className='mt-0.5 h-4 w-4 shrink-0 text-[#F04E23]'
                              strokeWidth={2}
                            />

                            <span className='text-gray-700'>
                              {suggestion.address}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
              </div>
            </div>

            {/* Date range */}
            <div className='sm:col-span-2'>
              <label className={`${labelClass} flex items-center gap-1.5`}>
                <Calendar className='h-3.5 w-3.5 text-[#F04E23]/70' />
                Date range
              </label>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='date'
                  value={formatDate(filters.startDate)}
                  onChange={(e) =>
                    updateFilter('startDate', parseDate(e.target.value))
                  }
                  className={fieldClass}
                />
                <input
                  type='date'
                  value={formatDate(filters.endDate)}
                  min={formatDate(filters.startDate) || undefined}
                  onChange={(e) =>
                    updateFilter('endDate', parseDate(e.target.value))
                  }
                  className={fieldClass}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-6 flex justify-between gap-3'>
            <button
              type='button'
              onClick={clearFilters}
              className='h-9 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-500 transition hover:border-[#F9D5C6] hover:bg-[#FFF3EA] hover:text-[#F04E23]'
            >
              Reset Filters
            </button>
            <button
              type='button'
              onClick={close}
              className='h-9 rounded-lg bg-[#F04E23] px-5 text-sm font-medium text-white shadow-sm shadow-[#F04E23]/25 transition hover:bg-[#D9411A] active:scale-[0.98]'
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
