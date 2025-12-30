import { useEffect, useState } from "react"
import axios from "axios"
import { 
  Card, CardContent, CardFooter, CardHeader 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AddProduct from "@/components/AddProduct"
import { 
  Search, Filter, Grid, List, 
  ShoppingBag, Eye, Heart, TrendingUp,
  Sparkles, Package, Truck, Shield
} from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image_url: string
  category: string
  description: string
  rating: number
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addPopup, setAddPopup] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    "all", "Wall Mirrors", "Handheld Mirrors", "Shell Decor", 
    "Bathroom Mirrors", "Decorative Shells", "Mirror Sets"
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products")
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (err) {
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      )
    }
    
    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, products])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Wall Mirrors": "bg-blue-100 text-blue-700",
      "Handheld Mirrors": "bg-purple-100 text-purple-700",
      "Shell Decor": "bg-amber-100 text-amber-700",
      "Bathroom Mirrors": "bg-teal-100 text-teal-700",
      "Decorative Shells": "bg-emerald-100 text-emerald-700",
      "Mirror Sets": "bg-indigo-100 text-indigo-700"
    }
    return colors[category] || "bg-gray-100 text-gray-700"
  }

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-red-600">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?auto=format&fit=crop&w=1600&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container relative mx-auto px-6">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">
              <Sparkles className="mr-2 h-3 w-3" />
              Premium Collection
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Mirror & Shell Collection
            </h1>
            <p className="mb-8 text-lg text-blue-100">
              Discover handcrafted mirrors and natural shell decor pieces that transform your space
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white/90">
                <Package className="h-5 w-5" />
                <span>120+ Products</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="h-5 w-5" />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Truck className="h-5 w-5" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Controls Bar */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search mirrors, shells, decor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-4">
              <Filter className="h-4 w-4 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* View Toggle and Add Button */}
            <div className="flex items-center gap-4">
              <div className="flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-gray-500"
                    }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-gray-500"
                    }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={() => setAddPopup(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
            {selectedCategory !== "all" && (
              <span> in <span className="font-semibold text-blue-600">{selectedCategory}</span></span>
            )}
          </p>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <TrendingUp className="mr-2 h-4 w-4" />
            Sort by: Popularity
          </Button>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-600">No products found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group relative overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                    <Button 
                      size="icon" 
                      className="translate-y-4 scale-95 rounded-full bg-white text-gray-700 opacity-0 shadow-lg transition-all duration-300 hover:bg-white hover:text-blue-600 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      className="translate-y-4 scale-95 rounded-full bg-white text-gray-700 opacity-0 shadow-lg transition-all duration-300 hover:bg-white hover:text-red-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <Badge className={`absolute left-3 top-3 ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </Badge>

                  {/* Stock Badge */}
                  <Badge
                    className="absolute right-3 top-3"
                    variant={product.stock > 0 ? "default" : "destructive"}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                {/* Product Info */}
                <CardHeader className="pb-2">
                  <h3 className="line-clamp-1 text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-gray-500">
                    {product.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-700">
                        ₹{product.price}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < product.rating ? "text-amber-400" : "text-gray-300"}`}>
                            ★
                          </span>
                        ))}
                        <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${product.stock < 10 ? "text-amber-600" : "text-gray-500"}`}>
                      {product.stock} left
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-gray-200">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 w-full md:w-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <Badge className="absolute left-3 top-3" variant="secondary">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                          <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>
                        <span className="text-2xl font-bold text-blue-700">₹{product.price}</span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < product.rating ? "text-amber-400" : "text-gray-300"}`}>
                              ★
                            </span>
                          ))}
                          <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Stock: {product.stock}</span>
                          <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                            {product.stock > 0 ? "Available" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-4">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats Banner */}
      <div className="container mx-auto mt-12 px-6">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">120+</div>
              <div className="text-sm text-gray-600">Unique Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">98%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">5⭐</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">24h</div>
              <div className="text-sm text-gray-600">Fast Shipping</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Popup */}
      <AddProduct
        open={addPopup}
        onClose={() => setAddPopup(false)}
      />
    </div>
  )
}