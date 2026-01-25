'use client';

import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RunsList from '../runs/RunsList';
import RunFormDialog from '../runs/RunFormDialog';

interface Run {
  id: string;
  date: string;
  distance: number;
  duration: number | null;
  pace: number | null;
  memo: string | null;
}

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    nickname?: string | null;
  };
  runs: Run[];
}

export default function DashboardContent({ user, runs }: DashboardContentProps) {
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            ダッシュボード
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ようこそ、{user.nickname || user.name || user.email}さん
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormDialogOpen(true)}
        >
          記録を追加
        </Button>
      </Box>

      <RunsList runs={runs} />

      <RunFormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
      />
    </Container>
  );
}
