import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  UserRound,
  Wallet,
} from 'lucide-react';

import type { MyAssignments } from '@/types/myAssignments.types';

interface RequestedAssignmentCardProps {
  assignment: MyAssignments.RequestedAssignment;
  onViewDetails?: (assignment: MyAssignments.RequestedAssignment) => void;
}

const statusStyles: Record<MyAssignments.Status, string> = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  accepted: 'border-blue-200 bg-blue-50 text-blue-700',
  submitted: 'border-purple-200 bg-purple-50 text-purple-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  failed: 'border-red-200 bg-red-50 text-red-700',
};

const statusLabels: Record<MyAssignments.Status, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  submitted: 'Submitted',
  completed: 'Completed',
  failed: 'Failed',
};

export function RequestedAssignmentCard({
  assignment,
  onViewDetails,
}: RequestedAssignmentCardProps) {
  const { payment, due, status, assignedTo } = assignment;
  const dueDate = new Date(assignment.due);
  const formattedDate = dueDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = dueDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <article className='group overflow-hidden rounded-2xl border border-[#F0E7E2] bg-white transition-all duration-200 hover:border-[#F4B49F] hover:shadow-lg hover:shadow-orange-900/5'>
      {/* Main Content */}
      <div className='p-5 sm:p-6'>
        {/* Header */}
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0 flex-1'>
            <span className='mb-2 inline-flex rounded-md bg-[#FFF3EA] px-2.5 py-1 text-xs font-semibold text-[#D9471F]'>
              {assignment.category}
            </span>

            <h3 className='line-clamp-2 text-lg font-bold leading-snug text-[#292421] transition-colors group-hover:text-[#E94E25]'>
              {assignment.title}
            </h3>
          </div>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>

        {/* Description */}
        <p className='mt-3 line-clamp-2 text-sm leading-6 text-[#77716D]'>
          {assignment.description}
        </p>

        {/* Payment and Due Details */}
        <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <div className='flex items-center gap-3 rounded-xl bg-[#FFF8F4] p-3.5'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#F45124] shadow-sm'>
              <Wallet size={19} />
            </div>

            <div className='min-w-0'>
              <p className='text-xs font-medium text-[#918780]'>Payment</p>
              <p className='truncate text-sm font-bold text-[#292421]'>
                {assignment.payment}
                <span className='ml-1 font-medium text-[#77716D]'>₹</span>
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-xl bg-[#F8F7F6] p-3.5'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#5E6B82] shadow-sm'>
              <CalendarDays size={19} />
            </div>

            <div className='min-w-0'>
              <p className='text-xs font-medium text-[#918780]'>Due Date</p>
              <p className='truncate text-sm font-bold text-[#292421]'>
                {formattedDate}
              </p>

              <p className='mt-0.5 flex items-center gap-1 text-xs text-[#77716D]'>
                <Clock3 size={12} />
                {formattedTime}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className='mt-4 flex items-start gap-2 text-sm text-[#77716D]'>
          <MapPin size={16} className='mt-0.5 shrink-0 text-[#F45124]' />
          <span className='line-clamp-2'>{assignment.location}</span>
        </div>
      </div>

      {/* Footer */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-t border-[#F3ECE8] bg-[#FFFCFA] px-5 py-4 sm:px-6'>
        <div className='flex min-w-0 items-center gap-2'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0E8] text-[#E94E25]'>
            <UserRound size={16} />
          </div>

          <div className='min-w-0'>
            <p className='text-[11px] text-[#918780]'>Assigned to</p>
            <p className='truncate text-sm font-semibold text-[#413A36]'>
              {assignedTo?.name ?? 'Not assigned yet'}
            </p>
          </div>
        </div>

        <button
          type='button'
          onClick={() => onViewDetails?.(assignment)}
          className='inline-flex items-center gap-2 rounded-xl bg-[#F45124] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#DB4019] focus:outline-none focus:ring-2 focus:ring-[#F45124] focus:ring-offset-2'
        >
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}
