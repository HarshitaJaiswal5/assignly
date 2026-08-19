import {
  Search,
  Plus,
  ShieldCheck,
  IndianRupee,
  UserRoundCheck,
  FilePlus2,
  CircleCheck,
  ChevronRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import heroPic from '@/public/heroPic.png';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Clear expectations',
    description:
      'Assinly keeps small academic tasks organized, understandable, and easier to complete responsibly.',
    icon: ShieldCheck,
    iconClass: 'text-[#F45124]',
    bgClass: 'bg-[#fff0ea]',
  },
  {
    title: 'Fair, visible pay',
    description:
      'Assinly keeps small academic tasks organized, understandable, and easier to complete responsibly.',
    icon: IndianRupee,
    iconClass: 'text-[#d99a19]',
    bgClass: 'bg-[#fff6e5]',
  },
  {
    title: 'One accepted helper',
    description:
      'Assinly keeps small academic tasks organized, understandable, and easier to complete responsibly.',
    icon: UserRoundCheck,
    iconClass: 'text-[#4d9d88]',
    bgClass: 'bg-[#eaf7f3]',
  },
];

export function HomePage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: index * 0.7,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className='font-[family-name:var(--font-rethink-sans)] min-h-screen overflow-hidden bg-[#fffdf9]'>
      <section className='bg-amber-50  mx-auto max-w-[1500px] px-15 py-8 lg:px-22'>
        <div className='grid items-center gap-13 lg:grid-cols-[0.85fr_1.15fr]'>
          {/* LEFT CONTENT */}
          <div className='max-w-[560px]'>
            <p className='px-2 text-sm font-bold tracking-wide text-[#F45124]'>
              MADE FOR CAMPUS LIFE
            </p>

            <h1 className='mt-5 text-5xl font-black leading-[1.03] tracking-[-0.035em] text-[#152330] sm:text-6xl xl:text-[64px]'>
              Campus work,
              <br />
              without the
              <br />
              back-and-forth
            </h1>

            <p className='mt-6 max-w-[500px] text-[17px] font-medium leading-7 text-[#52606d]'>
              Find reliable academic-support tasks near you,
              <br className='hidden sm:block' />
              or post work and choose the right student to help.
            </p>

            {/* ACTIONS */}
            <div className='mt-7 flex flex-wrap gap-4'>
              <button
                className='
                  flex items-center justify-center gap-2
                  rounded-md
                  bg-[#F45124]
                  px-6 py-4
                  text-[15px] font-semibold text-white
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#e94419]
                  hover:shadow-lg
                '
              >
                <Search size={19} strokeWidth={2.2} />
                Find work near me
              </button>

              <button
                className='
                  flex items-center justify-center gap-2
                  rounded-md
                  border border-[#F45124]
                  bg-transparent
                  px-6 py-4
                  text-[15px] font-semibold text-[#F45124]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#fff1ec]
                '
              >
                <Plus size={19} strokeWidth={2.2} />
                Post an assignment
              </button>
            </div>

            {/* FEATURES */}
            <div className='mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px] font-medium text-[#6b7280]'>
              <span className='flex items-center gap-2'>
                <ShieldCheck
                  size={18}
                  strokeWidth={1.8}
                  className='text-[#a6aaa8]'
                />
                Clear briefs
              </span>

              <span className='text-[#c7c7c7]'>•</span>

              <span className='flex items-center gap-2'>
                <IndianRupee
                  size={17}
                  strokeWidth={1.8}
                  className='text-[#a6aaa8]'
                />
                Visible pay
              </span>

              <span className='text-[#c7c7c7]'>•</span>

              <span className='flex items-center gap-2'>
                <UserRoundCheck
                  size={18}
                  strokeWidth={1.8}
                  className='text-[#a6aaa8]'
                />
                One reliable handoff
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className='relative '>
            <div
              className='
                relative
                h-[150px]
                overflow-hidden
                rounded-[4px]
                p-2
                lg:h-[500px]
                xl:h-[540px]
              '
            >
              <Image src={heroPic} alt='Campus workspace' />
            </div>
          </div>
        </div>
      </section>

      <section
        id='how-it-works'
        className='border-y border-black/[0.05] bg-white'
      >
        <div className='mx-auto max-w-7xl px-8 py-12 lg:px-16'>
          <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]'>
            {/* STEP 1 */}
            <div className='flex justify-center'>
              <div className='flex items-start gap-5'>
                <div className='flex shrink-0 flex-col items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0ea] text-2xl font-bold text-[#F45124]'>
                    1
                  </div>

                  <FilePlus2
                    size={42}
                    strokeWidth={1.5}
                    className='text-[#F45124]'
                  />
                </div>

                <div className='pt-1'>
                  <h3 className='text-[17px] font-bold text-[#152330]'>
                    Post or browse
                  </h3>

                  <p className='mt-3 text-[15px] leading-6 text-[#68727d]'>
                    Start with a clear task,
                    <br />
                    pay, and deadline.
                  </p>
                </div>
              </div>
            </div>

            {/* ARROW 1 */}
            <ChevronRight
              size={32}
              strokeWidth={3}
              className='hidden text-[#dedede] md:block'
              color='#F45124'
            />

            {/* STEP 2 */}
            <div className='flex justify-center'>
              <div className='flex items-start gap-5'>
                <div className='flex shrink-0 flex-col items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#fff6e5] text-2xl font-bold text-[#d99a19]'>
                    2
                  </div>

                  <UserRoundCheck
                    size={42}
                    strokeWidth={1.5}
                    className='text-[#d99a19]'
                  />
                </div>

                <div className='pt-1'>
                  <h3 className='text-[17px] font-bold text-[#152330]'>
                    Match with confidence
                  </h3>

                  <p className='mt-3 text-[15px] leading-6 text-[#68727d]'>
                    Review the details and
                    <br />
                    connect with the right
                    <br />
                    student.
                  </p>
                </div>
              </div>
            </div>

            {/* ARROW 2 */}
            <ChevronRight
              size={32}
              strokeWidth={3}
              className='hidden text-[#dedede] md:block'
              color='#F45124'
            />

            {/* STEP 3 */}
            <div className='flex justify-center'>
              <div className='flex items-start gap-5'>
                <div className='flex shrink-0 flex-col items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf7f3] text-2xl font-bold text-[#4d9d88]'>
                    3
                  </div>

                  <CircleCheck
                    size={42}
                    strokeWidth={1.5}
                    className='text-[#4d9d88]'
                  />
                </div>

                <div className='pt-1'>
                  <h3 className='text-[17px] font-bold text-[#152330]'>
                    Finish smoothly
                  </h3>

                  <p className='mt-3 text-[15px] leading-6 text-[#68727d]'>
                    Track the handoff and
                    <br />
                    confirm the work is
                    <br />
                    complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className='overflow-hidden bg-[#fffdf9] px-6 py-16'
      >
        <div className='mx-auto max-w-4xl'>
          <div className='overflow-hidden rounded-2xl border border-black/[0.06] bg-white'>
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title}>
                  <div className='feature-card flex items-center gap-10 px-7 py-7 sm:px-10'>
                    {/* ICON */}
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${feature.bgClass}`}
                    >
                      <Icon
                        size={30}
                        strokeWidth={1.7}
                        className={feature.iconClass}
                      />
                    </div>

                    {/* CONTENT */}
                    <div>
                      <h3 className='text-[17px] font-bold text-[#152330]'>
                        {feature.title}
                      </h3>

                      <p className='mt-2 max-w-2xl text-[14px] leading-6 text-[#68727d]'>
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {index < features.length - 1 && (
                    <div className='mx-7 h-px bg-black/[0.06] sm:mx-10' />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
