import { ArrowUpRight, CalendarDays, Users } from 'lucide-react';
import { formatDeliveryDate } from '@/utils/formatDate';
import { getInitials } from '@/utils/getInitials';
import { avatarColors } from '@/constants/avatarColors';
import { categoryConfig } from '@/constants/categoryConfig';
import { GigCategory } from '@/types/dashboard.types';
import Link from 'next/link';

export type GigCardData = {
  id: string | number;
  title: string;
  category: string;
  amount: number;
  deliveryDate: string;
  applicantsCount?: number | null;
  user: { name: string };
};

type GigCardProps = {
  gig: GigCardData;
  index?: number;
  className?: string;
};

const colorFromId = (id: string | number) =>
  [...String(id)].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
  avatarColors.length;

export function GigCard({ gig, index, className = '' }: GigCardProps) {
  console.log(gig);
  
  const normalizedCategory = String(gig.category)
    .toUpperCase()
    .replace(/[\s-]+/g, '_');
  const categoryKey = normalizedCategory as keyof typeof categoryConfig;

  const config =
    categoryConfig[categoryKey] ?? categoryConfig[GigCategory.OTHERS];

  const Icon = config.icon;

  const avatarBg =
    avatarColors[(index ?? colorFromId(gig.id)) % avatarColors.length];

  const firstName = gig.user.name.trim().split(/\s+/)[0];

  return (
    <div
      className={`group min-h-[184px] rounded-[28px] border border-orange-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      {/* Icon + Amount */}
      <div className='mb-4 flex items-start justify-between'>
        <div
          className={`flex size-12 items-center justify-center rounded-2xl ${config.iconBg}`}
        >
          <Icon size={20} className={config.iconColor} />
        </div>

        <span className='rounded-full bg-[#F45124] px-3.5 py-1.5 text-sm font-bold text-white'>
          ₹{gig.amount.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Title */}
      <h3 className='mb-2.5 line-clamp-1 text-base font-bold text-[#152330]'>
        {gig.title}
      </h3>

      {/* Category + Deadline + Applicants */}
      <div className='mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500'>
        <span className='rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-[#F45124]'>
          {gig.category}
        </span>

        <span className='flex items-center gap-1.5'>
          <CalendarDays size={14} className='text-[#F45124]' />
          {formatDeliveryDate(gig.deliveryDate)}
        </span>

        <span className='flex items-center gap-1.5'>
          <Users size={14} className='text-[#F45124]' />
          {gig.applicantsCount ?? 0}
        </span>
      </div>

      {/* Posted by */}
      <div className='flex items-center gap-2 border-t border-orange-100 pt-3 pr-3'>
        <span
          className={`flex size-7 items-center justify-center rounded-full text-[10px] font-bold text-[#152330] ${avatarBg}`}
        >
          {getInitials(gig.user.name)}
        </span>

        <span className='text-xs font-medium text-[#152330]'>{firstName}</span>

        <Link
          href={`/Assignment/${gig.id}`}
          className='group ml-auto flex items-center text-[#F45124]'
        >
          <ArrowUpRight
            size={18}
            className='transition-transform group-hover:translate-x-1 group-hover:-translate-y-1'
          />
        </Link>
      </div>
    </div>
  );
}

/* ---------- Loading skeleton ---------- */
export function GigCardSkeleton() {
  return (
    <div
      aria-hidden='true'
      className='h-[184px] animate-pulse rounded-[28px] border border-orange-100 bg-white p-6 motion-reduce:animate-none'
    />
  );
}

export default GigCard;
