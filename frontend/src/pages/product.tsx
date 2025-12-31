import { useEffect, useState } from "react"
import axios from "axios"
import { Search } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AddProduct from "@/components/AddProduct"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image_url: string
  category: string
  description: string
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [addPopup, setAddPopup] = useState(false)

  const categories = [
    "all",
    "Wall Mirrors",
    "Handheld Mirrors",
    "Shell Decor",
    "Bathroom Mirrors",
    "Decorative Shells",
    "Mirror Sets"
  ]

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data)
        setFilteredProducts(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let data = products

    if (searchQuery) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      data = data.filter(p => p.category === selectedCategory)
    }

    setFilteredProducts(data)
  }, [searchQuery, selectedCategory, products])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#020617] to-black text-white">

      {/* Header */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-3xl">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm">
            Premium Collection
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Mirrors & Shell Decor
          </h1>

          <p className="text-white/70 text-lg">
            Discover handcrafted pieces inspired by nature & reflection
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 mb-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/20 py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition ${
                  selectedCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/10 border border-white/20 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Button
            onClick={() => setAddPopup(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center text-white/60">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-white/60">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                className="bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 transition hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold">
                      ₹{product.price}
                    </span>
                    <span className={`text-sm ${
                      product.stock > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </CardContent>

                {/* Action */}
                <CardFooter className="p-5 pt-0">
                  <Button
                    className="w-full bg-white text-black hover:bg-white/90"
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddProduct open={addPopup} onClose={() => setAddPopup(false)} />
    </div>
  )
}
