'use client'

import Profile from "@/components/MyProfilePage/page";
import type { Profile as ProfileType } from "@/types/profile.types";

const profile: ProfileType = {
  id: "user-1",

  name: "Harshita Jaiswal",
  initials: "HJ",

  email: "harshita@example.com",
  phone: "+91 98765 43210",

  location: "Kharadi campus",

  college: "VIT Bhopal University",
  program: "B.Tech · Computer Science",
  year: "4th Year",

  skills: [
    "Programming",
    "Excel",
    "Presentations",
  ],

  verified: true,

  stats: {
    completedGigs: 24,
    rating: 4.9,
    completionRate: 98,
    assignmentsPosted: 12,
  },
};

export default function ProfilePage() {
  return (
    <Profile
      profile={profile}
      onEditProfile={() => {
        console.log("Edit profile");
      }}
    />
  );
}