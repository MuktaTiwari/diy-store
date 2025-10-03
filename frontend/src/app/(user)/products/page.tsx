"use client";

import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Container } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const productData = await axiosInstance.get("/product/getAllProduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", productData.data);
      setProducts(productData.data.data); // 👈 adjust if your API wraps differently
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Our Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image={product.imageUrl || "/placeholder.png"} // 👈 fallback image
                alt={product.productName}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.productName}
                </Typography>
                <Typography color="text.secondary">
                  ₹ {product.price}
                </Typography>
                {product.description && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    {product.description}
                  </Typography>
                )}
                {product.brand && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic", color: "primary.main" }}
                  >
                    Brand: {product.brand}
                  </Typography>
                )}
                {product.stock !== undefined && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: product.stock > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
