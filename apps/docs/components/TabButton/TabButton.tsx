export function TabButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 pb-3 text-[13px] font-medium transition ${
        active
          ? "text-[#c95740]"
          : "text-[#777] hover:text-[#333]"
      }`}
    >

      {label}

      <span
        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] ${
          active
            ? "bg-[#f7e7e2] text-[#c95740]"
            : "bg-[#eeeeee] text-[#777]"
        }`}
      >
        {count}
      </span>

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#c95740]" />
      )}

    </button>
  );
}