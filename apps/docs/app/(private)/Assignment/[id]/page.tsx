'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Archive,
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  CloudUpload,
  Code2,
  Coins,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Flame,
  Gauge,
  GraduationCap,
  Hourglass,
  ListChecks,
  Loader2,
  MapPin,
  MessageCircle,
  Paperclip,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Dummy data (replace with your API response)                        */
/* ------------------------------------------------------------------ */

type Role = 'visitor' | 'applied' | 'assigned' | 'poster';

type RefFile = {
  name: string;
  size: string;
  kind: 'pdf' | 'zip';
  url: string;
};

const gig = {
  id: 'GIG-2048',
  category: 'DSA',
  status: 'Open',
  title: 'Graph problems tutoring',
  postedAgo: 'Posted 2d ago',
  distance: '0.4 km',
  reward: 500,
  deadline: 'Jun 12',
  deadlineTime: '6:00 PM',
  daysLeft: 6,
  overview:
    'Help me master graph algorithms before my exam. Walk through 10 BFS, DFS and shortest-path problems, with clear explanations.',
  outcome: 'I can solve graph questions on my own.',
  effort: '4 hrs',
  level: 'Medium',
  spots: 1,
  applicants: 7,
  deliveryAddress: 'Central Library, Block B, Main Campus',
  skills: [
    { label: 'DSA', icon: Code2, cls: 'bg-accent/50 text-primary' },
    { label: 'Graphs', icon: Sparkles, cls: 'bg-purple-50 text-purple-600' },
    {
      label: 'Teaching',
      icon: GraduationCap,
      cls: 'bg-amber-50 text-amber-600',
    },
  ],
  tools: [
    { label: 'Python', cls: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
    { label: 'Java', cls: 'bg-accent/50 text-primary', dot: 'bg-primary' },
    { label: 'Meet', cls: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
  ],
  deliverables: [
    'Solved problem set (PDF)',
    'Source code (ZIP)',
    'Short notes on each approach',
  ],
  guidelines: [
    'Original work only',
    'Meet on campus or online',
    'Submit before deadline',
  ],
  eligibility: [
    { text: 'CSE / IT students', icon: GraduationCap, cls: 'text-primary' },
    { text: 'Rating 4.0+', icon: Star, cls: 'text-amber-500' },
    { text: 'Verified profile', icon: BadgeCheck, cls: 'text-blue-500' },
  ],
  files: [
    {
      name: 'problem-set.pdf',
      size: '1.2 MB',
      kind: 'pdf',
      url: '/files/problem-set.pdf',
    },
    {
      name: 'starter-code.zip',
      size: '3.4 KB',
      kind: 'zip',
      url: '/files/starter-code.zip',
    },
  ] as RefFile[],
};

const poster = {
  name: 'Arjun Mehta',
  initials: 'AM',
  avatarBg: 'bg-cyan-200',
  branch: 'CSE',
  year: 'Year 3',
  rating: 4.8,
  gigs: 22,
  distance: '0.4 km',
};

const formatINR = (value: number) => `₹${value.toLocaleString('en-IN')}`;

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

const tap =
  'touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';

function Card({
  title,
  icon: Icon,
  children,
  className = '',
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl bg-white p-5 shadow-sm ring-1 ring-accent/60 sm:p-6 ${className}`}
    >
      <h2 className='flex items-center gap-2.5 text-sm font-bold text-foreground'>
        <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-accent/50'>
          <Icon size={14} className='text-primary' />
        </span>
        {title}
      </h2>
      <div className='mt-4'>{children}</div>
    </section>
  );
}

function Avatar({
  initials,
  bg,
  size = 'h-6 w-6 text-[10px]',
}: {
  initials: string;
  bg: string;
  size?: string;
}) {
  // PLACEHOLDER: swap for <Image> when you have photos
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-foreground ${bg} ${size}`}
    >
      {initials}
    </span>
  );
}

function Toast({ message }: { message: string | null }) {
  return (
    <div
      role='status'
      aria-live='polite'
      className='pointer-events-none fixed inset-x-0 top-4 z-[200] flex justify-center px-4'
    >
      {message && (
        <div className='flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold text-white shadow-xl'>
          <CheckCircle2 size={14} className='text-green-400' />
          {message}
        </div>
      )}
    </div>
  );
}

/** Bottom sheet on phones, centred dialog on larger screens */
function Modal({
  label,
  onClose,
  children,
  className = 'max-w-md',
}: {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-[100] flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center sm:p-4'
      onMouseDown={onClose}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label={label}
        onMouseDown={(e) => e.stopPropagation()}
        className={`w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PDF viewer                                                         */
/* ------------------------------------------------------------------ */

function PdfViewer({ file, onClose }: { file: RefFile; onClose: () => void }) {
  return (
    <Modal
      label={`Preview of ${file.name}`}
      onClose={onClose}
      className='flex h-[88vh] max-w-4xl flex-col'
    >
      <div className='flex items-center justify-between gap-3 border-b border-accent/60 px-4 py-3 sm:px-5'>
        <div className='flex min-w-0 items-center gap-3'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500'>
            <FileText size={17} />
          </span>
          <div className='min-w-0'>
            <p className='truncate text-sm font-bold text-foreground'>
              {file.name}
            </p>
            <p className='text-xs text-foreground/50'>{file.size}</p>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-2'>
          <a
            href={file.url}
            target='_blank'
            rel='noopener noreferrer'
            className={`hidden items-center gap-1.5 rounded-full bg-accent/50 px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:bg-accent sm:inline-flex ${tap}`}
          >
            <ExternalLink size={13} />
            Open in new tab
          </a>
          <a
            href={file.url}
            download={file.name}
            className={`inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-dark active:scale-95 ${tap}`}
          >
            <Download size={13} />
            Download
          </a>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close preview'
            className={`flex h-10 w-10 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-background hover:text-primary ${tap}`}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className='relative flex-1 bg-background'>
        <iframe src={file.url} title={file.name} className='h-full w-full' />
        {/* Sits behind the iframe; only visible if the PDF can't render */}
        <p className='pointer-events-none absolute inset-0 -z-10 flex items-center justify-center px-6 text-center text-sm text-foreground/50'>
          Can&apos;t preview this file here. Use &quot;Open in new tab&quot; or
          Download.
        </p>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Apply sheet (collects negotiated price)                            */
/* ------------------------------------------------------------------ */

function ApplySheet({
  reward,
  onClose,
  onSubmit,
}: {
  reward: number;
  onClose: () => void;
  onSubmit: (price: number) => Promise<void>;
}) {
  const [price, setPrice] = useState(String(reward));
  const [submitting, setSubmitting] = useState(false);

  const value = Number(price);
  const valid = Number.isInteger(value) && value > 0;
  const isCounter = valid && value !== reward;

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(value);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal label='Apply to this gig' onClose={onClose}>
      <div className='p-6'>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <h2 className='text-lg font-extrabold text-foreground'>
              Apply to this gig
            </h2>
            <p className='mt-1 text-sm text-foreground/60'>{gig.title}</p>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close'
            className={`-mr-2 -mt-2 flex h-10 w-10 items-center justify-center rounded-full text-foreground/50 hover:bg-background hover:text-primary ${tap}`}
          >
            <X size={18} />
          </button>
        </div>

        <label
          htmlFor='offer-price'
          className='mt-5 block text-xs font-semibold text-foreground/70'
        >
          Your price
        </label>
        <div className='mt-1.5 flex items-center gap-2 rounded-2xl bg-background px-4 ring-1 ring-accent/60 focus-within:ring-2 focus-within:ring-primary/40'>
          <span className='text-lg font-bold text-foreground/60'>₹</span>
          <input
            id='offer-price'
            inputMode='numeric'
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))}
            className='h-12 w-full bg-transparent text-lg font-extrabold text-foreground outline-none'
          />
        </div>
        <p className='mt-2 text-xs text-foreground/50'>
          {isCounter
            ? `The poster offered ${formatINR(reward)}. They can accept or decline your counter.`
            : `Matches the poster's offer of ${formatINR(reward)}, so you're more likely to be picked.`}
        </p>

        <div className='mt-6 flex gap-3'>
          <button
            type='button'
            onClick={onClose}
            className={`h-12 flex-1 rounded-full bg-background text-sm font-bold text-foreground transition-colors hover:bg-accent/50 ${tap}`}
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={submit}
            disabled={!valid || submitting}
            className={`flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${tap}`}
          >
            {submitting ? (
              <Loader2 size={16} className='animate-spin' />
            ) : (
              <Send size={15} />
            )}
            {submitting ? 'Sending…' : 'Send application'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ConfirmWithdraw({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal label='Withdraw application' onClose={onClose}>
      <div className='p-6'>
        <h2 className='text-lg font-extrabold text-foreground'>
          Withdraw your application?
        </h2>
        <p className='mt-2 text-sm text-foreground/60'>
          The poster will no longer see you as an applicant. You can apply again
          while the gig is open.
        </p>
        <div className='mt-6 flex gap-3'>
          <button
            type='button'
            onClick={onClose}
            className={`h-12 flex-1 rounded-full bg-background text-sm font-bold text-foreground hover:bg-accent/50 ${tap}`}
          >
            Keep it
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className={`h-12 flex-1 rounded-full bg-red-500 text-sm font-bold text-white hover:bg-red-600 active:scale-[0.98] ${tap}`}
          >
            Withdraw
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Role-based primary action (used in sidebar + mobile bar)           */
/* ------------------------------------------------------------------ */

function PrimaryAction({
  role,
  onApply,
  onWithdraw,
  compact = false,
}: {
  role: Role;
  onApply: () => void;
  onWithdraw: () => void;
  compact?: boolean;
}) {
  const base = `flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-bold transition-all active:scale-[0.98] ${tap}`;
  const solid = `${base} bg-primary text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary-dark`;

  if (role === 'visitor') {
    return (
      <>
        <button type='button' onClick={onApply} className={solid}>
          <Send size={15} />
          Apply now
        </button>
        {!compact && (
          <p className='mt-2.5 flex items-center justify-center gap-1.5 text-xs text-foreground/50'>
            <Clock size={12} />
            Takes 1 minute · counter-offers allowed
          </p>
        )}
      </>
    );
  }

  if (role === 'applied') {
    return (
      <>
        <div
          className={`${base} cursor-default bg-amber-50 text-amber-600 active:scale-100`}
        >
          <Hourglass size={15} />
          Application sent
        </div>
        {!compact && (
          <button
            type='button'
            onClick={onWithdraw}
            className={`mt-2 h-10 w-full rounded-full text-xs font-semibold text-foreground/50 transition-colors hover:text-red-500 ${tap}`}
          >
            Withdraw application
          </button>
        )}
      </>
    );
  }

  if (role === 'assigned') {
    return (
      <>
        <Link href='/ActiveWork' className={solid}>
          <CloudUpload size={15} />
          Go to active work
        </Link>
        {!compact && (
          <p className='mt-2.5 flex items-center justify-center gap-1.5 text-xs text-green-600'>
            <CheckCircle2 size={12} />
            You&apos;re assigned to this gig
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <Link href='/Applicants' className={solid}>
        <Users size={15} />
        View {gig.applicants} applicants
      </Link>
      {!compact && (
        <p className='mt-2.5 flex items-center justify-center gap-1.5 text-xs text-foreground/50'>
          <Trophy size={12} />
          This is your gig
        </p>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function GigDetailsPage() {
  // TODO: derive from your API (poster / accepted / applied / visitor)
  const [role, setRole] = useState<Role>('visitor');
  const [appliedPrice, setAppliedPrice] = useState<number | null>(null);

  const [openFile, setOpenFile] = useState<RefFile | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const urgent = gig.daysLeft <= 2;
  const timeLeftPct = Math.min(100, Math.max(6, (gig.daysLeft / 7) * 100));

  const handleApply = async (price: number) => {
    // TODO: call your apply endpoint with { gigId, negotiatedPrice: price }
    await new Promise((resolve) => setTimeout(resolve, 700));
    setAppliedPrice(price);
    setRole('applied');
    setApplyOpen(false);
    showToast('Application sent');
  };

  const handleWithdraw = () => {
    // TODO: call your withdraw endpoint
    setRole('visitor');
    setAppliedPrice(null);
    setWithdrawOpen(false);
    showToast('Application withdrawn');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: gig.title, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied');
    } catch {
      /* user cancelled the share sheet */
    }
  };

  return (
    <div className='min-h-full px-4 py-6 pb-32 sm:px-6 lg:px-8 lg:pb-10'>
      <Toast message={toast} />

      <div className='mx-auto max-w-5xl space-y-5'>
        {/* ============ Top bar ============ */}
        <div className='flex items-center justify-between'>
          <Link
            href='/Explore'
            className={`group -ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-foreground/60 transition-colors hover:text-primary ${tap}`}
          >
            <ArrowLeft
              size={16}
              className='transition-transform group-hover:-translate-x-0.5'
            />
            Back to gigs
          </Link>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => {
                setSaved((s) => !s);
                showToast(saved ? 'Removed from saved' : 'Gig saved');
              }}
              aria-pressed={saved}
              aria-label={saved ? 'Remove from saved' : 'Save gig'}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-accent/60 transition-all hover:ring-primary/40 active:scale-95 ${tap} ${
                saved ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
            <button
              type='button'
              onClick={handleShare}
              aria-label='Share gig'
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground/60 shadow-sm ring-1 ring-accent/60 transition-all hover:text-primary hover:ring-primary/40 active:scale-95 ${tap}`}
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* ============ Hero ============ */}
        <section className='relative overflow-hidden rounded-[32px] bg-accent/40 px-5 py-6 sm:px-8 sm:py-7'>
          <div
            aria-hidden
            className='absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/70'
          />
          <div
            aria-hidden
            className='absolute bottom-6 right-10 hidden h-24 w-24 bg-[radial-gradient(circle,rgba(244,81,36,0.25)_1.4px,transparent_1.8px)] bg-[size:14px_14px] md:block'
          />

          <div className='relative flex flex-col gap-5 sm:flex-row sm:items-start'>
            <span className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md shadow-primary/10'>
              <Code2 size={28} className='text-primary' />
            </span>

            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-2 text-xs font-bold'>
                <span className='rounded-full bg-white px-2.5 py-1 text-primary'>
                  {gig.category}
                </span>
                <span className='flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-green-600'>
                  <span className='h-1.5 w-1.5 rounded-full bg-green-500' />
                  {gig.status}
                </span>
                {urgent && (
                  <span className='flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-red-500'>
                    <Flame size={12} fill='currentColor' />
                    Ending soon
                  </span>
                )}
                <span className='rounded-full bg-white px-2.5 py-1 text-foreground/50'>
                  #{gig.id}
                </span>
              </div>

              <h1 className='mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl'>
                {gig.title}
              </h1>

              <div className='mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-foreground/60'>
                <span className='flex items-center gap-1.5 font-semibold text-foreground'>
                  <Avatar initials={poster.initials} bg={poster.avatarBg} />
                  {poster.name}
                  <BadgeCheck size={14} className='text-blue-500' />
                </span>
                <span>{poster.branch}</span>
                <span className='flex items-center gap-1'>
                  <Clock size={12} className='text-primary' />
                  {gig.postedAgo}
                </span>
                <span className='flex items-center gap-1'>
                  <MapPin size={12} className='text-primary' />
                  {gig.distance} away
                </span>
              </div>

              <div className='mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap'>
                <div className='flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50'>
                    <Coins size={16} className='text-amber-500' />
                  </span>
                  <div>
                    <p className='text-lg font-extrabold leading-tight text-foreground'>
                      {formatINR(gig.reward)}
                    </p>
                    <p className='text-xs font-medium text-foreground/50'>
                      Reward
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm'>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      urgent ? 'bg-red-50' : 'bg-accent/50'
                    }`}
                  >
                    <CalendarDays
                      size={16}
                      className={urgent ? 'text-red-500' : 'text-primary'}
                    />
                  </span>
                  <div>
                    <p className='text-lg font-extrabold leading-tight text-foreground'>
                      {gig.deadline}
                    </p>
                    <p className='text-xs font-medium text-foreground/50'>
                      {gig.deadlineTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Two columns ============ */}
        <div className='grid items-start gap-5 lg:grid-cols-[1fr_320px]'>
          {/* ---------------- LEFT ---------------- */}
          <div className='space-y-5'>
            <Card title='Overview' icon={FileText}>
              <p className='text-sm leading-6 text-foreground/70'>
                {gig.overview}
              </p>

              <div className='mt-4 flex items-start gap-3 rounded-2xl bg-accent/40 px-4 py-3'>
                <Target size={16} className='mt-0.5 shrink-0 text-primary' />
                <div>
                  <p className='text-xs font-semibold text-primary'>
                    Expected outcome
                  </p>
                  <p className='text-sm font-semibold text-foreground'>
                    {gig.outcome}
                  </p>
                </div>
              </div>

              <div className='mt-4 grid grid-cols-3 gap-3'>
                {[
                  { icon: Clock, value: gig.effort, label: 'Effort' },
                  { icon: Gauge, value: gig.level, label: 'Level' },
                  {
                    icon: Users,
                    value: `${gig.spots} spot${gig.spots === 1 ? '' : 's'}`,
                    label: 'Open',
                  },
                ].map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className='flex flex-col items-center rounded-2xl bg-background px-2 py-3.5 text-center'
                  >
                    <Icon size={15} className='text-primary' />
                    <p className='mt-1.5 text-sm font-extrabold text-foreground'>
                      {value}
                    </p>
                    <p className='text-xs font-medium text-foreground/50'>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills + tools */}
            <div className='grid gap-5 sm:grid-cols-2'>
              <Card title='Skills' icon={Sparkles}>
                <div className='flex flex-wrap gap-2'>
                  {gig.skills.map(({ label, icon: Icon, cls }) => (
                    <span
                      key={label}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${cls}`}
                    >
                      <Icon size={12} />
                      {label}
                    </span>
                  ))}
                </div>
              </Card>

              <Card title='Tools' icon={Wrench}>
                <div className='flex flex-wrap gap-2'>
                  {gig.tools.map(({ label, cls, dot }) => (
                    <span
                      key={label}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${cls}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <Card title='Deliverables' icon={ListChecks}>
              <ul className='space-y-3'>
                {gig.deliverables.map((item) => (
                  <li
                    key={item}
                    className='flex items-center gap-3 text-sm font-medium text-foreground'
                  >
                    <CheckCircle2
                      size={18}
                      className='shrink-0 text-green-500'
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className='mt-4 flex items-center gap-2 rounded-xl bg-background px-3 py-2.5 text-xs text-foreground/60'>
                <CloudUpload size={14} className='shrink-0 text-primary' />
                Submit via upload, then confirm with the poster&apos;s OTP
              </p>
            </Card>

            <div className='grid gap-5 sm:grid-cols-2'>
              <Card title='Guidelines' icon={BookOpen}>
                <ul className='space-y-3'>
                  {gig.guidelines.map((item) => (
                    <li
                      key={item}
                      className='flex items-center gap-2.5 text-sm font-medium text-foreground'
                    >
                      <CheckCircle2
                        size={15}
                        className='shrink-0 text-green-500'
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title='Who can apply' icon={ShieldCheck}>
                <ul className='space-y-3'>
                  {gig.eligibility.map(({ text, icon: Icon, cls }) => (
                    <li
                      key={text}
                      className='flex items-center gap-2.5 text-sm font-medium text-foreground'
                    >
                      <Icon size={15} className={`shrink-0 ${cls}`} />
                      {text}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card title='Meet-up location' icon={MapPin}>
              <div className='flex items-center justify-between gap-3 rounded-2xl bg-background px-4 py-3.5'>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold text-foreground'>
                    {gig.deliveryAddress}
                  </p>
                  <p className='mt-0.5 text-xs text-foreground/50'>
                    {gig.distance} from you
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    gig.deliveryAddress
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-2.5 text-xs font-bold text-primary shadow-sm ring-1 ring-accent/60 transition-all hover:ring-primary/40 active:scale-95 ${tap}`}
                >
                  <ExternalLink size={13} />
                  Open map
                </a>
              </div>
            </Card>

            <Card title='Reference files' icon={Paperclip}>
              <ul className='grid gap-3 sm:grid-cols-2'>
                {gig.files.map((file) => {
                  const isPdf = file.kind === 'pdf';
                  const FileIcon = isPdf ? FileText : Archive;

                  return (
                    <li
                      key={file.name}
                      className='flex items-center gap-3 rounded-2xl bg-background px-3.5 py-3'
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isPdf
                            ? 'bg-red-50 text-red-500'
                            : 'bg-blue-50 text-blue-500'
                        }`}
                      >
                        <FileIcon size={18} />
                      </span>

                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-xs font-bold text-foreground'>
                          {file.name}
                        </p>
                        <p className='text-xs text-foreground/50'>
                          {file.size}
                        </p>
                      </div>

                      <div className='flex shrink-0 items-center'>
                        {isPdf && (
                          <button
                            type='button'
                            onClick={() => setOpenFile(file)}
                            aria-label={`View ${file.name}`}
                            title='View'
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-white hover:text-primary active:scale-95 ${tap}`}
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        <a
                          href={file.url}
                          download={file.name}
                          aria-label={`Download ${file.name}`}
                          title='Download'
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-white hover:text-primary active:scale-95 ${tap}`}
                        >
                          <Download size={16} />
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>

          {/* ---------------- RIGHT (sticky) ---------------- */}
          <aside className='space-y-5 lg:sticky lg:top-24'>
            <section className='rounded-3xl bg-white p-5 shadow-sm ring-1 ring-accent/60'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-xs font-medium text-foreground/50'>
                    Reward
                  </p>
                  <p className='text-4xl font-extrabold tracking-tight text-foreground'>
                    {formatINR(gig.reward)}
                  </p>
                  {role === 'applied' &&
                    appliedPrice !== null &&
                    appliedPrice !== gig.reward && (
                      <p className='mt-1 text-xs font-semibold text-amber-600'>
                        Your offer: {formatINR(appliedPrice)}
                      </p>
                    )}
                </div>
                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-50'>
                  <Coins size={18} className='text-amber-500' />
                </span>
              </div>

              <div className='mt-4 grid grid-cols-2 gap-3'>
                <div className='rounded-2xl bg-background px-3 py-3 text-center'>
                  <CalendarDays
                    size={14}
                    className={`mx-auto ${urgent ? 'text-red-500' : 'text-primary'}`}
                  />
                  <p className='mt-1 text-sm font-extrabold text-foreground'>
                    {gig.deadline}
                  </p>
                  <p className='text-xs text-foreground/50'>Deadline</p>
                </div>
                <div className='rounded-2xl bg-background px-3 py-3 text-center'>
                  <Users size={14} className='mx-auto text-primary' />
                  <p className='mt-1 text-sm font-extrabold text-foreground'>
                    {gig.applicants} applied
                  </p>
                  <p className='text-xs text-foreground/50'>
                    for {gig.spots} spot{gig.spots === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              <div className='mt-4'>
                <div className='flex items-center justify-between text-xs font-semibold'>
                  <span className='text-foreground/50'>Time left</span>
                  <span className={urgent ? 'text-red-500' : 'text-primary'}>
                    {gig.daysLeft} days
                  </span>
                </div>
                <div
                  role='progressbar'
                  aria-label='Time left'
                  aria-valuenow={gig.daysLeft}
                  aria-valuemin={0}
                  aria-valuemax={7}
                  className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-accent'
                >
                  <div
                    className={`h-full rounded-full ${urgent ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${timeLeftPct}%` }}
                  />
                </div>
              </div>

              <div className='mt-5 hidden lg:block'>
                <PrimaryAction
                  role={role}
                  onApply={() => setApplyOpen(true)}
                  onWithdraw={() => setWithdrawOpen(true)}
                />
              </div>
            </section>

            <section className='rounded-3xl bg-white p-5 shadow-sm ring-1 ring-accent/60'>
              <div className='flex items-center gap-3'>
                <Avatar
                  initials={poster.initials}
                  bg={poster.avatarBg}
                  size='h-12 w-12 text-sm'
                />
                <div className='min-w-0'>
                  <p className='flex items-center gap-1.5 text-sm font-bold text-foreground'>
                    {poster.name}
                    <BadgeCheck size={14} className='text-blue-500' />
                  </p>
                  <p className='text-xs text-foreground/50'>
                    {poster.branch} · {poster.year}
                  </p>
                </div>
              </div>

              <div className='mt-4 grid grid-cols-3 gap-2'>
                {[
                  {
                    icon: Star,
                    value: poster.rating,
                    label: 'Rating',
                    cls: 'text-amber-500',
                  },
                  {
                    icon: Trophy,
                    value: poster.gigs,
                    label: 'Gigs',
                    cls: 'text-primary',
                  },
                  {
                    icon: MapPin,
                    value: poster.distance,
                    label: 'Away',
                    cls: 'text-primary',
                  },
                ].map(({ icon: Icon, value, label, cls }) => (
                  <div
                    key={label}
                    className='flex flex-col items-center rounded-xl bg-background py-2.5'
                  >
                    <Icon size={13} className={cls} />
                    <p className='mt-1 text-xs font-extrabold text-foreground'>
                      {value}
                    </p>
                    <p className='text-[11px] text-foreground/50'>{label}</p>
                  </div>
                ))}
              </div>

              {role !== 'poster' && (
                <button
                  type='button'
                  className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent/50 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white active:scale-[0.98] ${tap}`}
                >
                  <MessageCircle size={14} />
                  Message {poster.name.split(' ')[0]}
                </button>
              )}
            </section>
          </aside>
        </div>
      </div>

      {/* ============ Mobile sticky action bar ============ */}
      <div className='fixed inset-x-0 bottom-0 z-40 border-t border-accent/60 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden'>
        <div className='mx-auto flex max-w-5xl items-center gap-4'>
          <div className='shrink-0'>
            <p className='text-[11px] font-medium text-foreground/50'>Reward</p>
            <p className='text-xl font-extrabold leading-tight text-foreground'>
              {formatINR(gig.reward)}
            </p>
          </div>
          <div className='flex-1'>
            <PrimaryAction
              role={role}
              compact
              onApply={() => setApplyOpen(true)}
              onWithdraw={() => setWithdrawOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* ============ Overlays ============ */}
      {openFile && (
        <PdfViewer file={openFile} onClose={() => setOpenFile(null)} />
      )}
      {applyOpen && (
        <ApplySheet
          reward={gig.reward}
          onClose={() => setApplyOpen(false)}
          onSubmit={handleApply}
        />
      )}
      {withdrawOpen && (
        <ConfirmWithdraw
          onClose={() => setWithdrawOpen(false)}
          onConfirm={handleWithdraw}
        />
      )}
    </div>
  );
}