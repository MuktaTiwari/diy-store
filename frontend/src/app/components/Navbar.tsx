"use client";
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, Theme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#000000",
      }}
    >
      <Toolbar>
        {/* Show menu button only on small screens */}
        {!isDesktop && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap>
          DIY Store Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
