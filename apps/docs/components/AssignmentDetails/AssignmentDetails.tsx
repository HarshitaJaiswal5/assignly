'use client';

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  Link2,
  MapPin,
  Paperclip,
  UserRound,
} from 'lucide-react';

import { useGigDetails } from '@/hooks/assignment/useAssignmentDetails';
import type { Assignment } from '@/types/assignment.types';

interface Attachment {
  name: string;
  url: string;
  type?: string;
  size?: string;
}

interface AssignmentDetailsProps {
  gigId: string;
  onInstructionsClick?: () => void;
  onAttachmentClick?: (file: Attachment) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDueDate = (date: string) => {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
};

const formatDistance = (distance?: number) => {
  if (distance === undefined) {
    return null;
  }

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(1)} km`;
};

const getFileName = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    const fileName = pathname.split('/').pop();

    return fileName || 'Attachment';
  } catch {
    return 'Attachment';
  }
};

const getFileType = (url: string) => {
  const fileName = getFileName(url);
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (extension === 'pdf') {
    return 'PDF';
  }

  if (['jpg', 'jpeg', 'png', 'webp'].includes(extension ?? '')) {
    return 'Image';
  }

  return extension?.toUpperCase() || 'File';
};

export default function AssignmentDetails({
  gigId,
  onInstructionsClick,
  onAttachmentClick,
}: AssignmentDetailsProps) {
  const { data: assignment, isLoading, isError } = useGigDetails(gigId);

  if (isLoading) {
    return (
      <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]'>
        <div className='space-y-6'>
          <div className='h-28 animate-pulse rounded-2xl bg-gray-100' />
          <div className='h-80 animate-pulse rounded-2xl bg-gray-100' />
        </div>

        <div className='h-[520px] animate-pulse rounded-2xl bg-gray-100' />
      </div>
    );
  }

  if (isError || !assignment) {
    return (
      <div className='flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-200 bg-white'>
        <div className='text-center'>
          <p className='font-semibold text-gray-900'>
            Unable to load assignment
          </p>

          <p className='mt-1 text-sm text-gray-500'>Please try again later.</p>
        </div>
      </div>
    );
  }

  const hasAttachment = Boolean(assignment.referencePdf);

  const attachment: Attachment | null = hasAttachment
    ? {
        name: getFileName(assignment.referencePdf!),
        url: assignment.referencePdf!,
        type: getFileType(assignment.referencePdf!),
      }
    : null;

  const distance = formatDistance(assignment.distance);

  return (
    <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]'>
      {/* =========================
          LEFT - ASSIGNMENT DETAILS
      ========================== */}
      <main className='min-w-0'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-semibold tracking-tight text-gray-950'>
            {assignment.title}
          </h1>

          <p className='mt-2 max-w-3xl text-base leading-7 text-gray-600'>
            {assignment.description}
          </p>
        </div>

        {/* Summary */}
        <section className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <div className='grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
            {/* Amount */}
            <div className='px-6 py-5'>
              <p className='text-sm text-gray-500'>You will earn</p>

              <div className='mt-2 flex flex-wrap items-baseline gap-2'>
                <span className='text-2xl font-semibold text-[#F45124]'>
                  {formatCurrency(
                    assignment.amount + assignment.additionalStationaryAmount
                  )}
                </span>
              </div>
            </div>

            {/* Due */}
            <div className='px-6 py-5'>
              <p className='text-sm text-gray-500'>Due</p>

              <div className='mt-2 flex items-center gap-2'>
                <CalendarDays size={17} className='shrink-0 text-[#F45124]' />

                <p className='font-semibold text-[#F45124]'>
                  {formatDueDate(assignment.deliveryDate)}
                </p>
              </div>
            </div>

            {/* Handoff */}
            <div className='px-6 py-5'>
              <p className='text-sm text-gray-500'>Handoff</p>

              <div className='mt-2 flex items-start gap-2'>
                <MapPin size={17} className='mt-0.5 shrink-0 text-gray-500' />

                <div>
                  <p className='font-medium leading-6 text-gray-900'>
                    {assignment.deliveryAddress}
                  </p>

                  {distance && (
                    <p className='mt-0.5 text-sm text-gray-500'>
                      {distance} away
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main details */}
        <section className='mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <div className='px-7 py-6'>
            {/* What you'll do */}
            <div>
              <h2 className='text-lg font-semibold text-gray-900'>
                What you'll do
              </h2>

              <p className='mt-3 text-base leading-7 text-gray-700'>
                {assignment.description}
              </p>
            </div>

            {/* Instructions */}
            <div className='mt-6 border-t border-gray-200'>
              <button
                type='button'
                onClick={onInstructionsClick}
                className='flex w-full items-center justify-between py-5 text-left'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0EA]'>
                    <ClipboardList size={19} className='text-[#F45124]' />
                  </div>

                  <span className='font-semibold text-gray-900'>
                    Instructions
                  </span>
                </div>

                <div className='flex items-center gap-2 text-[#F45124]'>
                  <span className='font-medium'>Open instructions</span>

                  <ChevronRight size={19} />
                </div>
              </button>
            </div>

            {/* Attachments */}
            <div className='border-t border-gray-200'>
              <div className='py-5'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF5F3]'>
                    <Link2 size={19} className='text-[#4F746C]' />
                  </div>

                  <span className='font-semibold text-gray-900'>
                    Attachments
                  </span>

                  <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600'>
                    {hasAttachment ? 1 : 0}
                  </span>
                </div>

                {attachment && (
                  <button
                    type='button'
                    onClick={() => onAttachmentClick?.(attachment)}
                    className='mt-4 flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:border-gray-300 hover:bg-gray-50'
                  >
                    <div className='flex min-w-0 items-center gap-3'>
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EA]'>
                        <Paperclip size={18} className='text-[#F45124]' />
                      </div>

                      <div className='min-w-0'>
                        <p className='truncate font-medium text-gray-900'>
                          {attachment.name}
                        </p>

                        <p className='mt-0.5 text-sm text-gray-500'>
                          {attachment.type}
                        </p>
                      </div>
                    </div>

                    <Download
                      size={19}
                      className='ml-4 shrink-0 text-gray-500'
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          RIGHT - APPLY CARD
      ========================== */}
      <aside className='lg:sticky lg:top-6 lg:self-start'>
        <section className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
          <div className='px-7 py-6'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Before you apply
            </h2>

            {/* Requester */}
            <div className='mt-6 flex items-center gap-4'>
              <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF5F3] text-lg font-semibold text-[#3F8179]'>
                {assignment.user.name
                  .split(' ')
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>

              <div className='min-w-0'>
                <p className='truncate font-semibold text-gray-900'>
                  {assignment.user.name}
                </p>

                {assignment.user.emailVerified && (
                  <div className='mt-1 flex items-center gap-1.5 text-sm text-[#168B83]'>
                    <CheckCircle2 size={16} />

                    <span>Verified requester</span>
                  </div>
                )}

                <p className='mt-1 text-sm text-gray-500'>
                  Assignment · #{assignment.id.slice(0, 8)}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className='my-6 border-t border-gray-200' />

            {/* Payment */}
            {/* Bill */}
            <div className='space-y-5'>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-gray-700'>Assignment payment</span>

                <span className='font-medium text-gray-900'>
                  {formatCurrency(assignment.amount)}
                </span>
              </div>

              {assignment.additionalStationaryAmount > 0 && (
                <>
                  <div className='flex items-center justify-between gap-4'>
                    <span className='text-gray-700'>
                      Stationery / additional expenses
                    </span>

                    <span className='font-medium text-gray-900'>
                      {formatCurrency(assignment.additionalStationaryAmount)}
                    </span>
                  </div>

                  <div className='border-t border-dashed border-gray-200' />
                </>
              )}

              <div className='flex items-start justify-between gap-6'>
                <span className='shrink-0 text-gray-700'>Handoff</span>

                <span className='text-right text-gray-700'>
                  {assignment.deliveryAddress}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className='my-6 border-t border-gray-200' />

            <div className='flex items-center justify-between'>
              <span className='font-medium text-gray-800'>
                Total you will earn
              </span>

              <span className='text-2xl font-semibold text-[#F45124]'>
                {formatCurrency(
                  assignment.amount + assignment.additionalStationaryAmount
                )}
              </span>
            </div>

            {/* Note */}
            <div className='mt-7'>
              <label
                htmlFor='application-note'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Your note to {assignment.user.name}
              </label>

              <textarea
                id='application-note'
                defaultValue='I can complete this before the deadline.'
                maxLength={250}
                rows={4}
                className='w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F45124] focus:ring-2 focus:ring-[#F45124]/10'
              />

              <p className='mt-2 text-xs text-gray-500'>40/250 characters</p>
            </div>

            {/* Apply */}
            <button
              type='button'
              className='mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F45124] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#DF431C] active:scale-[0.99]'
            >
              Apply for this assignment
              <ArrowRight size={18} />
            </button>

            <p className='mt-4 text-center text-xs text-gray-500'>
              You can withdraw your application before it's accepted.
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}
