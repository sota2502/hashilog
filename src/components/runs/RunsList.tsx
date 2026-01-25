'use client';

import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RunFormDialog from './RunFormDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';

interface Run {
  id: string;
  date: string;
  distance: number;
  duration: number | null;
  pace: number | null;
  memo: string | null;
}

interface RunsListProps {
  runs: Run[];
}

export default function RunsList({ runs }: RunsListProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '-';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPace = (pace: number | null) => {
    if (!pace) return '-';
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = (run: Run) => {
    setSelectedRun(run);
    setEditDialogOpen(true);
  };

  const handleDelete = (run: Run) => {
    setSelectedRun(run);
    setDeleteDialogOpen(true);
  };

  if (runs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          まだ記録がありません
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          「記録を追加」ボタンから最初のランニング記録を追加しましょう
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell align="right">距離 (km)</TableCell>
              <TableCell align="right">時間</TableCell>
              <TableCell align="right">ペース (分/km)</TableCell>
              <TableCell>メモ</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {runs.map((run) => (
              <TableRow key={run.id} hover>
                <TableCell>{formatDate(run.date)}</TableCell>
                <TableCell align="right">{run.distance.toFixed(2)}</TableCell>
                <TableCell align="right">{formatDuration(run.duration)}</TableCell>
                <TableCell align="right">
                  <Chip label={formatPace(run.pace)} size="small" />
                </TableCell>
                <TableCell>
                  {run.memo ? (
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {run.memo}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      -
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(run)}
                    aria-label="編集"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(run)}
                    aria-label="削除"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRun && (
        <>
          <RunFormDialog
            open={editDialogOpen}
            onClose={() => {
              setEditDialogOpen(false);
              setSelectedRun(null);
            }}
            editData={selectedRun}
          />

          <DeleteConfirmDialog
            open={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false);
              setSelectedRun(null);
            }}
            runId={selectedRun.id}
          />
        </>
      )}
    </>
  );
}
