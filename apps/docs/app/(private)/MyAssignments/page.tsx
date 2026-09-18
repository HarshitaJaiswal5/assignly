"use client";

import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";

import type { MyAssignments } from "@/types/myAssignments.types";
import type { UploadAssignmentFormData } from "@/types/uploadAssignments.types";

import { AssignmentTabs } from "@/components/AssignmentTabs/assignmentTabs";
import { UploadAssignmentForm } from "@/components/UploadAssignmentForm/UploadAssignmentForm";

import { RequestedAssignmentCard } from "@/components/RequestedAssignmentCards/RequestedAssignmentCard";
import { PostedAssignmentCard } from "@/components/PostedAssignmentCard/PostedAssignmentCard";
import { ApplicantList } from "@/components/ApplicantList/ApplicantList";

import { requestedAssignments } from "@/constants/myAssignments";
import { postedAssignments } from "@/constants/postedAssignments";

export default function MyAssignmentsPage() {
  const [activeTab, setActiveTab] =
    useState<MyAssignments.AssignmentTab>("requested");

  const [showUploadForm, setShowUploadForm] =
    useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState<MyAssignments.PostedAssignment | null>(null);

  // -----------------------------
  // Upload assignment
  // -----------------------------

  const handleUpload = (
    data: UploadAssignmentFormData
  ) => {
    console.log("Assignment to upload:", data);

    // Later:
    // const formData = new FormData();
    // API call here

    setShowUploadForm(false);
  };

  // -----------------------------
  // Applicant review
  // -----------------------------

  const handleReviewApplicants = (
    assignment: MyAssignments.PostedAssignment
  ) => {
    setSelectedAssignment(assignment);
  };

  const handleAcceptApplicant = (
    applicant: MyAssignments.Applicant
  ) => {
    console.log("Accepted applicant:", applicant);

    // Later:
    // API call to accept applicant
  };

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-5 sm:px-6 lg:px-8">

      {/* =====================================
          HEADER
      ====================================== */}

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


      {/* =====================================
          UPLOAD FORM
      ====================================== */}

      {showUploadForm && (
        <section className="mb-8 max-w-3xl">
          <UploadAssignmentForm
            onSubmit={handleUpload}
            onCancel={() => setShowUploadForm(false)}
          />
        </section>
      )}


      {/* =====================================
          TABS
      ====================================== */}

      <div className="mb-5">
        <AssignmentTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>


      {/* =====================================
          REQUESTED ASSIGNMENTS
      ====================================== */}

      {activeTab === "requested" ? (

        <section>

          <div className="mb-3 flex items-center gap-2">

            <ClipboardList
              size={17}
              className="text-[#777]"
            />

            <h2 className="text-[16px] font-semibold text-[#202020]">
              Assignments you requested
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

            {requestedAssignments.map((assignment) => (

              <RequestedAssignmentCard
                key={assignment.id}
                assignment={assignment}
                onViewDetails={(assignment) => {
                  console.log(
                    "View requested assignment",
                    assignment
                  );
                }}
              />

            ))}

          </div>

        </section>

      ) : (

        /* =====================================
           POSTED ASSIGNMENTS
        ====================================== */

        <section>

          <div className="mb-3 flex items-center gap-2">

            <ClipboardList
              size={17}
              className="text-[#777]"
            />

            <h2 className="text-[16px] font-semibold text-[#202020]">
              Assignments you posted
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

            {postedAssignments.map((assignment) => (

              <PostedAssignmentCard
                key={assignment.id}
                assignment={assignment}
                onReviewApplicants={
                  handleReviewApplicants
                }
                onViewDetails={(assignment) => {
                  console.log(
                    "View posted assignment",
                    assignment
                  );
                }}
              />

            ))}

          </div>

        </section>

      )}


      {/* =====================================
          APPLICANT REVIEW
      ====================================== */}

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
            selectedApplicantId={
              selectedAssignment.selectedApplicantId
            }
            onAcceptApplicant={
              handleAcceptApplicant
            }
          />

        </section>

      )}

    </div>
  );
}