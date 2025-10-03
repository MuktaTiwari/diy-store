import { Request, Response } from "express";
import adminService from "../service/adminService";

class AdminController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await adminService.login(username, password);
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userData = req.body;
      const admin = await adminService.register(userData);
      res.json({ admin });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new AdminController();
