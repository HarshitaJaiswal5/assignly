"use client";

import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  History,
  SlidersHorizontal,
} from "lucide-react";
import type { TrackGig } from "@/types/trackGigs.types";
import { TrackGigCard } from "@/components/TrackGigCard/TrackGigCard";
import type { TrackTab } from "@/components/EmptyState/EmptyState";
import { SummaryCard } from '@/components/SummaryCard/SummaryCard';
import { TabButton } from "@/components/TabButton/TabButton";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import type { GigFilters as GigFilterState } from "@/types/gigFilters.types";
import { GigFilters } from "@/components/GigFilters/GigFilters";

interface TrackGigsProps {
  gigs: TrackGig[];
  onViewDetails?: (gig: TrackGig) => void;
}

export default function Earn({
  gigs,
  onViewDetails,
}: TrackGigsProps) {
  const [activeTab, setActiveTab] =
    useState<TrackTab>("ongoing");
  
  const [filters, setFilters] = useState<GigFilterState>({
    search: "",
    subject: "All subjects",
    radius: 5,
    college: "",
    location: ""
  })

  const ongoingGigs = useMemo(
    () =>
      gigs.filter(
        (gig) =>
          gig.status === "pending" ||
          gig.status === "submitted"
      ),
    [gigs]
  );

  const pastGigs = useMemo(
    () =>
      gigs.filter(
        (gig) =>
          gig.status === "completed" ||
          gig.status === "failed"
      ),
    [gigs]
  );

  const visibleGigs =
    activeTab === "ongoing"
      ? ongoingGigs
      : pastGigs;

  const handleCurrentLocation = () => {}

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className='mb-4 mx-2 flex items-center gap-5'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4eee9] text-[#c95740]'>
          <SlidersHorizontal size={16} />
        </div>

        <div className=''>
          <h1 className='text-[20px] font-semibold tracking-[-0.5px] text-[#181818]'>
            Find Gigs
          </h1>

          <p className="text-[13px] text-[#777]">Search and filter gigs near you</p>
        </div>
      </div>

        <GigFilters
        filters = { filters }
        onChange = { setFilters }
        onCurrentLocation = { handleCurrentLocation }
        />

        {/* Cards */}
        {visibleGigs.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

            {visibleGigs.map((gig) => (
              <TrackGigCard
                key={gig.id}
                gig={gig}
                onViewDetails={onViewDetails}
              />
            ))}

          </div>
        ) : (
          <EmptyState tab={activeTab} />
        )}

      </div>
    </div>
  );
}
