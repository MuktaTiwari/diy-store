import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddProduct from "@/components/AddProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: number;
  description: string;
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
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let data = products;

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

    setFilteredProducts(data);
  }, [searchQuery, selectedCategory, products]);

  // Reusable Category Button
  const CategoryButton = ({
    children,
    active,
    onClick,
  }: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm transition ${
        active
          ? "bg-white text-black"
          : "bg-white/10 border border-white/20 hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-transparent" />
        <div className="container mx-auto px-6 pt-28 pb-16 relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm">
            Premium Collection
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Mirrors & Shell Decor
          </h1>

          <p className="max-w-xl text-white/70 text-lg">
            Handcrafted luxury decor inspired by nature, reflection & elegance.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-20 bg-[#020617]/80 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/20 py-2 pl-4 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <CategoryButton active={selectedCategory === "all"} onClick={() => setSelectedCategory("all")}>
              All
            </CategoryButton>

            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                active={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </CategoryButton>
            ))}
          </div>

          <Button
            onClick={() => setAddPopup(true)}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
          >
            + Add Product
          </Button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center text-white/60">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-white/60">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group bg-white/5 backdrop-blur border border-white/10 hover:border-indigo-500/40 transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 0 ? "bg-green-500/90" : "bg-red-500/90"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out"}
                  </span>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {product.name}
                  </h3>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-3">
                    <span className="text-2xl font-bold text-indigo-400">
                      ₹{product.price}
                    </span>
                  </div>
                </CardContent>

                {/* Action */}
                <CardFooter className="p-6 pt-0">
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

      {/* ADD PRODUCT DIALOG */}
      <AddProduct
        open={addPopup}
        onClose={() => setAddPopup(false)}
        categories={categories}
      />
    </div>
  );
}
