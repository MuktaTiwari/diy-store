"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Seashell Dreams
        </Typography>

        {/* Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1">Home</Typography>
          </Link>
          <Link href="/products" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1">Products</Typography>
          </Link>
          <Link href="#about" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1">About</Typography>
          </Link>
          <Link href="#contact" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1">Contact</Typography>
          </Link>
        </Box>

        {/* Admin Login */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/login")}
          sx={{ fontWeight: "bold" }}
        >
          Admin Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
