"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "./(user)/Navbar";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: 15,
          textAlign: "center",
          background: "linear-gradient(to bottom, #000000, #8fd3f4)",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Handmade With Love
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }} gutterBottom>
            Unique DIY seashell mirrors & crafts made just for you
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "30px",
              backgroundColor: "#000000",
              "&:hover": { backgroundColor: "#8fd3f4" },
            }}
            onClick={() => router.push("/products")}
          >
            🌊 Shop Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
