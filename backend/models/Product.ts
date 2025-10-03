import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";

// Define attributes
export interface ProductAttributes {
  id: number;
  productName: string;
  price: number;
  description?: string;
  imageUrl?: string | null;
  stock?: number;
  category?: string;
  status?: "active" | "inactive";
  brand?: string;
  sku?: string;
  discount?: number;
  rating?: number;
}

// Define creation attributes (id is optional when creating)
 export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: number;
  public productName!: string;
  public price!: number;
  public description?: string;
  public imageUrl?: string | null;
  public stock?: number;
  public category?: string;
  public status?: "active" | "inactive";
  public brand?: string;
  public sku?: string;
  public discount?: number;
  public rating?: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productName: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT },
    imageUrl: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    category: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active" },
    brand: { type: DataTypes.STRING },
    sku: { type: DataTypes.STRING, unique: true, allowNull: true },
    discount: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.0, allowNull: true },
    rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0.0, allowNull: true },
  },
  { sequelize, tableName: "product", timestamps: true }
);

export default Product;
