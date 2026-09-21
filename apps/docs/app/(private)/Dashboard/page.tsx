'use client'

import Earn from "@/components/Earn/Earn";
import { trackGigs } from "@/constants/trackGigs";

export default function EarnPage() {
  return (
    <Earn
      gigs={trackGigs}
      onViewDetails={(gig) => {
        console.log("View gig:", gig.id);
      }}
    />
  );
}

