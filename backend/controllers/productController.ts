import multer from "multer";
import { Request, Response } from "express";
import path from "path";
import ProductService from "../service/productService";
import fs from "fs";
import { stack } from "sequelize/types/utils";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage
export const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

class ProductController {
  private productService = new ProductService();

  async saveProduct(req: Request, res: Response) {
    try {
      const {
        name,
        price,
        description,
        category,
        brand,
        sku,
        discount,
        rating,
      } = req.body;

      // Validate required fields
      if (!name || !price) {
        return res.status(400).json({ message: "Name and price are required" });
      }

      const file = req.file as Express.Multer.File | undefined;
      const imageUrl = file ? `/uploads/${file.filename}` : null;

      const productData = {
        productName: name,
        price: parseFloat(price),
        description: description || "",
        category: category || "",
        brand: brand || "",
        sku: sku || null,
        discount: discount ? parseFloat(discount) : 0,
        rating: rating ? parseFloat(rating) : 0,
        imageUrl,
      };

      const saveData = await this.productService.saveProduct(productData);
      res.json({ saveData });
    } catch (err: any) {
      console.error("ERROR SAVING PRODUCT:", err);
      res.status(500).json({ message: err.message, stack: err.stack });
    }
  }

  async getAllProduct(req: Request, res: Response) {
    try {
      const getProdcutData = await this.productService.getAllProduct();

      res
        .status(200)
        .json({ data: getProdcutData, message: "Error Fetching the data" });
    } catch (err: any) {
      res.status(500).json({ message: err.message, stack: err.stack });
    }
  }


  async deleteProduct(req: Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10); // extract and convert to number

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const result = await this.productService.deleteProduct(productId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (err: any) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: err.message });
  }
}

}

export default ProductController;
