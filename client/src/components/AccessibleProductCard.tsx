import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

interface AccessibleProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  inStock?: boolean;
  badge?: string;
  safetyStandards?: string[];
  certifications?: string[];
  onAddToCart?: (id: string) => void;
  onClick?: () => void;
}

export default function AccessibleProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  inStock = true,
  badge,
  safetyStandards = [],
  certifications = [],
  onAddToCart,
  onClick,
}: AccessibleProductCardProps) {
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

  // WCAG 2.2 compliant alt text - descriptive and informative
  const altText = `${name} - ${inStock ? 'Tersedia' : 'Stok habis'} - Harga ${formatPrice(price)}${originalPrice ? ` (diskon ${discount}%)` : ''}`;

  // ARIA label for the card
  const cardAriaLabel = `Produk ${name}, ${formatPrice(price)}${originalPrice ? `, hemat ${discount}% dari ${formatPrice(originalPrice)}` : ''}, ${inStock ? 'tersedia' : 'stok habis'}`;

  return (
    <AnimatedCard>
      <Card 
        className="overflow-hidden hover-elevate transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2" 
        data-testid={`card-product-${id}`}
        role="article"
        aria-label={cardAriaLabel}
      >
        <div className="relative cursor-pointer" onClick={onClick}>
          <div className="aspect-square overflow-hidden bg-muted">
            <motion.img
              src={imageUrl}
              alt={altText}
              className="h-full w-full object-cover"
              loading="lazy"
              data-testid="img-product"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              // WCAG: Ensure images have proper contrast and are not the sole method of conveying information
            />
          </div>
          
          {/* Badge with WCAG compliant contrast and redundant information */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute left-2 top-2"
            >
              <Badge 
                className="bg-primary text-primary-foreground font-semibold"
                data-testid="badge-product"
                aria-label={`Label produk: ${badge}`}
              >
                <CheckCircle className="h-3 w-3 mr-1" aria-hidden="true" />
                {badge}
              </Badge>
            </motion.div>
          )}
          
          {/* Discount badge with high contrast (WCAG 4.5:1 ratio) */}
          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute right-2 top-2"
            >
              <Badge 
                variant="destructive" 
                className="bg-red-600 text-white font-bold"
                data-testid="badge-discount"
                aria-label={`Diskon ${discount} persen`}
              >
                -{discount}%
              </Badge>
            </motion.div>
          )}
          
          {/* Stock status with redundant visual and text indicators */}
          {!inStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70"
              role="status"
              aria-live="polite"
            >
              <Badge 
                variant="secondary" 
                className="bg-gray-800 text-white border-2 border-white"
                data-testid="badge-out-of-stock"
              >
                <AlertCircle className="h-3 w-3 mr-1" aria-hidden="true" />
                Stok Habis
              </Badge>
            </motion.div>
          )}
        </div>

        <div className="p-4">
          {/* Product name with proper heading hierarchy */}
          <h3
            className="mb-2 line-clamp-2 font-semibold text-foreground cursor-pointer text-base"
            onClick={onClick}
            data-testid="text-product-name"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }}
            aria-label={`Lihat detail produk ${name}`}
          >
            {name}
          </h3>

          {/* Safety standards with icons and text (not color-only) */}
          {safetyStandards.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1" role="list" aria-label="Standar keselamatan">
              {safetyStandards.slice(0, 2).map((standard) => (
                <Badge 
                  key={standard}
                  variant="outline" 
                  className="text-xs bg-green-50 border-green-200 text-green-800"
                  role="listitem"
                >
                  <Shield className="h-2 w-2 mr-1" aria-hidden="true" />
                  {standard}
                </Badge>
              ))}
              {safetyStandards.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{safetyStandards.length - 2} lainnya
                </Badge>
              )}
            </div>
          )}

          {/* Price section with proper semantic structure */}
          <div className="mb-3 flex items-baseline gap-2" role="group" aria-label="Informasi harga">
            <span 
              className="text-lg font-bold text-foreground" 
              data-testid="text-product-price"
              aria-label={`Harga saat ini ${formatPrice(price)}`}
            >
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span 
                className="text-sm text-muted-foreground line-through" 
                data-testid="text-original-price"
                aria-label={`Harga asli ${formatPrice(originalPrice)}`}
              >
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* CTA Button with proper ARIA attributes and focus management */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full gap-2 min-h-[48px]" // WCAG minimum touch target size
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(id);
              }}
              disabled={!inStock}
              data-testid="button-add-to-cart"
              aria-label={inStock ? `Tambahkan ${name} ke keranjang` : `${name} sedang tidak tersedia`}
              aria-describedby={`price-${id}`}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {inStock ? "Tambah ke Keranjang" : "Stok Habis"}
            </Button>
          </motion.div>
          
          {/* Hidden price description for screen readers */}
          <span id={`price-${id}`} className="sr-only">
            {`Harga produk ${formatPrice(price)}${originalPrice ? ` dengan diskon dari ${formatPrice(originalPrice)}` : ''}`}
          </span>
        </div>
      </Card>
    </AnimatedCard>
  );
}