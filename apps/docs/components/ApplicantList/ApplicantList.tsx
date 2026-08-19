"use client";

import { useState } from "react";

import type { MyAssignments } from "@/types/myAssignments.types";
import { ApplicantCard } from "@/components/ApplicantCard/ApplicantCard";

interface ApplicantListProps {
  applicants: MyAssignments.Applicant[];
  selectedApplicantId?: number;
  onAcceptApplicant?: (applicant: MyAssignments.Applicant) => void;
}

export function ApplicantList({
  applicants,
  selectedApplicantId,
  onAcceptApplicant,
}: ApplicantListProps) {
  const [selectedId, setSelectedId] = useState<number | undefined>(
    selectedApplicantId
  );

  const handleAccept = (applicant: MyAssignments.Applicant) => {
    setSelectedId(applicant.id);
    onAcceptApplicant?.(applicant);
  };

  if (applicants.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#ddd] bg-white px-5 py-10 text-center">
        <p className="text-[13px] font-medium text-[#444]">
          No applicants yet
        </p>

        <p className="mt-1 text-[12px] text-[#888]">
          People who are interested in completing this assignment will appear
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {applicants.map((applicant) => (
        <ApplicantCard
          key={applicant.id}
          applicant={applicant}
          selected={selectedId === applicant.id}
          disabled={selectedId !== undefined}
          onAccept={handleAccept}
        />
      ))}
    </div>
  );
}