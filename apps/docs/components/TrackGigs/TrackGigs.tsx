"use client";

import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  History,
} from "lucide-react";

import type {
  GigStatus,
  TrackGig,
} from "@/types/trackGigs.types";

import { TrackGigCard } from "@/components/TrackGigCard/TrackGigCard";
import type { TrackTab } from "@/components/EmptyState/EmptyState";
import { SummaryCard } from '@/components/SummaryCard/SummaryCard';
import { TabButton } from "@/components/TabButton/TabButton";
import { EmptyState } from "@/components/EmptyState/EmptyState";

interface TrackGigsProps {
  gigs: TrackGig[];
  onViewDetails?: (gig: TrackGig) => void;
}

export default function TrackGigs({
  gigs,
  onViewDetails,
}: TrackGigsProps) {
  const [activeTab, setActiveTab] =
    useState<TrackTab>("ongoing");

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

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-7">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4eee9] text-[#c95740]">
              <BriefcaseBusiness size={18} />
            </div>

            <div>
              <h1 className="text-[25px] font-semibold tracking-[-0.5px] text-[#181818]">
                Track your gigs
              </h1>

              <p className="mt-1 text-[13px] text-[#777]">
                Keep track of the work you've taken and completed.
              </p>
            </div>

          </div>

        </div>

        {/* Summary */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <SummaryCard
            icon={<Clock3 size={16} />}
            label="Ongoing"
            value={ongoingGigs.length}
          />

          <SummaryCard
            icon={<History size={16} />}
            label="Past"
            value={pastGigs.length}
          />

          <SummaryCard
            icon={<CheckCircle2 size={16} />}
            label="Completed"
            value={
              gigs.filter(
                (gig) => gig.status === "completed"
              ).length
            }
          />

          <SummaryCard
            icon={<BriefcaseBusiness size={16} />}
            label="Total gigs"
            value={gigs.length}
          />

        </div>

        {/* Tabs */}
        <div className="mb-5 flex border-b border-[#e5e5e5]">

          <TabButton
            active={activeTab === "ongoing"}
            onClick={() => setActiveTab("ongoing")}
            label="Ongoing"
            count={ongoingGigs.length}
          />

          <TabButton
            active={activeTab === "past"}
            onClick={() => setActiveTab("past")}
            label="Past"
            count={pastGigs.length}
          />

        </div>

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
