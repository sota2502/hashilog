import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/profile/ProfileForm';
import { Container, Typography, Box } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            プロフィール設定
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ニックネームを設定してください
          </Typography>
        </Box>
        <ProfileForm user={session.user} />
      </Container>
    </MainLayout>
  );
}
