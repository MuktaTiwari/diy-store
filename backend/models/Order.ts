import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

class Order extends Model {
  public id!: number;
  public productName!: string;
  public quantity!: number;
  public price!: number;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: "orders" }
);

export default Order;
