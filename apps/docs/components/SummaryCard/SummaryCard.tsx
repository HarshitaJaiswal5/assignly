export function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#e3e3e3] bg-white px-4 py-3">

      <div className="flex items-center gap-2 text-[#c95740]">
        {icon}

        <span className="text-[11px] text-[#777]">
          {label}
        </span>
      </div>

      <p className="mt-1 text-[20px] font-semibold text-[#202020]">
        {value}
      </p>

    </div>
  );
}