import 'dotenv/config';
import { prisma } from '@repo/prisma/db';

async function main() {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error(
      'No user found. Please create a user before running the seed.',
    );
  }

  const assignment = await prisma.assignment.create({
    data: {
      title: 'Build a Student Portfolio Website',
      description:
        'Create a responsive portfolio website using HTML, CSS, and JavaScript.',
      instructions:
        'Submit the source code and live deployment link.',
      subject: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
      amount: 500,
      postedBy: user.id,
      deliveryDate: new Date('2026-10-20T12:00:00.000Z'),
      deliveryAddress:
        'VIT Bhopal University, Kothri, Madhya Pradesh',
      deliveryLatitude: 23.077,
      deliveryLongitude: 76.8513,
      status: 'OPEN',
    },
  });

  console.log('Assignment created successfully:');
  console.log(assignment);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
