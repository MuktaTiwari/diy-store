import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // move to env in production

interface AdminData {
  username: string;
  email: string;
  password: string;
}
class AdminService {
  async login(username: string, password: string) {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) throw new Error("Admin not found");

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }

   async register(userData: AdminData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const admin = await Admin.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    return admin;
  }
}

export default new AdminService();
