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

type TrackTab = "ongoing" | "past";

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

/* -------------------------------------------------------------------------- */
/* Summary Card                                                               */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#e3e3e3] bg-white px-4 py-3">

      <div className="flex items-center gap-2 text-[#c95740]">
        {icon}

        <span className="text-[11px] text-[#777]">
          {label}
        </span>
      </div>

      <p className="mt-1 text-[20px] font-semibold text-[#202020]">
        {value}
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab Button                                                                 */
/* -------------------------------------------------------------------------- */

function TabButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 pb-3 text-[13px] font-medium transition ${
        active
          ? "text-[#c95740]"
          : "text-[#777] hover:text-[#333]"
      }`}
    >

      {label}

      <span
        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] ${
          active
            ? "bg-[#f7e7e2] text-[#c95740]"
            : "bg-[#eeeeee] text-[#777]"
        }`}
      >
        {count}
      </span>

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#c95740]" />
      )}

    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState({
  tab,
}: {
  tab: TrackTab;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#dcdcdc] bg-white px-5 py-14 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4eee9] text-[#c95740]">
        {tab === "ongoing" ? (
          <Clock3 size={21} />
        ) : (
          <History size={21} />
        )}
      </div>

      <h3 className="mt-4 text-[14px] font-semibold text-[#292929]">
        {tab === "ongoing"
          ? "No ongoing gigs"
          : "No past gigs"}
      </h3>

      <p className="mx-auto mt-1.5 max-w-sm text-[12px] leading-5 text-[#888]">
        {tab === "ongoing"
          ? "Assignments you accept will appear here."
          : "Your completed and failed gigs will appear here."}
      </p>

    </div>
  );
}