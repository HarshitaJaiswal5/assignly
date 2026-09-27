"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { GigFilters } from "@/components/GigFilters/GigFilters";
import { TrackGigCard } from "@/components/TrackGigCard/TrackGigCard";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { useGigs } from "@/hooks/assignment/useAssignment";

import type { GigFilters as GigFiltersType } from "@/types/gigFilters.types";
import type { Assignment } from "@/types/assignment.types";
import { assignments } from "@/constants/tasks";

const DEFAULT_FILTERS: GigFiltersType = {
  search: "",
  subject: "",
  radius: null,
  college: "",
  address: "",
  coordinates: null,
  startDate: null,
  endDate: null,
};

export default function DashboardPage() {
  const [filters, setFilters] =
    useState<GigFiltersType>(DEFAULT_FILTERS);

  const {
    data: gigs = [],
    isLoading,
    isFetching,
    error,
  } = useGigs(filters);

  const handleViewDetails = (assignment: Assignment.TrackAssignment) => {
    console.log("View assignment:", assignment.id);
}

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-4 mx-2 flex items-center gap-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4eee9] text-[#c95740]">
            <SlidersHorizontal size={16} />
          </div>

          <div>
            <h1 className="text-[20px] font-semibold tracking-[-0.5px] text-[#181818]">
              Find Gigs
            </h1>

            <p className="text-[13px] text-[#777]">
              Search and filter gigs near you
            </p>
          </div>
        </div>

        {/* Filters */}
        <GigFilters
          filters={filters}
          onChange={setFilters}
        />

        {/* Loading */}
        {isLoading && (
          <p className="mt-4 text-center text-sm text-[#777]">
            Loading gigs...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            Failed to load gigs.
          </p>
        )}

        {/* Fetching indicator for filter changes */}
        {!isLoading && isFetching && (
          <p className="mb-3 text-xs text-[#888]">
            Updating gigs...
          </p>
        )}

        {/* Gigs */}
        {!isLoading && !error && gigs.length > 0 && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {gigs.map((gig: Assignment.TrackAssignment) => (
              <TrackGigCard
                key={gig.id}
                Assignment={gig}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && gigs.length === 0 && (
          <EmptyState />
        )}

      </div>
    </div>
  );
}