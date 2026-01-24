import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Box, Container, Typography, Paper } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ダッシュボード
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ようこそ、{session.user?.nickname || session.user?.name || session.user?.email}さん
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            機能開発中
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ランニング記録機能は次のステップで実装予定です。
            <br />
            現在はGoogle認証でのログインとプロフィール編集が利用できます。
          </Typography>
        </Paper>
      </Container>
    </MainLayout>
  );
}
