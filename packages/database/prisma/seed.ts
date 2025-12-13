import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a sample log entry
  const logEntry = await prisma.logEntry.create({
    data: {
      content: 'We have entered orbit around a Class-M planet. Initial scans show signs of ancient civilization. Beginning detailed analysis.',
      stardate: '47634.44',
      captain: 'Jean-Luc Picard',
    },
  });

  console.log('✅ Created log entry:', logEntry);

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'captain@starfleet.com' },
    update: {},
    create: {
      email: 'captain@starfleet.com',
      name: 'Captain Picard',
    },
  });

  console.log('✅ Created user:', user1);

  // Create sample course
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Starfleet Academy: Navigation Basics',
      description: 'Learn the fundamentals of interstellar navigation',
    },
  });

  console.log('✅ Created course:', course1);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
