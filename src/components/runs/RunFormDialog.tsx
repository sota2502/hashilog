'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface RunFormDialogProps {
  open: boolean;
  onClose: () => void;
  editData?: {
    id: string;
    date: string;
    distance: number;
    duration: number;
    memo?: string | null;
  };
}

export default function RunFormDialog({
  open,
  onClose,
  editData,
}: RunFormDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    date: editData?.date.split('T')[0] || new Date().toISOString().split('T')[0],
    distance: editData?.distance.toString() || '',
    hours: editData ? Math.floor(editData.duration / 3600).toString() : '',
    minutes: editData
      ? Math.floor((editData.duration % 3600) / 60).toString()
      : '',
    seconds: editData ? (editData.duration % 60).toString() : '',
    memo: editData?.memo || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 時間を秒に変換（空文字列は0として扱う）
      const hours = formData.hours ? parseInt(formData.hours) : 0;
      const minutes = formData.minutes ? parseInt(formData.minutes) : 0;
      const seconds = formData.seconds ? parseInt(formData.seconds) : 0;
      const duration = hours * 3600 + minutes * 60 + seconds;

      const payload: any = {
        date: new Date(formData.date).toISOString(),
        distance: parseFloat(formData.distance),
      };

      // オプショナルフィールドは値がある場合のみ追加
      if (duration > 0) {
        payload.duration = duration;
      }
      if (formData.memo && formData.memo.trim()) {
        payload.memo = formData.memo.trim();
      }

      const url = editData ? `/api/runs/${editData.id}` : '/api/runs';
      const method = editData ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('記録の保存に失敗しました');
      }

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {editData ? 'ランニング記録を編集' : 'ランニング記録を追加'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="日付"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="距離 (km)"
              type="number"
              value={formData.distance}
              onChange={(e) =>
                setFormData({ ...formData, distance: e.target.value })
              }
              required
              fullWidth
              inputProps={{ step: '0.01', min: '0' }}
              helperText="必須"
            />

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                時間（任意）
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="時"
                  type="number"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  placeholder="0"
                  inputProps={{ min: '0' }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="分"
                  type="number"
                  value={formData.minutes}
                  onChange={(e) =>
                    setFormData({ ...formData, minutes: e.target.value })
                  }
                  placeholder="0"
                  inputProps={{ min: '0', max: '59' }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="秒"
                  type="number"
                  value={formData.seconds}
                  onChange={(e) =>
                    setFormData({ ...formData, seconds: e.target.value })
                  }
                  placeholder="0"
                  inputProps={{ min: '0', max: '59' }}
                  sx={{ flex: 1 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                時間を記録するとペースが自動計算されます
              </Typography>
            </Box>

            <TextField
              label="メモ"
              multiline
              rows={3}
              value={formData.memo}
              onChange={(e) =>
                setFormData({ ...formData, memo: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            キャンセル
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '保存中...' : editData ? '更新' : '追加'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
