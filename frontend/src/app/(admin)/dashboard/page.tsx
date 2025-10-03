"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Product from "@/app/components/ProductPopup";
import axiosInstance from "@/utils/axiosInstance";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const productData = await axiosInstance.get("/product/getAllProduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", productData.data); // 👈 check shape

      setProducts(productData.data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axiosInstance.delete(`/product/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: "#000000" }}
        >
          Add Product
        </Button>
      </div>

      {/* Add Product Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Product
          onClose={() => setOpen(false)}
          onProductAdded={fetchProducts}
        />
      </Dialog>

      {/* Product Table */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Image</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>Stock</b>
              </TableCell>
              <TableCell>
                <b>Category</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Brand</b>
              </TableCell>
              <TableCell>
                <b>SKU</b>
              </TableCell>
              <TableCell>
                <b>Discount</b>
              </TableCell>
              <TableCell>
                <b>Rating</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {p.imageUrl ? (
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_API_URL}${p.imageUrl}`}
                      alt={p.productName}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{p.productName}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.description || "-"}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.sku || "-"}</TableCell>
                <TableCell>{p.discount}%</TableCell>
                <TableCell>{p.rating} ⭐</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={13} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
