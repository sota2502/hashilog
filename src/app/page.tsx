import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import HomeContent from '@/components/home/HomeContent';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <MainLayout>
      <HomeContent />
    </MainLayout>
  );
}
