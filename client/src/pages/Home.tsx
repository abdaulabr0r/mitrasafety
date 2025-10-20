import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import CartSheet from "@/components/CartSheet";
import ProductDetailModal from "@/components/ProductDetailModal";
import FilterSidebar from "@/components/FilterSidebar";
import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Zustand stores
import { useCartStore } from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";

// API hooks
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

// Loading components
import { ProductGridSkeleton, CategoryGridSkeleton } from "@/components/LoadingSkeleton";



export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const { toast } = useToast();

  // Zustand stores
  const {
    items: cartItems,
    isOpen: cartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    getTotalItems,
    getSubtotal,
    getShipping,
    getTotal,
  } = useCartStore();

  const {
    filteredProducts,
    selectedProduct,
    isProductDetailOpen,
    filters,
    updateFilters,
    clearFilters,
    openProductDetail,
    closeProductDetail,
    setProducts,
  } = useProductStore();

  // API queries
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Update products in store when API data changes
  useEffect(() => {
    if (products.length > 0) {
      setProducts(products);
    }
  }, [products, setProducts]);

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    }, quantity);

    toast({
      title: "Ditambahkan ke keranjang",
      description: product.name,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "Dihapus dari keranjang",
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    updateFilters({ selectedCategories: [categoryId] });
    const element = document.getElementById("products-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.selectedCategories.includes(categoryId)
      ? filters.selectedCategories.filter((c) => c !== categoryId)
      : [...filters.selectedCategories, categoryId];
    
    updateFilters({ selectedCategories: newCategories });
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleProductClick = (product: any) => {
    openProductDetail(product);
  };

  const handleSearch = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  const totalCartItems = getTotalItems();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  const hasActiveFilters =
    filters.selectedCategories.length > 0 ||
    filters.inStockOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000000 ||
    filters.searchQuery !== "";



  return (
    <div className="flex min-h-screen flex-col">
      <Header
        cartItemCount={totalCartItems}
        onCartClick={openCart}
        onSearch={handleSearch}
        onCategoryClick={handleCategoryClick}
      />

      <main className="flex-1">
        <Hero onShopNowClick={() => handleCategoryClick("helmet")} />

        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground" data-testid="text-categories-title">
              Kategori Produk
            </h2>
          </div>
          {categoriesLoading ? (
            <CategoryGridSkeleton />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  productCount={category.productCount}
                  onClick={() => handleCategoryClick(category.id)}
                />
              ))}
            </div>
          )}
        </section>

        <section id="products-section" className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-foreground" data-testid="text-products-title">
              {filters.selectedCategories.length === 1
                ? categories.find((c) => c.id === filters.selectedCategories[0])?.name
                : "Semua Produk"}
            </h2>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  data-testid="button-clear-all-filters"
                >
                  Hapus Filter
                </Button>
              )}
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 md:hidden" data-testid="button-filter-mobile">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="pt-6">
                    <FilterSidebar
                      priceRange={filters.priceRange}
                      onPriceRangeChange={(range) => updateFilters({ priceRange: range })}
                      selectedCategories={filters.selectedCategories}
                      onCategoryToggle={handleCategoryToggle}
                      inStockOnly={filters.inStockOnly}
                      onInStockToggle={(inStock) => updateFilters({ inStockOnly: inStock })}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <FilterSidebar
                priceRange={filters.priceRange}
                onPriceRangeChange={(range) => updateFilters({ priceRange: range })}
                selectedCategories={filters.selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                inStockOnly={filters.inStockOnly}
                onInStockToggle={(inStock) => updateFilters({ inStockOnly: inStock })}
                onClearFilters={handleClearFilters}
              />
            </aside>

            <div>
              {productsLoading ? (
                <ProductGridSkeleton />
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-lg text-muted-foreground mb-4">
                    Tidak ada produk yang sesuai dengan filter Anda
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Hapus Filter
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      imageUrl={product.imageUrl}
                      badge={product.badge}
                      inStock={product.inStock}
                      onAddToCart={handleAddToCart}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Mengapa Memilih Mitra Safety?
            </h2>
            <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen menyediakan perlengkapan keselamatan kerja berkualitas tinggi
              dengan harga terjangkau untuk melindungi pekerja Indonesia.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-md border bg-background p-6">
                <div className="mb-3 text-4xl">✓</div>
                <h3 className="mb-2 font-semibold text-foreground">Produk Berstandar SNI</h3>
                <p className="text-sm text-muted-foreground">
                  Semua produk telah tersertifikasi dan memenuhi standar keselamatan nasional
                </p>
              </div>
              <div className="rounded-md border bg-background p-6">
                <div className="mb-3 text-4xl">🚚</div>
                <h3 className="mb-2 font-semibold text-foreground">Pengiriman Cepat</h3>
                <p className="text-sm text-muted-foreground">
                  Gratis ongkir untuk pembelian minimal Rp 500.000 ke seluruh Indonesia
                </p>
              </div>
              <div className="rounded-md border bg-background p-6">
                <div className="mb-3 text-4xl">💯</div>
                <h3 className="mb-2 font-semibold text-foreground">Dipercaya 500+ Perusahaan</h3>
                <p className="text-sm text-muted-foreground">
                  Menjadi mitra terpercaya berbagai industri di seluruh Indonesia
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartSheet
        open={cartOpen}
        onOpenChange={closeCart}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          closeCart();
          setCheckoutOpen(true);
        }}
      />

      <ProductDetailModal
        open={isProductDetailOpen}
        onOpenChange={closeProductDetail}
        product={selectedProduct}
        onAddToCart={(id, qty) => {
          handleAddToCart(id, qty);
          closeProductDetail();
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        total={total}
        onComplete={() => {
          setCheckoutOpen(false);
          clearCart();
          toast({
            title: "Pesanan Berhasil!",
            description: "Terima kasih telah berbelanja di Mitra Safety Indonesia.",
          });
        }}
      />
    </div>
  );
}
