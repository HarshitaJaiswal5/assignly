"use client";

import {
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  FileText,
  MapPin,
} from "lucide-react";

import type {
  GigStatus,
  TrackGig,
  TrackGigCardProps,
} from "@/types/trackGigs.types";
import Link from "next/link";

const statusConfig: Record<
  GigStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-[#f7e7e2] text-[#c95740]",
  },

  submitted: {
    label: "Submitted",
    className: "bg-[#fff5df] text-[#a87518]",
  },

  completed: {
    label: "Completed",
    className: "bg-[#e7f1ef] text-[#279b91]",
  },

  failed: {
    label: "Failed",
    className: "bg-[#f8e9e7] text-[#bd5143]",
  },
};

export function TrackGigCard({
  gig,
  onViewDetails,
}: TrackGigCardProps) {
  const status = statusConfig[gig.status];

  return (
    <article className="group rounded-2xl border border-[#e3e3e3] bg-white p-4 transition hover:border-[#d6b0a5] hover:shadow-sm sm:p-5">

      {/* Top */}
      <div className="flex items-start gap-3">

        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4eee9] text-[#c95740]">
          <FileText size={20} />
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              {/* Category */}
              <span className="text-[10px] font-medium text-[#888]">
                {gig.category}
              </span>

              {/* Title */}
              <h3 className="mt-1 text-[14px] font-semibold leading-5 text-[#202020]">
                {gig.title}
              </h3>

            </div>

            {/* Payment */}
            <div className="shrink-0 rounded-lg bg-[#f4eee9] px-3 py-1.5 text-center">
              <p className="text-[13px] font-semibold text-[#222]">
                ₹{gig.payment.amount.toLocaleString("en-IN")}
              </p>

              <p className="text-[9px] text-[#777]">
                {gig.payment.label}
              </p>
            </div>

          </div>

          {/* Description */}
          <p className="mt-2 text-[12px] leading-[18px] text-[#777]">
            {gig.description}
          </p>

        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#eeeeee] pt-3">

        {/* Due */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#555]">
          <CalendarClock size={14} className="text-[#c95740]" />

          <span>
            {gig.due.date} · {gig.due.time}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#555]">
          <MapPin size={14} className="text-[#777]" />

          <span>
            {gig.location.name}

            {gig.location.distance && (
              <> · {gig.location.distance}</>
            )}
          </span>
        </div>

      </div>

      {/* Requester + Status + Button */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

        {/* Requester */}
        <div className="flex min-w-0 items-center gap-1.5">

          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7f1ef] text-[9px] font-semibold text-[#279b91]">
            {gig.requester.name.charAt(0)}
          </div>

          <span className="truncate text-[11px] text-[#444]">
            {gig.requester.name}
          </span>

          {gig.requester.verified && (
            <BadgeCheck
              size={13}
              className="shrink-0 text-[#279b91]"
            />
          )}

        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* Status */}
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${status.className}`}
          >
            {status.label}
          </span>

          {/* Details */}
          <Link
            href={`Assignment/${gig.id}`}
            className="flex items-center gap-1 text-[11px] font-medium text-[#c95740] transition hover:text-[#b94d38]"
          >
            View details
            <ChevronRight size={14} />
          </Link>

        </div>

      </div>

      {/* Status-specific information */}
      {gig.status === "submitted" && gig.submittedAt && (
        <div className="mt-3 rounded-lg bg-[#fffaf0] px-3 py-2 text-[11px] text-[#8b6b2a]">
          Submitted {gig.submittedAt} · Awaiting requester approval
        </div>
      )}

      {gig.status === "completed" && gig.completedAt && (
        <div className="mt-3 rounded-lg bg-[#f3f9f7] px-3 py-2 text-[11px] text-[#368278]">
          Completed {gig.completedAt}
        </div>
      )}

      {gig.status === "failed" && gig.failureReason && (
        <div className="mt-3 rounded-lg bg-[#fcf3f2] px-3 py-2 text-[11px] text-[#b75b50]">
          {gig.failureReason}
        </div>
      )}

    </article>
  );
}