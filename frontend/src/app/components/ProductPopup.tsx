"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

interface ProductProps {
  onClose: () => void;
  onProductAdded: () => void;
}

interface ProductState {
  name: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  discount: string;
  rating: string;
  image: File | null;
  discountEnabled: boolean; // toggle state
}

export default function Product({ onClose, onProductAdded }: ProductProps) {
  const [productData, setProductData] = useState<ProductState>({
    name: "",
    price: "",
    description: "",
    category: "Small", // default category
    brand: "CostalCharm.co", // constant brand
    sku: "",
    discount: "",
    rating: "",
    image: null,
    discountEnabled: false,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDiscountToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData((prev) => ({
      ...prev,
      discountEnabled: e.target.checked,
      discount: e.target.checked ? prev.discount : "", // reset if toggle off
    }));
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "image" || key === "discountEnabled") return;
        if (["price", "discount", "rating"].includes(key)) {
          formData.append(key, value ? String(parseFloat(value)) : "0");
        } else {
          formData.append(key, value);
        }
      });

      if (productData.image) formData.append("image", productData.image);

      await axiosInstance.post(
        "/product/create-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onProductAdded();
      onClose();

      setProductData({
        name: "",
        price: "",
        description: "",
        category: "Small",
        brand: "CostalCharm.co",
        sku: "",
        discount: "",
        rating: "",
        image: null,
        discountEnabled: false,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={productData.name}
            onChange={handleChange}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={productData.price}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            value={productData.description}
            onChange={handleChange}
          />

          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            value={productData.category}
            onChange={handleChange}
          >
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </TextField>

          <TextField
            label="Brand"
            name="brand"
            fullWidth
            value={productData.brand}
            InputProps={{
              readOnly: true, // make brand constant
            }}
          />

          <TextField
            label="SKU"
            name="sku"
            fullWidth
            value={productData.sku}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={productData.discountEnabled}
                onChange={handleDiscountToggle}
              />
            }
            label="Enable Discount"
          />

          <TextField
            label="Discount (%)"
            name="discount"
            type="number"
            fullWidth
            disabled={!productData.discountEnabled}
            value={productData.discount}
            onChange={handleChange}
          />

          <TextField
            label="Rating"
            name="rating"
            type="number"
            fullWidth
            value={productData.rating}
            onChange={handleChange}
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <Box mt={1}>
              <Typography variant="subtitle2">Preview:</Typography>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={addProduct} variant="contained">
          Save
        </Button>
      </DialogActions>
    </div>
  );
}
