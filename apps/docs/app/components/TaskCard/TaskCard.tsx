import { Clock3, MapPin, ShieldCheck } from "lucide-react";
import type { TaskCardProps } from "@/types/taskCard.types";

const iconStyles = {
  orange: "bg-[#f7e9e5] text-[#d26a55]",
  yellow: "bg-[#f5efe1] text-[#b18a3a]",
  green: "bg-[#e8f1ed] text-[#66877b]",
  purple: "bg-[#eeeaf3] text-[#8c7ca2]",
  blue: "bg-[#e8eff4] text-[#7190a3]",
};

export function TaskCard({
  task,
  onViewDetails,
}: TaskCardProps) {
  const Icon = task.icon;

  return (
    <article className="group rounded-xl border border-[#e5e5e5] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition hover:border-[#d7d7d7] hover:shadow-md">
      <div className="flex gap-3.5">
        {/* Icon */}
        <div
          className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconStyles[task.iconType]}`}
        >
          <Icon size={22} strokeWidth={1.7} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Title + Price */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="pr-2 text-[14px] font-semibold leading-5 text-[#202020]">
              {task.title}
            </h3>

            <div className="shrink-0 rounded-lg bg-[#f1eee9] px-3 py-1.5 text-center">
              <div className="text-[13px] font-semibold text-[#272727]">
                {task.price}
              </div>

              <div className="text-[10px] leading-3 text-[#555]">
                total
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-0.5 max-w-[330px] text-[12px] leading-[18px] text-[#686868]">
            {task.description}
          </p>

          {/* Due date */}
          <div
            className={`mt-2.5 flex items-center gap-1.5 text-[11px] ${
              task.urgent ? "text-[#dc6048]" : "text-[#a56d17]"
            }`}
          >
            <Clock3 size={13} strokeWidth={2} />
            <span>{task.due}</span>
          </div>

          {/* Location */}
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#555]">
            <MapPin size={13} strokeWidth={1.8} />

            <span>
              {task.location} · {task.distance}
            </span>
          </div>

          {/* Requester + Action */}
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5 text-[11px]">
              <ShieldCheck
                size={14}
                fill="#4d9d92"
                strokeWidth={0}
              />

              <span className="truncate text-[#4d837b]">
                {task.requester}
              </span>

              <span className="shrink-0 text-[#4d837b]">
                · Verified requester
              </span>
            </div>

            <button
              onClick={() => onViewDetails?.(task)}
              className="shrink-0 rounded-lg bg-[#d95b46] px-3.5 py-2 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#c94e3a]"
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}