import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductProps {
  open: boolean;
  onClose: () => void;
  categories: { id: number; name: string }[];
}

export default function AddProduct({ open, onClose, categories }: ProductProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category_id", formData.category_id);

      if (image) data.append("image", image);

      await axios.post("http://localhost:5000/api/products/create", data);

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>
              <Input type="number" name="price" onChange={handleChange} required />
            </div>

            <div>
              <Label>Stock</Label>
              <Input type="number" name="stock" onChange={handleChange} required />
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={formData.category_id}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category_id: e.target.value }))
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
