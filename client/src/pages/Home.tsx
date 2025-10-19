import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import CartSheet from "@/components/CartSheet";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

import helmetImage from "@assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png";
import glovesImage from "@assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png";
import vestImage from "@assets/generated_images/Safety_vest_product_photo_f0077f14.png";
import bootsImage from "@assets/generated_images/Safety_boots_product_photo_a89a15d4.png";
import gogglesImage from "@assets/generated_images/Safety_goggles_product_photo_3808d9b3.png";
import maskImage from "@assets/generated_images/Safety_mask_product_photo_5ed8c680.png";
import helmetYellowImage from "@assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png";

//todo: remove mock functionality
const mockProducts = [
  {
    id: "1",
    name: "Helm Safety Proyek MSA V-Gard dengan Ventilasi",
    price: 125000,
    originalPrice: 175000,
    imageUrl: helmetImage,
    category: "helmet",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "2",
    name: "Sarung Tangan Safety Premium Anti-Slip",
    price: 45000,
    imageUrl: glovesImage,
    category: "gloves",
    inStock: true,
  },
  {
    id: "3",
    name: "Rompi Safety High-Visibility dengan Reflektif",
    price: 65000,
    originalPrice: 85000,
    imageUrl: vestImage,
    category: "vest",
    inStock: true,
  },
  {
    id: "4",
    name: "Sepatu Safety Boot Steel Toe Cap",
    price: 350000,
    imageUrl: bootsImage,
    category: "boots",
    inStock: true,
  },
  {
    id: "5",
    name: "Kacamata Safety Anti-Fog UV Protection",
    price: 55000,
    originalPrice: 75000,
    imageUrl: gogglesImage,
    category: "goggles",
    badge: "Promo",
    inStock: true,
  },
  {
    id: "6",
    name: "Masker N95 Respirator 3M",
    price: 25000,
    imageUrl: maskImage,
    category: "mask",
    inStock: false,
  },
  {
    id: "7",
    name: "Helm Safety Standar SNI Kuning",
    price: 85000,
    imageUrl: helmetYellowImage,
    category: "helmet",
    inStock: true,
  },
  {
    id: "8",
    name: "Sarung Tangan Kulit Safety Premium",
    price: 75000,
    originalPrice: 95000,
    imageUrl: glovesImage,
    category: "gloves",
    inStock: true,
  },
];

//todo: remove mock functionality
const mockCategories = [
  { id: "helmet", name: "Helm Safety", icon: "🪖", productCount: 24 },
  { id: "gloves", name: "Sarung Tangan", icon: "🧤", productCount: 18 },
  { id: "vest", name: "Rompi Safety", icon: "🦺", productCount: 15 },
  { id: "boots", name: "Sepatu Safety", icon: "👢", productCount: 12 },
  { id: "goggles", name: "Kacamata Pelindung", icon: "🥽", productCount: 20 },
  { id: "mask", name: "Masker & Respirator", icon: "😷", productCount: 16 },
];

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl,
        },
      ];
    });

    toast({
      title: "Ditambahkan ke keranjang",
      description: product.name,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    toast({
      title: "Dihapus dari keranjang",
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById("products-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory)
    : mockProducts;

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        cartItemCount={totalCartItems}
        onCartClick={() => setCartOpen(true)}
        onSearch={(query) => console.log("Search:", query)}
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                icon={category.icon}
                productCount={category.productCount}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </section>

        <section id="products-section" className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-foreground" data-testid="text-products-title">
              {selectedCategory
                ? mockCategories.find((c) => c.id === selectedCategory)?.name
                : "Produk Terlaris"}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-primary hover:underline"
                data-testid="button-clear-filter"
              >
                Lihat Semua Produk
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                onAddToCart={handleAddToCart}
                onClick={() => console.log("Product clicked:", product.id)}
              />
            ))}
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
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          toast({
            title: "Checkout",
            description: "Fitur checkout akan segera hadir!",
          });
        }}
      />
    </div>
  );
}
