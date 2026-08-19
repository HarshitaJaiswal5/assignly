'use client'

import TrackGigs from "@/components/TrackGigs/TrackGigs";
import { trackGigs } from "@/constants/trackGigs";

export default function TrackGigsPage() {
  return (
    <TrackGigs
      gigs={trackGigs}
      onViewDetails={(gig) => {
        console.log("View gig:", gig.id);
      }}
    />
  );
}