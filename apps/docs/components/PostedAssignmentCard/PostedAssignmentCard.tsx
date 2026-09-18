import {
  Clock3,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";

import type { MyAssignments } from "@/types/myAssignments.types";

interface PostedAssignmentCardProps {
  assignment: MyAssignments.PostedAssignment;
  onReviewApplicants?: (assignment: MyAssignments.PostedAssignment) => void;
  onViewDetails?: (assignment: MyAssignments.PostedAssignment) => void;
}

const statusStyles: Record<MyAssignments.Status, string> = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-blue-50 text-blue-700",
  submitted: "bg-purple-50 text-purple-700",
  completed: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
};

export function PostedAssignmentCard({
  assignment,
  onReviewApplicants,
  onViewDetails,
}: PostedAssignmentCardProps) {
  return (
    <article className="rounded-xl border border-[#e3e3e3] bg-white p-4 transition hover:border-[#d6b0a5] hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span
            className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium capitalize ${
              statusStyles[assignment.status]
            }`}
          >
            {assignment.status}
          </span>

          <h3 className="mt-2 text-[15px] font-semibold text-[#202020]">
            {assignment.title}
          </h3>

          <p className="mt-1 text-[12.5px] leading-[19px] text-[#777]">
            {assignment.description}
          </p>
        </div>

        <div className="shrink-0 rounded-lg bg-[#f4eee9] px-3 py-1.5 text-center">
          <p className="text-[13px] font-semibold text-[#222]">
            ₹{assignment.payment.amount}
          </p>

          <p className="text-[10px] text-[#777]">
            {assignment.payment.label}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#666]">
        <span className="flex items-center gap-1.5">
          <Clock3 size={14} className="text-[#c95740]" />
          {assignment.due.date} · {assignment.due.time}
        </span>

        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {assignment.location}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#eeeeee] pt-3">
        <div className="flex items-center gap-1.5 text-[12px] text-[#555]">
          <Users size={15} />

          <span>
            {assignment.applicants.length}{" "}
            {assignment.applicants.length === 1
              ? "applicant"
              : "applicants"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onViewDetails?.(assignment)}
            className="text-[11px] font-medium text-[#666] hover:text-[#333]"
          >
            View details
          </button>

          {assignment.applicants.length > 0 && (
            <button
              type="button"
              onClick={() => onReviewApplicants?.(assignment)}
              className="flex items-center gap-1 text-[11px] font-medium text-[#c95740] hover:text-[#b94d38]"
            >
              Review applicants
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}