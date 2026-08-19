import {
  BadgeCheck,
  CheckCircle2,
  Star,
} from "lucide-react";

import type { MyAssignments } from "@/types/myAssignments.types";

interface ApplicantCardProps {
  applicant: MyAssignments.Applicant;
  selected?: boolean;
  disabled?: boolean;
  onAccept?: (applicant: MyAssignments.Applicant) => void;
}

export function ApplicantCard({
  applicant,
  selected = false,
  disabled = false,
  onAccept,
}: ApplicantCardProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition ${
        selected
          ? "border-[#c95740] bg-[#fff8f5]"
          : "border-[#e3e3e3] bg-white"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f1ece8] text-[13px] font-semibold text-[#555]">
          {applicant.name.charAt(0)}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[13px] font-semibold text-[#222]">
              {applicant.name}
            </span>

            {applicant.verified && (
              <BadgeCheck
                size={15}
                className="shrink-0 text-[#279b91]"
              />
            )}
          </div>

          <div className="mt-1 flex items-center gap-3 text-[11px] text-[#777]">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-[#d99a35] text-[#d99a35]" />
              {applicant.rating}
            </span>

            <span>
              {applicant.completedGigs} gigs completed
            </span>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#279b91]">
          <CheckCircle2 size={15} />
          Accepted
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onAccept?.(applicant)}
          className="shrink-0 rounded-lg bg-[#cc5942] px-3.5 py-2 text-[11px] font-medium text-white transition hover:bg-[#b94d38] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Accept
        </button>
      )}
    </div>
  );
}