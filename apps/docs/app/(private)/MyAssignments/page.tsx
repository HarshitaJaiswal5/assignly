"use client";

import { useCallback, useState } from "react";
import { Plus, ClipboardList } from "lucide-react";

import type { MyAssignments } from "@/types/myAssignments.types";
import type { UploadAssignmentFormData } from "@/types/uploadAssignments.types";
import type {
  GigApplicationReceivedPayload,
  GigApplicationRejectedPayload,
} from "@/types/socket.types";

import { AssignmentTabs } from "@/components/AssignmentTabs/assignmentTabs";
import { UploadAssignmentForm } from "@/components/UploadAssignmentForm/UploadAssignmentForm";
import { RequestedAssignmentCard } from "@/components/RequestedAssignmentCards/RequestedAssignmentCard";
import { PostedAssignmentCard } from "@/components/PostedAssignmentCard/PostedAssignmentCard";
import { ApplicantList } from "@/components/ApplicantList/ApplicantList";

import { requestedAssignments } from "@/constants/myAssignments";
import { postedAssignments } from "@/constants/postedAssignments";

import { useApplicationEvents } from "@/hooks/application/useApplicationEvents";

export default function MyAssignmentsPage() {
  const [activeTab, setActiveTab] =
    useState<MyAssignments.AssignmentTab>("requested");

  const [showUploadForm, setShowUploadForm] = useState(false);

  const [postedAssignmentsState, setPostedAssignmentsState] =
    useState<MyAssignments.PostedAssignment[]>(() => postedAssignments);

  const [selectedAssignmentId, setSelectedAssignmentId] =
    useState<string | null>(null);

  const selectedAssignment =
    postedAssignmentsState.find(
      (assignment) => assignment._id === selectedAssignmentId,
    ) ?? null;

  // Socket.IO: a new application was received.
  const handleApplicationReceived = useCallback(
    (payload: GigApplicationReceivedPayload) => {
      console.log("New application received:", payload);

      setPostedAssignmentsState((currentAssignments) => {
        const assignmentExists = currentAssignments.some(
          (assignment) => assignment.id === payload.gigId,
        );

        if (!assignmentExists) {
          return currentAssignments;
        }

        // The event has arrived and the matching assignment exists.
        // Add the applicant here after mapping the backend payload
        // to the actual MyAssignments.Applicant type.
        return currentAssignments;
      });
    },
    [],
  );

  // Socket.IO: an application was rejected.
  const handleApplicationRejected = useCallback(
    (payload: GigApplicationRejectedPayload) => {
      console.log("Application rejected:", payload);

      // Update application state here if this page needs to reflect
      // rejection events. Confirm the Applicant type and payload first.
    },
    [],
  );

  useApplicationEvents({
    onApplicationReceived: handleApplicationReceived,
    onApplicationRejected: handleApplicationRejected,
  });

  // Upload assignment
  const handleUpload = (data: UploadAssignmentFormData) => {
    console.log("Assignment to upload:", data);

    // Later: submit data to the backend API.
    setShowUploadForm(false);
  };

  // Applicant review
  const handleReviewApplicants = (
    assignment: MyAssignments.PostedAssignment,
  ) => {
    setSelectedAssignmentId(assignment._id);
  };

  const handleAcceptApplicant = (
    applicant: MyAssignments.Applicant,
  ) => {
    console.log("Selected applicant:", applicant);

    // Later: call the backend API to accept the applicant.
  };

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-5 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[25px] font-semibold tracking-[-0.5px] text-[#181818]">
            My Assignments
          </h1>

          <p className="mt-1.5 text-[13px] text-[#777]">
            Manage assignments you requested and assignments you posted.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadForm(true)}
          className="flex w-fit items-center gap-2 rounded-xl bg-[#cc5942] px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-[#b94d38]"
        >
          <Plus size={16} />
          Upload assignment
        </button>
      </div>

      {/* UPLOAD FORM */}
      {showUploadForm && (
        <section className="mb-8 max-w-3xl">
          <UploadAssignmentForm
            onSubmit={handleUpload}
            onCancel={() => setShowUploadForm(false)}
          />
        </section>
      )}

      {/* TABS */}
      <div className="mb-5">
        <AssignmentTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* REQUESTED ASSIGNMENTS */}
      {activeTab === "requested" ? (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <ClipboardList size={17} className="text-[#777]" />

            <h2 className="text-[16px] font-semibold text-[#202020]">
              Assignments you requested
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {requestedAssignments.map((assignment) => (
              <RequestedAssignmentCard
                key={assignment._id}
                assignment={assignment}
                onViewDetails={(assignment) => {
                  console.log("View requested assignment", assignment);
                }}
              />
            ))}
          </div>
        </section>
      ) : (
        /* POSTED ASSIGNMENTS */
        <section>
          <div className="mb-3 flex items-center gap-2">
            <ClipboardList size={17} className="text-[#777]" />

            <h2 className="text-[16px] font-semibold text-[#202020]">
              Assignments you posted
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {postedAssignmentsState.map((assignment) => (
              <PostedAssignmentCard
                key={assignment._id}
                assignment={assignment}
                onReviewApplicants={handleReviewApplicants}
                onViewDetails={(assignment) => {
                  console.log("View posted assignment", assignment);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* APPLICANT REVIEW */}
      {selectedAssignment && (
        <section className="mt-8 max-w-2xl">
          <div className="mb-4">
            <h2 className="text-[17px] font-semibold text-[#202020]">
              Review applicants
            </h2>

            <p className="mt-1 text-[12px] text-[#777]">
              Choose one person to complete{" "}
              <span className="font-medium text-[#444]">
                {selectedAssignment.title}
              </span>
              .
            </p>
          </div>

          <ApplicantList
            applicants={selectedAssignment.applicants}
            selectedApplicantId={selectedAssignment.selectedApplicantId}
            onAcceptApplicant={handleAcceptApplicant}
          />
        </section>
      )}
    </div>
  );
}
