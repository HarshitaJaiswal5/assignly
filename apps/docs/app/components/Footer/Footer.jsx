export default function Footer() {
  return (
    <footer className='border-t border-black/[0.06] bg-[#fffdf9]'>
      <div className='mx-auto max-w-7xl px-30'>
        {/* Main footer */}
        <div className='flex items-start justify-between py-14 pr-30'>
          {/* Brand */}
          <div className='max-w-md '>
            <a
              href='/'
              className='inline-block text-2xl font-bold tracking-tight text-[#152330]'
            >
              CampusLoop
            </a>

            <p className='mt-4 max-w-sm text-sm leading-6 text-gray-500'>
              A simpler way to find, manage, and complete campus work — without
              the unnecessary back-and-forth.
            </p>

            <a
              href='#how-it-works'
              className='group mt-6 inline-flex items-center text-sm font-semibold text-[#152330] transition-colors hover:text-[#F45124]'
            >
              See how it works
              <span className='ml-2 transition-transform duration-200 group-hover:translate-x-1'>
                →
              </span>
            </a>
          </div>

          {/* Links */}
          <div className='flex gap-24'>
            {/* Product */}
            <div>
              <h3 className='text-sm font-semibold text-[#152330]'>Product</h3>

              <div className='mt-5 flex flex-col gap-3'>
                <a
                  href='#how-it-works'
                  className='w-fit text-sm text-gray-500 transition-colors hover:text-[#F45124]'
                >
                  How it works
                </a>

                <a
                  href='#find-work'
                  className='w-fit text-sm text-gray-500 transition-colors hover:text-[#F45124]'
                >
                  Find work
                </a>

                <a
                  href='#post-assignment'
                  className='w-fit text-sm text-gray-500 transition-colors hover:text-[#F45124]'
                >
                  Post an assignment
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className='text-sm font-semibold text-[#152330]'>Company</h3>

              <div className='mt-5 flex flex-col gap-3'>
                <a
                  href='#about'
                  className='w-fit text-sm text-gray-500 transition-colors hover:text-[#F45124]'
                >
                  About
                </a>

                <a
                  href='#help'
                  className='w-fit text-sm text-gray-500 transition-colors hover:text-[#F45124]'
                >
                  Help center
                </a>

                <a
                  href='#contact'
                  className='w-fit text-sm text-gray-500 transition-colors hover:text-[#F45124]'
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='flex flex-col gap-10 border-t border-black/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xs text-gray-400'>
            © {new Date().getFullYear()} CampusLoop. All rights reserved.
          </p>

          <div className='flex items-center gap-6'>
            <a
              href='#terms'
              className='text-xs text-gray-400 transition-colors hover:text-[#152330]'
            >
              Terms
            </a>

            <a
              href='#privacy'
              className='text-xs text-gray-400 transition-colors hover:text-[#152330]'
            >
              Privacy
            </a>

            <a
              href='#cookies'
              className='text-xs text-gray-400 transition-colors hover:text-[#152330]'
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
