"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Grid2X2,
  List,
  ChevronDown,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { TaskCard } from "@/components/TaskCard/TaskCard";
import { assignments } from "@/constants/tasks";

export default function Page() {
  const [view, setView] = useState("grid");
  const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/assignments/${id}`);
  };

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-5 sm:px-6 lg:px-8">
      {/* ================= HEADER ================= */}
      <div className="mb-7">
        <h1 className="text-[25px] font-semibold tracking-[-0.5px] text-[#181818]">
          Find work near you
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-[#555]">
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-[#777]" />
            <span>Kharadi campus</span>
          </div>

          <span className="text-[#b5b5b5]">•</span>

          <span>within 3 km</span>

          <span className="mx-2 h-4 w-px bg-[#d8d8d8]" />

          <span>12 tasks match your profile</span>
        </div>
      </div>

      {/* ================= SEARCH + FILTERS ================= */}
      <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center">
        {/* Search */}
        <div className="relative w-full xl:max-w-[365px]">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]"
          />

          <input
            type="text"
            placeholder="Search by task or course"
            className="h-[46px] w-full rounded-xl border border-[#dedede] bg-white pl-11 pr-4 text-[13px] text-[#333] outline-none transition placeholder:text-[#858585] focus:border-[#c85a45]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="h-[42px] rounded-full border border-[#dedede] bg-white px-5 text-[13px] text-[#333] transition hover:border-[#c85a45]">
            Due soon
          </button>

          <button className="h-[42px] rounded-full border border-[#dedede] bg-white px-5 text-[13px] text-[#333] transition hover:border-[#c85a45]">
            Under ₹500
          </button>

          <button className="h-[42px] rounded-full border border-[#dedede] bg-white px-5 text-[13px] text-[#333] transition hover:border-[#c85a45]">
            Within 2 km
          </button>

          {/* Sort */}
          <button className="flex h-[42px] items-center gap-2 rounded-xl border border-[#dedede] bg-white px-4 text-[13px] text-[#333] transition hover:border-[#c85a45] xl:ml-auto">
            <span>Sort: Best match</span>
            <ChevronDown size={16} className="text-[#666]" />
          </button>
        </div>
      </div>

      {/* ================= SECTION HEADER ================= */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-[#202020]">
          Best matches for you
        </h2>

        <div className="flex items-center gap-2">
          {/* Grid */}
          <button
            onClick={() => setView("grid")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              view === "grid"
                ? "bg-[#f7e7e2] text-[#c95740]"
                : "text-[#666] hover:bg-gray-100"
            }`}
          >
            <Grid2X2 size={17} />
          </button>

          {/* List */}
          <button
            onClick={() => setView("list")}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              view === "list"
                ? "bg-[#f7e7e2] text-[#c95740]"
                : "text-[#666] hover:bg-gray-100"
            }`}
          >
            <List size={19} />
          </button>
        </div>
      </div>

      {/* ================= TASKS ================= */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-2.5 lg:grid-cols-2"
            : "flex flex-col gap-2.5"
        }
      >
        {assignments.map((assignment) => (
           <TaskCard
            key={assignment.id}
            task={assignment}
          />
        ))}
      </div>
    </div>
  );
}