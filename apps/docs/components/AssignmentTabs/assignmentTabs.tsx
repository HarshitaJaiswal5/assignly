"use client";

import type { MyAssignments } from "@/types/myAssignments.types";

interface AssignmentTabsProps {
  activeTab: MyAssignments.AssignmentTab;
  onTabChange: (tab: MyAssignments.AssignmentTab) => void;
}

export function AssignmentTabs({
  activeTab,
  onTabChange,
}: AssignmentTabsProps) {
  return (
    <div className="flex w-fit items-center rounded-xl border border-[#e3e3e3] bg-white p-1">
      <button
        type="button"
        onClick={() => onTabChange("requested")}
        className={`rounded-lg px-5 py-2.5 text-[13px] font-medium transition ${
          activeTab === "requested"
            ? "bg-[#f7e7e2] text-[#c95740]"
            : "text-[#666] hover:text-[#333]"
        }`}
      >
        Requested
      </button>

      <button
        type="button"
        onClick={() => onTabChange("posted")}
        className={`rounded-lg px-5 py-2.5 text-[13px] font-medium transition ${
          activeTab === "posted"
            ? "bg-[#f7e7e2] text-[#c95740]"
            : "text-[#666] hover:text-[#333]"
        }`}
      >
        Posted
      </button>
    </div>
  );
}