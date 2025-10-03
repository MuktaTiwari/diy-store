import Product from "../models/Product";
import { ProductCreationAttributes } from "../models/Product";

class ProductService {
  async saveProduct(productData: ProductCreationAttributes) {
    try {
      const saveData = await Product.create(productData);
      return saveData;
    } catch (err) {
      throw new Error("Database error: " + err);
    }
  }


  async getAllProduct(){
    try{
      const product = await Product.findAll();
      return product;
    }
    catch(err){
      throw new Error("Database error:"+ err);
    }
  }

 async deleteProduct(productId: number) {
  try {
    // 🔎 First check if product exists
    const product = await Product.findByPk(productId);

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    await Product.destroy({ where: { id: productId } });

    return { success: true, message: "Product deleted successfully" };
  } catch (err: any) {
    console.error("Error deleting product:", err);
    return { success: false, message: err.message };
  }
}

}

export default ProductService;
 