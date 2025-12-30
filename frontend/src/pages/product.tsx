import { use, useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import  AddProduct  from "@/components/AddProduct"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image_url: string
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [addPopup , setAddPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products")
        setProducts(response.data)
      } catch (err) {
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])


  




  if (loading) return <p className="p-10 text-center">Loading products...</p>
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>

  return (
    <div className="px-6 py-10">
      {/* ===== Header ===== */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="text-sm text-muted-foreground">
            Manage your product inventory
          </p>
        </div>

        <Button onClick={()=> setAddPopup(true)}>Add Product</Button>
      </div>

      {/* ===== Empty State ===== */}
      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-muted-foreground">
            No products available. Add your first product.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Stock badge */}
                <Badge
                  className="absolute right-2 top-2"
                  variant={product.stock > 0 ? "default" : "destructive"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Header */}
              <CardHeader className="pb-1">
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {product.name}
                </h3>
              </CardHeader>

              {/* Content */}
              <CardContent className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">
                  ₹{product.price}
                </span>

                <span className="text-sm text-muted-foreground">
                  Qty: {product.stock}
                </span>
              </CardContent>

              {/* Footer */}
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}


      <AddProduct 
      open={addPopup}
      onClose={()=> setAddPopup(false)}
      
      />
    </div>
  )
}
