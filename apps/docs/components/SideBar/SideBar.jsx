'use client';

import {
  Home,
  ClipboardList,
  User,
  FileText,
  CircleHelp,
  CircleUserRound,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Make & Earn',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'Track Gigs & Submissions',
    icon: ClipboardList,
    href: '/submissions',
  },
  {
    label: 'My Profile',
    icon: User,
    href: '/profile',
  },
  {
    label: 'My Assignments',
    icon: FileText,
    href: '/assignments',
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white px-4 py-6">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
          <CircleUserRound className="h-5 w-5 text-white" />
        </div>

        <span className="text-xl font-bold tracking-tight text-[#152330]">
          CampusLoop
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <a
              key={item.label}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {/* Active left indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-orange-500" />
              )}

              <Icon
                className={`h-[19px] w-[19px] ${
                  isActive
                    ? 'text-orange-600'
                    : 'text-gray-500 group-hover:text-gray-700'
                }`}
              />

              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto">
        {/* User */}
        <div className="mb-8 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
            AM
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              Aarav Mehta
            </p>

            <p className="text-sm text-gray-500">
              Student
            </p>
          </div>
        </div>

        {/* Help */}
        <a
          href="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50"
        >
          <CircleHelp className="h-5 w-5" />
          <span>Need help?</span>
        </a>
      </div>
    </aside>
  );
}