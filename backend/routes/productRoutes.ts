import { Router, Request, Response } from "express";
import ProductController, { upload } from "../controllers/productController";

class ProductRoute {
  public router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/create-product",
      upload.single("image"),
      (req: Request, res: Response) => this.productController.saveProduct(req, res)
    );


    this.router.get("/getAllProduct",  (req: Request, res: Response) => this.productController.getAllProduct(req, res))
    this.router.delete("/deleteProduct/:id",  (req: Request, res: Response) => this.productController.deleteProduct(req, res))

  }
}

export default new ProductRoute().router;
