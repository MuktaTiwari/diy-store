// src/app/(auth)/layout.tsx
"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
        <ThemeProvider theme={theme}>
          {/* No Navbar or Sidebar here */}
          <main>{children}</main>
        </ThemeProvider>
  );
}
