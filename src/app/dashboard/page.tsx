import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardContent from '@/components/dashboard/DashboardContent';
import MainLayout from '@/components/layout/MainLayout';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect('/login');
  }

  // 最新のランニング記録を取得
  const runs = await prisma.run.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' },
    take: 10,
  });

  // ペースを計算
  const runsWithPace = runs.map((run) => ({
    ...run,
    date: run.date.toISOString(),
    pace: run.duration && run.duration > 0 ? run.duration / 60 / run.distance : null,
  }));

  return (
    <MainLayout>
      <DashboardContent
        user={session.user}
        runs={runsWithPace}
      />
    </MainLayout>
  );
}
