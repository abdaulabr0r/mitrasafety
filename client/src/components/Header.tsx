import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-testid="button-mobile-menu"
                  aria-label="Buka menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-4 pt-8">
                  <h3 className="font-semibold text-foreground">Kategori</h3>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryClick?.(category.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-left hover-elevate active-elevate-2 rounded-md p-2"
                      data-testid={`button-category-${category.id}`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-foreground">{category.name}</span>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="text-lg font-bold text-primary md:text-xl" data-testid="text-brand">
              Mitra Safety
            </h1>
          </div>

          <form onSubmit={handleSearch} className="hidden flex-1 max-w-xl md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk keselamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
                data-testid="input-search"
                aria-label="Cari produk"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              data-testid="button-search-mobile"
              aria-label="Cari"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
              aria-label="Keranjang belanja"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground" data-testid="text-cart-count">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="hidden border-t py-3 md:block">
          <nav className="flex flex-wrap items-center gap-2" aria-label="Kategori produk">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => onCategoryClick?.(category.id)}
                className="gap-2"
                data-testid={`button-category-${category.id}`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t md:hidden">
        <form onSubmit={handleSearch} className="container mx-auto px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
              data-testid="input-search-mobile"
              aria-label="Cari produk"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
