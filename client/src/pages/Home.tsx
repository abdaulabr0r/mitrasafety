import { useState, useEffect, useRef } from "react";
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
import { Filter, Building2, ClipboardList, Factory, Users } from "lucide-react";
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
  const [activeSegment, setActiveSegment] = useState<"retail" | "corporate">("retail");
  const retailSectionRef = useRef<HTMLElement | null>(null);
  const corporateSectionRef = useRef<HTMLElement | null>(null);
  
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

  useEffect(() => {
    const retailElement = retailSectionRef.current;
    const corporateElement = corporateSectionRef.current;

    if (!retailElement || !corporateElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const segmentId = entry.target.getAttribute("data-segment-id");
            if (segmentId === "retail" || segmentId === "corporate") {
              setActiveSegment(segmentId);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(retailElement);
    observer.observe(corporateElement);

    return () => {
      observer.disconnect();
    };
  }, []);

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

  const handleProtectionToggle = (value: string) => {
    const updated = filters.protectionFilters.includes(value)
      ? filters.protectionFilters.filter((item) => item !== value)
      : [...filters.protectionFilters, value];

    updateFilters({ protectionFilters: updated });
  };

  const handleStandardToggle = (value: string) => {
    const updated = filters.standardFilters.includes(value)
      ? filters.standardFilters.filter((item) => item !== value)
      : [...filters.standardFilters, value];

    updateFilters({ standardFilters: updated });
  };

  const handleHazardToggle = (value: string) => {
    const updated = filters.hazardFilters.includes(value)
      ? filters.hazardFilters.filter((item) => item !== value)
      : [...filters.hazardFilters, value];

    updateFilters({ hazardFilters: updated });
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
    filters.searchQuery !== "" ||
    filters.protectionFilters.length > 0 ||
    filters.standardFilters.length > 0 ||
    filters.hazardFilters.length > 0;

  const corporateHighlights = [
    {
      icon: Building2,
      title: "Dashboard Procurement",
      description: "Pantau kuota subsidi karyawan, status pesanan, dan inventaris secara real-time.",
    },
    {
      icon: ClipboardList,
      title: "Approval Bertingkat",
      description: "Dukung alur persetujuan multi-level dengan jejak audit lengkap untuk tim Anda.",
    },
    {
      icon: Factory,
      title: "Integrasi Inventaris",
      description: "Sinkronkan stok gudang melalui API atau unggahan CSV terjadwal setiap hari.",
    },
    {
      icon: Users,
      title: "Manajemen Subsidi",
      description: "Tetapkan plafon pembelian per karyawan dan validasi otomatis saat checkout.",
    },
  ];

  const handleSegmentNavigation = (segment: "retail" | "corporate") => {
    setActiveSegment(segment);
    const element = segment === "retail" ? retailSectionRef.current : corporateSectionRef.current;
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };



  return (
    <div className="flex min-h-screen flex-col" lang="id">
      <Header
        cartItemCount={totalCartItems}
        onCartClick={openCart}
        onSearch={handleSearch}
        onCategoryClick={handleCategoryClick}
      />

      <nav
        className="border-b bg-card/70 backdrop-blur"
        aria-label="Pilih jalur belanja"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Sesuaikan pengalaman Mitra Safety untuk belanja retail atau kebutuhan korporat.
            </p>
            <div
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
              role="group"
              aria-label="Segment belanja"
            >
              <Button
                type="button"
                variant={activeSegment === "retail" ? "default" : "ghost"}
                className="w-full justify-center sm:w-auto"
                aria-pressed={activeSegment === "retail"}
                aria-controls="retail-experience"
                onClick={() => handleSegmentNavigation("retail")}
              >
                Belanja Retail
              </Button>
              <Button
                type="button"
                variant={activeSegment === "corporate" ? "default" : "ghost"}
                className="w-full justify-center sm:w-auto"
                aria-pressed={activeSegment === "corporate"}
                aria-controls="corporate-solutions"
                onClick={() => handleSegmentNavigation("corporate")}
              >
                Solusi Korporat
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Konten utama halaman - Main page content */}
      <main className="flex-1 bg-background" id="main-content" role="main">
        <section
          ref={retailSectionRef}
          data-segment-id="retail"
          id="retail-experience"
          className="space-y-12 pb-12"
          aria-labelledby="hero-title"
        >
          <Hero onShopNowClick={() => handleCategoryClick("helmet")} />

          {/* Bagian kategori produk - Product categories section */}
          <section className="container mx-auto px-4" aria-labelledby="categories-heading">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="categories-heading" className="text-2xl font-bold text-foreground" data-testid="text-categories-title">
                Kategori Produk
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg">
                Pilih kategori untuk langsung menelusuri perlengkapan keselamatan sesuai kebutuhan Anda.
              </p>
            </div>
            {categoriesLoading ? (
              <CategoryGridSkeleton />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Daftar kategori produk">
                {categories.map((category) => (
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

          {/* Bagian daftar produk - Products listing section */}
          <section id="products-section" className="container mx-auto px-4" aria-labelledby="products-heading">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="products-heading" className="text-2xl font-bold text-foreground" data-testid="text-products-title">
                {filters.selectedCategories.length === 1
                  ? categories.find((c) => c.id === filters.selectedCategories[0])?.name
                  : "Semua Produk"}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    data-testid="button-clear-all-filters"
                    aria-label="Hapus semua filter produk"
                  >
                    Hapus Filter
                  </Button>
                )}
                <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 md:hidden" data-testid="button-filter-mobile" aria-label="Buka panel filter produk">
                      <Filter className="h-4 w-4" aria-hidden="true" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80" aria-label="Panel filter produk mobile">
                    <div className="pt-6">
                      <FilterSidebar
                        priceRange={filters.priceRange}
                        onPriceRangeChange={(range) => updateFilters({ priceRange: range })}
                        selectedCategories={filters.selectedCategories}
                        onCategoryToggle={handleCategoryToggle}
                        inStockOnly={filters.inStockOnly}
                        onInStockToggle={(inStock) => updateFilters({ inStockOnly: inStock })}
                      selectedProtections={filters.protectionFilters}
                      onProtectionToggle={handleProtectionToggle}
                      selectedStandards={filters.standardFilters}
                      onStandardToggle={handleStandardToggle}
                      selectedHazards={filters.hazardFilters}
                      onHazardToggle={handleHazardToggle}
                        onClearFilters={handleClearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
              {/* Sidebar filter desktop - Desktop filter sidebar */}
              <aside className="hidden rounded-lg border bg-card/60 p-4 lg:block" aria-label="Filter produk">
                <FilterSidebar
                  priceRange={filters.priceRange}
                  onPriceRangeChange={(range) => updateFilters({ priceRange: range })}
                  selectedCategories={filters.selectedCategories}
                  onCategoryToggle={handleCategoryToggle}
                  inStockOnly={filters.inStockOnly}
                  onInStockToggle={(inStock) => updateFilters({ inStockOnly: inStock })}
                selectedProtections={filters.protectionFilters}
                onProtectionToggle={handleProtectionToggle}
                selectedStandards={filters.standardFilters}
                onStandardToggle={handleStandardToggle}
                selectedHazards={filters.hazardFilters}
                onHazardToggle={handleHazardToggle}
                  onClearFilters={handleClearFilters}
                />
              </aside>

              {/* Grid produk - Product grid */}
              <div role="region" aria-live="polite" aria-atomic="false" aria-label="Hasil pencarian produk">
                {productsLoading ? (
                  <ProductGridSkeleton />
                ) : filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-card/60 p-12 text-center" role="status">
                    <p className="mb-4 text-lg text-muted-foreground">
                      Tidak ada produk yang sesuai dengan filter Anda
                    </p>
                    <Button onClick={handleClearFilters} variant="outline" aria-label="Hapus semua filter untuk melihat produk">
                      Hapus Filter
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label={`${filteredProducts.length} produk ditemukan`}>
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        imageUrl={product.imageUrl}
                        badge={product.badge}
                        inStock={product.inStock}
                        protectionLevels={product.protectionLevels}
                        complianceStandards={product.complianceStandards}
                        hazardClasses={product.hazardClasses}
                        optimizedMedia={product.optimizedMedia}
                        onAddToCart={handleAddToCart}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Bagian keunggulan - Benefits section */}
          <section className="bg-card py-12 md:py-16" aria-labelledby="benefits-heading">
            <div className="container mx-auto px-4 text-center">
              <h2 id="benefits-heading" className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                Mengapa Memilih Mitra Safety?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                Kami berkomitmen menyediakan perlengkapan keselamatan kerja berkualitas tinggi
                dengan harga terjangkau untuk melindungi pekerja Indonesia.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Keunggulan Mitra Safety">
                <article className="rounded-md border bg-background p-6 text-left">
                  <div className="mb-3 text-4xl" role="img" aria-label="Ikon checklist">✓</div>
                  <h3 className="mb-2 font-semibold text-foreground">Produk Berstandar SNI</h3>
                  <p className="text-sm text-muted-foreground">
                    Semua produk telah tersertifikasi dan memenuhi standar keselamatan nasional
                  </p>
                </article>
                <article className="rounded-md border bg-background p-6 text-left">
                  <div className="mb-3 text-4xl" role="img" aria-label="Ikon truk pengiriman">🚚</div>
                  <h3 className="mb-2 font-semibold text-foreground">Pengiriman Cepat</h3>
                  <p className="text-sm text-muted-foreground">
                    Gratis ongkir untuk pembelian minimal Rp 500.000 ke seluruh Indonesia
                  </p>
                </article>
                <article className="rounded-md border bg-background p-6 text-left">
                  <div className="mb-3 text-4xl" role="img" aria-label="Ikon seratus persen">💯</div>
                  <h3 className="mb-2 font-semibold text-foreground">Dipercaya 500+ Perusahaan</h3>
                  <p className="text-sm text-muted-foreground">
                    Menjadi mitra terpercaya berbagai industri di seluruh Indonesia
                  </p>
                </article>
              </div>
            </div>
          </section>
        </section>

        <section
          ref={corporateSectionRef}
          data-segment-id="corporate"
          id="corporate-solutions"
          className="border-t border-border bg-muted/40 py-12 md:py-16"
          aria-labelledby="corporate-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Solusi B2B
              </span>
              <h2 id="corporate-heading" className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Procurement Safety Gear Tanpa Rumit
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Automasi seluruh proses pengadaan dengan dashboard terpusat, dari manajemen subsidi hingga integrasi inventaris.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Fitur solusi korporat Mitra Safety">
              {corporateHighlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <article key={highlight.title} className="flex flex-col gap-3 rounded-lg border bg-background p-6 text-left shadow-sm">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full justify-center sm:w-auto">
                <a href="mailto:b2b@mitrasafety.co.id" aria-label="Hubungi tim B2B Mitra Safety via email">
                  Hubungi Tim B2B
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Jam layanan Senin–Jumat, 09.00–17.00 WIB
              </p>
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
