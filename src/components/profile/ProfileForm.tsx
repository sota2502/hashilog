'use client';

import { useState } from 'react';
import { Box, Button, TextField, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    nickname?: string | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState(user.nickname || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) {
        throw new Error('プロフィールの更新に失敗しました');
      }

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && (
            <Alert severity="success">プロフィールを更新しました</Alert>
          )}

          <TextField
            label="メールアドレス"
            value={user.email || ''}
            disabled
            fullWidth
          />

          <TextField
            label="ニックネーム"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
            required
            helperText="アプリ内で表示される名前です"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? '更新中...' : '保存'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
