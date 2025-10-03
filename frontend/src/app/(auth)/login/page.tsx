"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        background: "linear-gradient(to bottom, #000000, #8fd3f4)",


      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 3, color: "#3b3b3b" }}
        >
          Admin Login
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 3,
            width: "100%",
            padding: 1.5,
            fontWeight: "bold",
            background: "linear-gradient(to right, #000000, #636363)",
            "&:hover": {
              background: "linear-gradient(to right, #636363, #636363)",
            },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link href="/register" style={{ color: "#1976d2", fontWeight: "bold" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
