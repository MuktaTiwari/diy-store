import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProductProps {
  open: boolean
  onClose: () => void
  categories: Category[]
}

interface Category {
  id: string
  name: string
}
export default function AddProduct({ open, onClose, categories }: ProductProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "", // 🔥 IMPORTANT
  })

  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const data = new FormData()
      data.append("name", formData.name)
      data.append("price", formData.price)
      data.append("stock", formData.stock)
      data.append("category_id", formData.category_id) // 🔥 FIX

      if (image) {
        data.append("image", image)
      }

      await axios.post("http://localhost:5000/api/products/create", data)

      onClose()
      window.location.reload()
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label>Name</Label>
            <Input name="name" onChange={handleChange} required />
          </div>

          <div>
            <Label>Price</Label>
            <Input name="price" type="number" onChange={handleChange} required />
          </div>

          <div>
            <Label>Stock</Label>
            <Input name="stock" type="number" onChange={handleChange} required />
          </div>

          <div>
            <Label>Category</Label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, category_id: e.target.value }))
              }
              required
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
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
              onChange={e => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
