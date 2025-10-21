import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: string) => void;
}

const categories = [
  { id: "helmet", name: "Helm Safety", icon: "🪖" },
  { id: "gloves", name: "Sarung Tangan", icon: "🧤" },
  { id: "vest", name: "Rompi", icon: "🦺" },
  { id: "boots", name: "Sepatu Safety", icon: "👢" },
  { id: "goggles", name: "Kacamata", icon: "🥽" },
  { id: "mask", name: "Masker", icon: "😷" },
];

export default function Header({ cartItemCount = 0, onCartClick, onSearch, onCategoryClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  // Pintasan keyboard untuk pencarian - Keyboard shortcuts for search
  // Tekan "/" atau "s" untuk fokus ke search input
  // Press "/" or "s" to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika pengguna sedang mengetik di input/textarea
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Fokus ke search input saat "/" atau "s" ditekan
      // Focus search input when "/" or "s" is pressed
      if (e.key === "/" || e.key === "s") {
        e.preventDefault();
        // Fokus ke desktop atau mobile search tergantung layar yang terlihat
        // Focus desktop or mobile search depending on visible screen
        if (window.innerWidth >= 768) {
          searchInputRef.current?.focus();
        } else {
          mobileSearchInputRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background" role="banner">
      {/* Header navigasi utama - Main navigation header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Branding dan menu mobile - Branding and mobile menu */}
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-testid="button-mobile-menu"
                  aria-label="Buka menu navigasi"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64" id="mobile-menu">
                <nav aria-label="Menu navigasi mobile kategori">
                  <div className="flex flex-col gap-4 pt-8">
                    <h3 className="font-semibold text-foreground" id="mobile-category-heading">Kategori</h3>
                    {/* Daftar kategori produk - Product category list */}
                    <ul className="space-y-2" role="list" aria-labelledby="mobile-category-heading">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => {
                              onCategoryClick?.(category.id);
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 text-left hover-elevate active-elevate-2 rounded-md p-2 w-full"
                            data-testid={`button-category-${category.id}`}
                            aria-label={`Lihat produk ${category.name}`}
                          >
                            <span 
                              className="text-2xl select-none" 
                              role="img" 
                              aria-label={`Ikon ${category.name}`}
                              style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}
                            >
                              {category.icon}
                            </span>
                            <span className="text-foreground">{category.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <h1 className="text-lg font-bold text-primary md:text-xl" data-testid="text-brand">
              Mitra Safety
            </h1>
          </div>

          {/* Form pencarian desktop - Desktop search form */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-xl md:flex" role="search" aria-label="Pencarian produk">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Cari produk keselamatan kerja... (tekan / atau s)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
                data-testid="input-search"
                aria-label="Cari produk keselamatan. Tekan garis miring atau huruf s untuk fokus"
              />
            </div>
          </form>

          {/* Tombol aksi header - Header action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              data-testid="button-search-mobile"
              aria-label="Buka pencarian"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
              aria-label={cartItemCount > 0 ? `Keranjang belanja, ${cartItemCount} item` : "Keranjang belanja kosong"}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground" data-testid="text-cart-count" aria-hidden="true">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Navigasi kategori desktop - Desktop category navigation */}
        <div className="hidden border-t py-3 md:block">
          <nav className="flex flex-wrap items-center gap-2" aria-label="Navigasi kategori produk">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => onCategoryClick?.(category.id)}
                className="gap-2"
                data-testid={`button-category-${category.id}`}
                aria-label={`Filter produk ${category.name}`}
              >
                <span 
                  role="img" 
                  aria-label={`Ikon ${category.name}`}
                  className="select-none"
                  style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}
                >
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Form pencarian mobile - Mobile search form */}
      <div className="border-t md:hidden">
        <form onSubmit={handleSearch} className="container mx-auto px-4 py-2" role="search" aria-label="Pencarian produk mobile">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              ref={mobileSearchInputRef}
              type="search"
              placeholder="Cari produk keselamatan... (tekan / atau s)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
              data-testid="input-search-mobile"
              aria-label="Cari produk keselamatan. Tekan garis miring atau huruf s untuk fokus"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
