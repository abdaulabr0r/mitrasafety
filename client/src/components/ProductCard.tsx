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

  return (
    <AnimatedCard>
      <Card className="overflow-hidden hover-elevate transition-shadow" data-testid={`card-product-${id}`}>
        <div className="relative cursor-pointer" onClick={onClick}>
          <div className="aspect-square overflow-hidden bg-muted">
            <motion.img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
              data-testid="img-product"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="absolute left-2 top-2" data-testid="badge-product">
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
              <Badge variant="destructive" className="absolute right-2 top-2" data-testid="badge-discount">
                -{discount}%
              </Badge>
            </motion.div>
          )}
          {!inStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              <Badge variant="secondary" data-testid="badge-out-of-stock">
                Stok Habis
              </Badge>
            </motion.div>
          )}
        </div>

        <div className="p-4">
          <h3
            className="mb-2 line-clamp-2 font-semibold text-foreground cursor-pointer"
            onClick={onClick}
            data-testid="text-product-name"
          >
            {name}
          </h3>

          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground" data-testid="text-product-price">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through" data-testid="text-original-price">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

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
            >
              <ShoppingCart className="h-4 w-4" />
              {inStock ? "Tambah ke Keranjang" : "Stok Habis"}
            </Button>
          </motion.div>
        </div>
      </Card>
    </AnimatedCard>
  );
}
