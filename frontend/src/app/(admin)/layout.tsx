"use client";
import { useState } from "react";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import Sidebar from "../components/sidebar";

const theme = createTheme(); // create default MUI theme

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Now useMediaQuery works because we pass the theme
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
   
        <ThemeProvider theme={theme}>
          <Navbar onMenuClick={toggleSidebar} />

          {/* Sidebar (permanent on desktop, temporary on mobile) */}
          <Sidebar
            open={isDesktop ? true : sidebarOpen}
            onClose={toggleSidebar}
          />

          {/* ✅ Main content shifts when sidebar is permanent */}
          <main
            style={{
              marginLeft: isDesktop ? 240 : 0, // sidebar width
              padding: "20px",
              marginTop: "64px", // height of Navbar
            }}
          >
            {children}
          </main>
        </ThemeProvider>
      
  );
}
