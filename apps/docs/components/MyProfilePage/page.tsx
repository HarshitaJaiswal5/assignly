"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";

import type { Profile } from "@/types/profile.types";

interface ProfileProps {
  profile: Profile;
  onEditProfile?: () => void;
}

export default function Profile({
  profile,
  onEditProfile,
}: ProfileProps) {
  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-[25px] font-semibold tracking-[-0.5px] text-[#181818]">
            My profile
          </h1>

          <p className="mt-1.5 text-[13px] text-[#777]">
            Manage your personal information and Assignly profile.
          </p>
        </div>

        {/* Profile Card */}
        <section className="rounded-2xl border border-[#e3e3e3] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#f4eee9] text-[27px] font-semibold text-[#c95740]">
                {profile.initials}
              </div>

              {/* Basic Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[20px] font-semibold text-[#202020]">
                    {profile.name}
                  </h2>

                  {profile.verified && (
                    <span className="flex items-center gap-1 rounded-full bg-[#e7f1ef] px-2 py-1 text-[10px] font-medium text-[#279b91]">
                      <BadgeCheck size={13} />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[13px] text-[#777]">
                  Student · {profile.college}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#666]">
                  <MapPin size={14} />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Edit */}
            <button
              type="button"
              onClick={onEditProfile}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dedede] bg-white px-4 text-[12px] font-medium text-[#333] transition hover:border-[#c95740] hover:text-[#c95740]"
            >
              <Edit3 size={15} />
              Edit profile
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 border-t border-[#eeeeee] pt-5 sm:grid-cols-4">

            <ProfileStat
              icon={<BriefcaseBusiness size={17} />}
              value={profile.stats.completedGigs.toString()}
              label="Gigs completed"
            />

            <ProfileStat
              icon={<Star size={17} />}
              value={profile.stats.rating.toFixed(1)}
              label="Rating"
            />

            <ProfileStat
              icon={<ShieldCheck size={17} />}
              value={`${profile.stats.completionRate}%`}
              label="Completion rate"
            />

            <ProfileStat
              icon={<User size={17} />}
              value={profile.stats.assignmentsPosted.toString()}
              label="Assignments posted"
            />

          </div>
        </section>

        {/* Personal Information */}
        <section className="mt-5 rounded-2xl border border-[#e3e3e3] bg-white">

          <SectionHeader
            title="Personal information"
            description="Your basic account information."
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-[#eeeeee] p-5 sm:grid-cols-2 sm:p-6">

            <InfoItem
              icon={<User size={17} />}
              label="Full name"
              value={profile.name}
            />

            <InfoItem
              icon={<Mail size={17} />}
              label="Email address"
              value={profile.email}
            />

            <InfoItem
              icon={<Phone size={17} />}
              label="Phone number"
              value={profile.phone}
            />

            <InfoItem
              icon={<MapPin size={17} />}
              label="Location"
              value={profile.location}
            />

          </div>
        </section>

        {/* Academic Information */}
        <section className="mt-5 rounded-2xl border border-[#e3e3e3] bg-white">

          <SectionHeader
            title="Academic information"
            description="Information that helps match you with relevant gigs."
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-[#eeeeee] p-5 sm:grid-cols-2 sm:p-6">

            <InfoItem
              icon={<GraduationCap size={17} />}
              label="Institution"
              value={profile.college}
            />

            <InfoItem
              icon={<GraduationCap size={17} />}
              label="Program"
              value={profile.program}
            />

            <InfoItem
              icon={<GraduationCap size={17} />}
              label="Year"
              value={profile.year}
            />

            <InfoItem
              icon={<Star size={17} />}
              label="Skills"
              value={profile.skills.join(", ")}
            />

          </div>
        </section>

        {/* Verification */}
        <section className="mt-5 rounded-2xl border border-[#e3e3e3] bg-white">

          <SectionHeader
            title="Account verification"
            description="Your verified account details."
          />

          <div className="border-t border-[#eeeeee] p-5 sm:p-6">

            <div className="flex items-center justify-between rounded-xl bg-[#f7faf9] px-4 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f1ef] text-[#279b91]">
                  <BadgeCheck size={19} />
                </div>

                <div>
                  <p className="text-[13px] font-medium text-[#292929]">
                    {profile.verified
                      ? "Identity verified"
                      : "Identity not verified"}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#777]">
                    {profile.verified
                      ? "Your account has been successfully verified."
                      : "Complete verification to build trust with other users."}
                  </p>
                </div>

              </div>

              <span
                className={`text-[11px] font-medium ${
                  profile.verified
                    ? "text-[#279b91]"
                    : "text-[#777]"
                }`}
              >
                {profile.verified ? "Verified" : "Not verified"}
              </span>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable UI components                                                     */
/* -------------------------------------------------------------------------- */

function SectionHeader({
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

function InfoItem({
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

function ProfileStat({
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