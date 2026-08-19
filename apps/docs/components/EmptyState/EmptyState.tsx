import { Clock3, History } from "lucide-react";

export type TrackTab = "ongoing" | "past";

export function EmptyState({
  tab,
}: {
  tab: TrackTab;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#dcdcdc] bg-white px-5 py-14 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4eee9] text-[#c95740]">
        {tab === "ongoing" ? (
          <Clock3 size={21} />
        ) : (
          <History size={21} />
        )}
      </div>

      <h3 className="mt-4 text-[14px] font-semibold text-[#292929]">
        {tab === "ongoing"
          ? "No ongoing gigs"
          : "No past gigs"}
      </h3>

      <p className="mx-auto mt-1.5 max-w-sm text-[12px] leading-5 text-[#888]">
        {tab === "ongoing"
          ? "Assignments you accept will appear here."
          : "Your completed and failed gigs will appear here."}
      </p>

    </div>
  );
}