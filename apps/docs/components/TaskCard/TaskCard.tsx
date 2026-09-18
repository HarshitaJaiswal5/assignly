'use client';

import { Clock3, MapPin, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

import type { Assignment } from '@/types/taskCard.types';

interface TaskCardProps {
  task: Assignment;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className='group rounded-xl border border-[#e3e3e3] bg-white p-4 transition hover:border-[#d6b0a5] hover:shadow-sm'>
      <div className='flex gap-3'>
        {/* Icon */}
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1ece8]'>
          <FileText size={22} className='text-[#686868]' />
        </div>

        {/* Content */}
        <div className='min-w-0 flex-1'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <h3 className='text-[14px] font-semibold leading-5 text-[#202020]'>
                {task.title}
              </h3>

              <p className='mt-1 text-[12.5px] leading-[19px] text-[#777]'>
                {task.description}
              </p>
            </div>

            {/* Price */}
            <div className='shrink-0 rounded-lg bg-[#f4eee9] px-3 py-1.5 text-center'>
              <p className='text-[13px] font-semibold text-[#222]'>
                ₹{task.payment.amount}
              </p>

              <p className='text-[10px] text-[#777]'>total</p>
            </div>
          </div>

          {/* Due */}
          <div className='mt-3 flex items-center gap-1.5 text-[12px] text-[#c95740]'>
            <Clock3 size={14} />
            <span>
              {task.due.date} · {task.due.time}
            </span>
          </div>

          {/* Location */}
          <div className='mt-1.5 flex items-center gap-1.5 text-[12px] text-[#555]'>
            <MapPin size={14} />
            <span>
              {task.handoff.location} · {task.handoff.distance}
            </span>
          </div>

          {/* Requester + Button */}
          <div className='mt-1.5 flex items-center justify-between gap-2'>
            <div className='flex min-w-0 items-center gap-1.5 text-[12px]'>
              {task.requester.verified && (
                <ShieldCheck
                  size={15}
                  className='shrink-0 fill-[#279b91] text-[#279b91]'
                />
              )}

              <span className='truncate text-[#444]'>
                {task.requester.name}
              </span>

              {task.requester.verified && (
                <span className='shrink-0 text-[#279b91]'>
                  · Verified requester
                </span>
              )}
            </div>

            {/* View Details */}
            <Link
              href={`/assignments/${task.id}`}
              className='shrink-0 rounded-lg bg-[#cc5942] px-3 py-2 text-[11px] font-medium text-white transition hover:bg-[#b94d38]'
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}