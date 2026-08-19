import React from "react";

export function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f3f0] text-[#777]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-[#888]">
          {label}
        </p>

        <p className="mt-1 truncate text-[13px] font-medium text-[#292929]">
          {value}
        </p>
      </div>

    </div>
  );
}
