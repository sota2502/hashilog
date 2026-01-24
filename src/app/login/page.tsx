import { Box, Button, Container, Paper, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            RunNote
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            ランニング記録アプリにログイン
          </Typography>

          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/dashboard' });
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ py: 1.5 }}
            >
              Googleでログイン
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
