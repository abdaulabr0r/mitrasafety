import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  inStock?: boolean;
  badge?: string;
  onAddToCart?: (id: string) => void;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  inStock = true,
  badge,
  onAddToCart,
  onClick,
}: ProductCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Alt text deskriptif untuk gambar produk - Descriptive alt text for product images
  // Menyertakan nama produk, status stok, harga, dan diskon jika ada
  // Includes product name, stock status, price, and discount if available
  const productAltText = `${name} - Produk keselamatan kerja${
    badge ? ` ${badge}` : ''
  }${
    discount > 0 ? `, diskon ${discount}%` : ''
  }${
    !inStock ? ', stok habis' : ''
  } - Harga ${formatPrice(price)}${
    originalPrice ? ` dari ${formatPrice(originalPrice)}` : ''
  }`;

  return (
    <AnimatedCard>
      {/* Kartu produk - Product card */}
      <Card 
        className="overflow-hidden hover-elevate transition-shadow" 
        data-testid={`card-product-${id}`}
        role="article"
        aria-label={`Produk ${name}`}
      >
        <div 
          className="relative cursor-pointer" 
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }}
          aria-label={`Lihat detail ${name}`}
        >
          {/* 
            Gambar produk dengan optimasi performa - Product image with performance optimization
            
            Optimasi yang diterapkan - Applied optimizations:
            - loading="lazy": Lazy loading untuk menghemat bandwidth dan mempercepat initial load
            - width & height: Mencegah Cumulative Layout Shift (CLS) saat gambar dimuat
            - aspect-square: Menjaga rasio aspek 1:1 untuk konsistensi tampilan
            
            Untuk gambar produk baru - For new product images:
            - Gunakan format WebP untuk ukuran file lebih kecil (30-50% lebih kecil dari PNG)
            - Gunakan fallback PNG untuk kompatibilitas browser lama
            - Contoh: <picture><source srcset="image.webp" type="image/webp"><img src="image.png"></picture>
          */}
          <div className="aspect-square overflow-hidden bg-muted">
            <motion.img
              src={imageUrl}
              alt={productAltText}
              className="h-full w-full object-cover"
              loading="lazy"
              width={400}
              height={400}
              data-testid="img-product"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Badge dan indikator - Badges and indicators */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="absolute left-2 top-2" data-testid="badge-product" aria-label={`Label produk: ${badge}`}>
                {badge}
              </Badge>
            </motion.div>
          )}
          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="destructive" className="absolute right-2 top-2" data-testid="badge-discount" aria-label={`Diskon ${discount} persen`}>
                -{discount}%
              </Badge>
            </motion.div>
          )}
          {!inStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
              aria-live="polite"
            >
              <Badge variant="secondary" data-testid="badge-out-of-stock" aria-label="Produk habis stok">
                Stok Habis
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Informasi produk - Product information */}
        <div className="p-4">
          <h3
            className="mb-2 line-clamp-2 font-semibold text-foreground cursor-pointer"
            onClick={onClick}
            data-testid="text-product-name"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }}
          >
            {name}
          </h3>

          {/* Harga produk - Product pricing */}
          <div className="mb-3 flex items-baseline gap-2" aria-label={`Harga produk ${formatPrice(price)}${originalPrice ? `, harga asli ${formatPrice(originalPrice)}` : ''}`}>
            <span className="text-lg font-bold text-foreground" data-testid="text-product-price">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through" data-testid="text-original-price" aria-label="Harga sebelum diskon">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Tombol tambah ke keranjang - Add to cart button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(id);
              }}
              disabled={!inStock}
              data-testid="button-add-to-cart"
              aria-label={inStock ? `Tambah ${name} ke keranjang` : `${name} habis stok`}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {inStock ? "Tambah ke Keranjang" : "Stok Habis"}
            </Button>
          </motion.div>
        </div>
      </Card>
    </AnimatedCard>
  );
}
