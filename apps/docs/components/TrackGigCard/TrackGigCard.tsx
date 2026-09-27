'use client';

import {
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  FileText,
  MapPin,
} from 'lucide-react';

import Link from 'next/link';
import type { Assignment } from '@/types/assignment.types';

const statusConfig: Record<
  Assignment.AssignmentStatus,
  {
    label: string;
    className: string;
  }
> = {
  OPEN: {
    label: 'Open',
    className: 'bg-[#e7f1ef] text-[#279b91]',
  },

  ASSIGNED: {
    label: 'Assigned',
    className: 'bg-[#f7e7e2] text-[#c95740]',
  },

  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-[#fff5df] text-[#a87518]',
  },

  SUBMITTED: {
    label: 'Submitted',
    className: 'bg-[#fff5df] text-[#a87518]',
  },

  COMPLETED: {
    label: 'Completed',
    className: 'bg-[#e7f1ef] text-[#279b91]',
  },

  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-[#f8e9e7] text-[#bd5143]',
  },
};

export function TrackGigCard({
  Assignment,
  onViewDetails,
}: Assignment.TrackAssignmentCardProps) {
  const deliveryDate = new Date(Assignment.deliveryDate);
  const status = statusConfig[Assignment.status];

  return (
    <article className='group rounded-2xl border border-[#e3e3e3] bg-white p-4 transition hover:border-[#d6b0a5] hover:shadow-sm sm:p-5'>
      {/* Top */}
      <div className='flex items-start gap-3'>
        {/* Icon */}
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4eee9] text-[#c95740]'>
          <FileText size={20} />
        </div>

        {/* Content */}
        <div className='flex min-w-0 flex-1 items-start justify-between gap-3'>
          {/* Left: Category + Title + Description */}
          <div className='min-w-0 flex-1'>
            <span className='text-[10px] font-medium text-[#888]'>
              {Assignment.category}
            </span>

            <h3 className='mt-1 text-[14px] font-semibold leading-5 text-[#202020]'>
              {Assignment.title}
            </h3>

            <p className='mt-1 line-clamp-2 text-[11px] leading-4 text-[#777]'>
              {Assignment.description}
            </p>
          </div>

          {/* Right: Payment */}
          <div className='shrink-0 rounded-lg bg-[#f4eee9] px-3 py-1.5 text-center'>
            <p className='text-[13px] font-semibold text-[#222]'>
              ₹ {Assignment.amount}
            </p>

            <p className='text-[9px] text-[#777]'>Total</p>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className='mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#eeeeee] pt-3'>
        {/* Due */}
        <div className='flex items-center gap-1.5 text-[11px] text-[#555]'>
          <CalendarClock size={14} className='text-[#c95740]' />

          <span>
            {deliveryDate.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}{' '}
            ·{' '}
            {deliveryDate.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </span>
        </div>

        {/* Location */}
        <div className='flex items-center gap-1.5 text-[11px] text-[#555]'>
          <MapPin size={14} className='text-[#777]' />

          <span>
            {Assignment.deliveryAddress}

            {Assignment.distance !== undefined && (
              <span className='ml-1 text-[#888]'>
                · {Assignment.distance.toFixed(1)} km away
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Requester + Status + Button */}
      <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
        {/* Requester */}
        <div className='flex min-w-0 items-center gap-1.5'>
          <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7f1ef] text-[9px] font-semibold text-[#279b91]'>
            {Assignment.user?.name.charAt(0)}
          </div>

          <span className='truncate text-[11px] text-[#444]'>
            {Assignment.user?.name}
          </span>

          {Assignment.user?.emailVerified && (
            <BadgeCheck size={13} className='shrink-0 text-[#279b91]' />
          )}
        </div>

        {/* Right */}
        <div className='flex items-center gap-2'>
          {/* Status */}
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${status.className}`}
          >
            {status.label}
          </span>

          {/* Details */}
          <Link
            href={`Assignment/${Assignment.id}`}
            className='flex items-center gap-1 text-[11px] font-medium text-[#c95740] transition hover:text-[#b94d38]'
          >
            View details
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Status-specific information */}

      {Assignment.status === 'SUBMITTED' && (
        <div className='mt-3 rounded-lg bg-[#fffaf0] px-3 py-2 text-[11px] text-[#8b6b2a]'>
          Assignment submitted · Awaiting requester approval
        </div>
      )}

      {Assignment.status === 'COMPLETED' && (
        <div className='mt-3 rounded-lg bg-[#f3f9f7] px-3 py-2 text-[11px] text-[#368278]'>
          Assignment completed
        </div>
      )}
    </article>
  );
}
