import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#dcdcdc] bg-white px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4eee9] text-[#c95740]">
        <SearchX size={21} />
      </div>

      <h3 className="mt-4 text-[14px] font-semibold text-[#292929]">
        No gigs found
      </h3>

      <p className="mx-auto mt-1.5 max-w-sm text-[12px] leading-5 text-[#888]">
        Try adjusting your search or filters to find more gigs.
      </p>
    </div>
  );
}