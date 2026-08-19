export function ProfileStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 border-r border-[#eeeeee] px-3 py-1 last:border-r-0">

      <div className="text-[#c95740]">
        {icon}
      </div>

      <div>
        <p className="text-[16px] font-semibold text-[#202020]">
          {value}
        </p>

        <p className="text-[10px] text-[#777]">
          {label}
        </p>
      </div>

    </div>
  );
}