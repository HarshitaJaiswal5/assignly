export function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-5 py-5 sm:px-6">
      <h2 className="text-[15px] font-semibold text-[#202020]">
        {title}
      </h2>

      <p className="mt-1 text-[12px] text-[#777]">
        {description}
      </p>
    </div>
  );
}


