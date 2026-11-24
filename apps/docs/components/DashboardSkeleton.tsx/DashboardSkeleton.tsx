const Bone = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-lg bg-accent/50 ${className}`} />
);

export function DashboardSkeleton() {
  return (
    <div
      role='status'
      aria-busy='true'
      aria-live='polite'
      className='min-h-full px-4 py-6 sm:px-6 lg:px-8'
    >
      <span className='sr-only'>Loading your dashboard</span>

      <div className='mx-auto max-w-5xl animate-pulse motion-reduce:animate-none'>
        {/* Banner */}
        <div className='relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary/30 to-primary/10 px-8 py-9 sm:min-h-[250px]'>
          <div
            aria-hidden
            className='absolute -right-16 -top-24 h-[340px] w-[340px] rounded-full bg-white/30'
          />
          <div className='relative space-y-4'>
            <div className='h-4 w-32 rounded-full bg-white/60' />
            <div className='h-11 w-64 rounded-xl bg-white/70 sm:h-14 sm:w-80' />
            <div className='h-8 w-56 rounded-full bg-white/50' />
            <div className='h-11 w-36 rounded-full bg-white/80' />
          </div>
        </div>

        {/* Stat cards */}
        <div className='mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='min-h-[168px] rounded-2xl bg-white p-5 shadow-sm ring-1 ring-accent/60'
            >
              <Bone className='h-11 w-11 rounded-xl' />
              <Bone className='mt-4 h-8 w-14' />
              <Bone className='mt-2.5 h-3.5 w-24' />
            </div>
          ))}
        </div>

        {/* In progress + This week */}
        <div className='mt-6 grid gap-5 lg:grid-cols-[1.7fr_1fr]'>
          <div className='rounded-3xl bg-white p-6 shadow-sm ring-1 ring-accent/60'>
            <div className='flex items-center justify-between'>
              <Bone className='h-5 w-32' />
              <Bone className='h-4 w-16' />
            </div>

            <div className='mt-5 space-y-4'>
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center gap-4 rounded-2xl bg-background px-4 py-4'
                >
                  <Bone className='h-11 w-11 shrink-0 rounded-xl bg-white' />
                  <div className='flex-1 space-y-2.5'>
                    <Bone className='h-3.5 w-2/3 bg-white' />
                    <Bone className='h-2 w-full rounded-full bg-white' />
                    <Bone className='h-3 w-24 bg-white' />
                  </div>
                  <Bone className='hidden h-5 w-10 bg-white sm:block' />
                  <Bone className='h-7 w-16 rounded-full bg-white' />
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl bg-white p-6 shadow-sm ring-1 ring-accent/60'>
            <Bone className='h-5 w-28' />
            <div className='mt-5 space-y-4'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <Bone className='size-11 shrink-0 rounded-full' />
                  <Bone className='h-3.5 w-40' />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* For you */}
        <div className='mt-8'>
          <div className='flex items-center justify-between'>
            <Bone className='h-5 w-24' />
            <Bone className='h-4 w-16' />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='rounded-2xl border border-orange-100 bg-white p-4'
              >
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Bone className='h-9 w-9 rounded-xl' />
                    <Bone className='h-3 w-16' />
                  </div>
                  <Bone className='h-6 w-14 rounded-full' />
                </div>
                <Bone className='h-4 w-4/5' />
                <Bone className='mt-2 h-4 w-3/5' />
                <div className='mt-4 flex gap-4'>
                  <Bone className='h-3 w-20' />
                  <Bone className='h-3 w-10' />
                </div>
                <div className='mt-4 flex items-center gap-2 border-t border-orange-50 pt-3'>
                  <Bone className='h-7 w-7 rounded-full' />
                  <Bone className='h-3 w-16' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}