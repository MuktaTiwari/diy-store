import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, ShoppingCart, Star, Zap, Sparkles } from "lucide-react";
import AddProduct from "@/components/AddProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: number;
  description: string;
  rating?: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [addPopup, setAddPopup] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "popular">("default");

  // Fetch Categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching Category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        // Add random ratings for demo
        const productsWithRatings = response.data.map((product: Product) => ({
          ...product,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)) // Random rating between 3.0-5.0
        }));
        setProducts(productsWithRatings);
        setFilteredProducts(productsWithRatings);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let data = [...products];

    if (searchQuery) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      data = data.filter((p) => p.category_id === selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        data.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        data.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(data);
  }, [searchQuery, selectedCategory, products, sortBy]);

  // Reusable Category Chip
  const CategoryChip = ({
    children,
    active,
    onClick,
    icon: Icon,
  }: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    icon?: React.ElementType;
  }) => (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
        active
          ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );

  // Loading Skeleton
  const ProductSkeleton = () => (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/10" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
        <div className="h-6 bg-white/10 rounded w-1/3 mt-4" />
      </div>
    </div>
  );

  // Simple fade-in animation CSS
  const fadeInStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideIn 0.5s ease-out forwards;
    }
  `;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Add CSS animations */}
      <style>{fadeInStyle}</style>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">Premium Collection</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
            Mirrors & Shell Decor
          </h1>

          <p className="max-w-2xl text-xl text-white/70 mb-8">
            Handcrafted luxury decor inspired by nature, reflection & elegance. Each piece tells a unique story.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group px-8 py-3 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Shop Collection
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 rounded-full border-white/20 hover:bg-white/10 hover:border-white/30"
            >
              View Gallery
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-linear-to-br from-indigo-500/20 to-transparent rounded-3xl rotate-12 blur-xl" />
        <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-linear-to-tr from-purple-500/20 to-transparent rounded-full blur-xl" />
      </div>

      {/* FILTER BAR */}
      <div 
        id="products"
        className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 animate-slide-in"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-indigo-500 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 pr-10"
                >
                  <option value="default">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
              </div>

              {/* Add Product Button */}
              <Button
                onClick={() => setAddPopup(true)}
                className="px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-500/25"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <CategoryChip
              active={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
            >
              All Products
            </CategoryChip>
            
            {categories.map((cat) => (
              <CategoryChip
                key={cat.id}
                active={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </CategoryChip>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="bg-linear-to-b from-white/5 to-transparent backdrop-blur border border-white/10 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-900 to-black">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Stock Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className={`px-3 py-1.5 rounded-full font-medium ${
                        product.stock > 0 
                          ? "bg-linear-to-r from-emerald-500/90 to-emerald-600/90" 
                          : "bg-linear-to-r from-rose-500/90 to-rose-600/90"
                      }`}>
                        {product.stock > 0 ? `${product.stock} left` : "Sold Out"}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/60 backdrop-blur border-white/20 px-3 py-1.5 rounded-full">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-xs font-semibold">{product.rating}</span>
                      </Badge>
                    </div>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="px-6 py-2.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-white/60 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          View Details →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-12 text-center text-white/60">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-12 text-center">
          {/* Fixed SVG background pattern - simplified */}
          <div className="absolute inset-0 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <g fill="#9C92AC" fillOpacity="0.05">
                  <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
                </g>
              </g>
            </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Our design experts are here to help you find the perfect piece for your space.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="px-8 py-3 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold">
                Book a Consultation
              </Button>
              <Button variant="outline" className="px-8 py-3 rounded-full border-white/30 hover:bg-white/10">
                Browse Inspiration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ADD PRODUCT DIALOG */}
      <AddProduct
        open={addPopup}
        onClose={() => setAddPopup(false)}
        categories={categories}
      />
    </div>
  );
}