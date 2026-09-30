import AssignmentDetails from '@/components/AssignmentDetails/AssignmentDetails';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AssignmentDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-full bg-[#fafafa] px-4 py-6 sm:px-6 lg:px-8">
      <AssignmentDetails gigId={id} />
    </div>
  );
}