'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  Download,
  FileImage,
  FileText,
  Link2,
  ClipboardList,
} from 'lucide-react';

import type {
  Attachment,
  AttachmentType,
  Assignment,
} from '@/types/taskCard.types';

interface AssignmentDetailsProps {
  task: Assignment;
  onInstructionsClick?: () => void;
  onAttachmentClick?: (file: Attachment) => void;
}

function AttachmentIcon({ type }: { type: AttachmentType }) {
  if (type === 'image') {
    return <FileImage size={19} strokeWidth={1.8} />;
  }

  return <FileText size={19} strokeWidth={1.8} />;
}

export default function AssignmentDetails({
  task,
  onInstructionsClick,
  onAttachmentClick,
}: AssignmentDetailsProps) {
  const [note, setNote] = useState('I can complete this before the deadline.');
  const [submitted, setSubmitted] = useState(false);

  return (
  <article className="w-full px-5 py-4">
    <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_328px]">
      
      {/* ========================= */}
      {/* LEFT — MAIN ASSIGNMENT */}
      {/* ========================= */}
      <div className="min-w-0">
        {/* Category */}
        <div className="mb-[15px] inline-flex rounded-lg bg-amber-50 px-2.5 py-[5px] text-xs font-medium leading-none text-amber-950">
          {task.category}
        </div>

        {/* Title */}
        <h1 className="m-0 text-[25px] font-bold leading-[1.15] tracking-[-0.65px] text-[#181b1f]">
          {task.title}
        </h1>

        {/* Description */}
        <p className="mt-2.5 mb-0 text-[13.5px] leading-[1.45] text-[#414347]">
          {task.description}
        </p>

        {/* Requester */}
        <div className="mt-[14px] flex items-center gap-[7px] text-[13px]">
          {task.requester.verified && (
            <BadgeCheck
              size={17}
              strokeWidth={2.4}
              className="fill-[#269d94] text-white"
            />
          )}

          <span className="text-[#36393c]">
            {task.requester.name}
          </span>

          {task.requester.verified && (
            <>
              <span className="text-[#a4a4a4]">·</span>

              <span className="font-medium text-[#148b84]">
                Verified requester
              </span>
            </>
          )}
        </div>

        {/* Stats */}
        <section className="mt-[17px] grid grid-cols-1 rounded-[11px] border border-[#e7e7e7] bg-[#fbfbfb] px-[9px] py-[18px] sm:grid-cols-[1fr_1.15fr_1.35fr]">
          {/* Earnings */}
          <div className="min-w-0 border-b border-[#dedede] px-2.5 py-2 sm:border-r sm:border-b-0 sm:py-0">
            <span className="mb-[7px] block text-[12.5px] text-[#5e6165]">
              You will earn
            </span>

            <div>
              <strong className="text-[20px] font-bold text-[#d94b2b]">
                ₹{task.payment.amount.toLocaleString("en-IN")}
              </strong>

              <span className="ml-1 text-xs text-[#383b3e]">
                {task.payment.label}
              </span>
            </div>
          </div>

          {/* Due */}
          <div className="min-w-0 border-b border-[#dedede] px-2.5 py-2 sm:border-r sm:border-b-0 sm:py-0">
            <span className="mb-[7px] block text-[12.5px] text-[#5e6165]">
              Due
            </span>

            <strong className="text-[13px] leading-[1.35] text-[#d94b2b]">
              {task.due.date}
              <span className="mx-0.5 text-[#5d6063]">·</span>
              {task.due.time}
            </strong>
          </div>

          {/* Handoff */}
          <div className="min-w-0 px-2.5 py-2 sm:py-0">
            <span className="mb-[7px] block text-[12.5px] text-[#5e6165]">
              Handoff
            </span>

            <div className="text-[13px] leading-[1.35]">
              <strong className="font-semibold text-black">
                {task.handoff.location}
              </strong>

              <span className="ml-0.5 text-xs text-[#595d61]">
                · {task.handoff.distance}
              </span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mt-[13px] rounded-[11px] border border-[#e6e6e6] bg-white px-[18px]">
          {/* What you'll do */}
          <div className="border-b border-[#dedede] py-[23px] pb-5">
            <h2 className="mb-2 text-[15px] font-bold">
              {task.task.title}
            </h2>

            <p className="m-0 text-[13px] leading-[1.55] text-[#36393c]">
              {task.task.description}
            </p>
          </div>

          {/* Instructions */}
          <button
            type="button"
            onClick={onInstructionsClick}
            className="group flex min-h-[69px] w-full items-center gap-2.5 border-b border-[#dedede] bg-transparent p-0 text-left"
          >
            <div className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-full bg-[#f3e9e4] text-[#8b6759]">
              <ClipboardList size={16} strokeWidth={2} />
            </div>

            <span className="text-[15px] font-bold">
              Instructions
            </span>

            <span className="ml-auto text-[13px] font-semibold text-[#cf4328] group-hover:underline">
              Open instructions
            </span>

            <ChevronRight
              size={18}
              strokeWidth={1.8}
              className="shrink-0 text-[#73777a]"
            />
          </button>

          {/* Attachments */}
          <div className="py-[22px] pb-[3px]">
            <div className="mb-3.5 flex items-center gap-2.5">
              <div className="grid h-[29px] w-[29px] shrink-0 place-items-center rounded-full bg-[#e9efec] text-[#53645d]">
                <Link2 size={16} strokeWidth={2} />
              </div>

              <h2 className="text-[15px] font-bold">
                Attachments
              </h2>

              <span className="grid h-[19px] min-w-[19px] place-items-center rounded-[10px] bg-[#e9e9e9] px-[5px] text-[11px] font-semibold text-[#64676a]">
                {task.attachments.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {task.attachments.map((file, index) => (
                <button
                  key={`${file.name}-${index}`}
                  type="button"
                  onClick={() => onAttachmentClick?.(file)}
                  className="group flex min-h-[49px] w-full items-center rounded-[9px] border border-[#e3e3e3] bg-white px-2.5 text-left transition-colors hover:border-[#d5d5d5] hover:bg-[#fafafa]"
                >
                  <div
                    className={`mr-2.5 grid h-6 w-6 shrink-0 place-items-center ${
                      file.type === "pdf"
                        ? "text-[#e34d32]"
                        : "text-[#4a9b76]"
                    }`}
                  >
                    <AttachmentIcon type={file.type} />
                  </div>

                  <div className="flex min-w-0 flex-1 items-baseline gap-[5px]">
                    <span className="truncate text-[13px] font-medium text-[#292b2d]">
                      {file.name}
                    </span>

                    {file.meta && (
                      <span className="shrink-0 text-xs text-[#626568]">
                        · {file.meta}
                      </span>
                    )}
                  </div>

                  <Download
                    size={19}
                    strokeWidth={1.8}
                    className="ml-2 shrink-0 text-[#5f6265]"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========================= */}
      {/* RIGHT — BEFORE YOU APPLY */}
      {/* ========================= */}
      <section className="w-full lg:sticky lg:top-6">
        <div className="rounded-[10px] border border-[#e8e8e8] bg-white px-[17px] py-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.025)]">
          <h2 className="text-[16px] font-bold leading-[22px] text-[#171717]">
            Before you apply
          </h2>

          {/* Requester */}
          <div className="mt-[19px] flex items-center">
            <div className="flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-full bg-[#e7f3f1] text-[19px] font-medium text-[#247c78]">
              {task.requester.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="ml-[14px] min-w-0">
              <p className="truncate text-[15px] font-semibold leading-[20px] text-[#171717]">
                {task.requester.name}
              </p>

              {task.requester.verified && (
                <div className="mt-[4px] flex items-center gap-[5px] text-[13px] leading-[18px] text-[#2b9895]">
                  <BadgeCheck
                    size={17}
                    strokeWidth={2}
                    className="fill-[#2b9895] text-white"
                  />

                  <span>Verified requester</span>
                </div>
              )}

              <p className="mt-[6px] text-[12px] leading-[17px] text-[#5e5e5e]">
                {task.category} · Assignment #{task.id}
              </p>
            </div>
          </div>

          <div className="my-[20px] h-px bg-[#ededed]" />

          {/* Payment */}
          <div className="space-y-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-[13px] leading-[18px] text-[#252525]">
                {task.payment.label}
              </span>

              <span className="text-[13px] font-medium leading-[18px] text-[#252525]">
                ₹{task.payment.amount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] leading-[18px] text-[#252525]">
                Handoff
              </span>

              <span className="text-[13px] font-medium leading-[18px] text-[#252525]">
                {task.handoff.location}
              </span>
            </div>
          </div>

          <div className="my-[16px] h-px bg-[#ededed]" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-[13px] leading-[18px] text-[#252525]">
              Total you will earn
            </span>

            <span className="text-[18px] font-bold leading-[24px] text-[#f45135]">
              ₹{task.payment.amount.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Note */}
          <div className="mt-[18px]">
            <label
              htmlFor={`application-note-${task.id}`}
              className="text-[13px] leading-[18px] text-[#303030]"
            >
              Your note to {task.requester.name}
            </label>

            <textarea
              id={`application-note-${task.id}`}
              value={note}
              onChange={(event) =>
                setNote(event.target.value.slice(0, 250))
              }
              maxLength={250}
              rows={3}
              className="mt-[7px] block w-full resize-none rounded-[7px] border border-[#dedede] bg-white px-[11px] py-[9px] text-[13px] leading-[18px] text-[#292929] outline-none transition focus:border-[#f45135] focus:ring-1 focus:ring-[#f45135]/20"
            />

            <p className="mt-[7px] text-[11px] leading-[15px] text-[#777]">
              {note.length}/250 characters
            </p>
          </div>

          {/* Apply */}
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="mt-[22px] flex h-[40px] w-full items-center justify-center rounded-[7px] bg-[#f45135] px-4 text-[14px] font-semibold text-white transition hover:bg-[#e9472c] active:scale-[0.99]"
          >
            Apply for this assignment
          </button>

          {/* Success */}
          {submitted && (
            <div className="mt-[16px] flex min-h-[42px] items-center gap-[9px] rounded-[7px] border border-[#bde5d0] bg-[#f6fcf8] px-[12px] text-[13px] leading-[18px] text-[#286843]">
              <CircleCheck
                size={17}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span>
                Application sent ·{" "}
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-medium hover:underline"
                >
                  Check Track Gigs
                </button>
              </span>
            </div>
          )}

          <p className="mt-[18px] text-center text-[10px] leading-[15px] text-[#737373]">
            You can withdraw your application before it's accepted.
          </p>
        </div>
      </section>
    </div>
  </article>
  );
}
