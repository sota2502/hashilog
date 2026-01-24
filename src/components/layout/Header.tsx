'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import { useState, useTransition } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/app/actions/auth';

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    nickname?: string | null;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    startTransition(async () => {
      await handleSignOut();
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <DirectionsRunIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            href={user ? '/dashboard' : '/'}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            RunNote
          </Typography>

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                href="/dashboard"
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                ダッシュボード
              </Button>

              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                aria-label="アカウントメニュー"
                disabled={isPending}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  {user.nickname || user.name || user.email}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push('/profile');
                  }}
                >
                  プロフィール
                </MenuItem>
                <MenuItem onClick={handleLogout} disabled={isPending}>
                  {isPending ? 'ログアウト中...' : 'ログアウト'}
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              ログイン
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
