'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Link from 'next/link';

export default function HomeContent() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <DirectionsRunIcon sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            RunNote
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            あなたのランニングを記録し、成長を可視化
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, opacity: 0.8 }}>
            毎日のランニングデータを簡単に記録。
            <br />
            月間統計やペース推移をグラフで確認できます。
          </Typography>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              px: 4,
              py: 1.5,
            }}
          >
            始める
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
