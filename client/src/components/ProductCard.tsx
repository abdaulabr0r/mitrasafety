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
  protectionLevels?: string[];
  complianceStandards?: string[];
  hazardClasses?: string[];
  optimizedMedia?: { format: string; sizeKB?: number; note?: string; url?: string }[];
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
  protectionLevels = [],
  complianceStandards = [],
  hazardClasses = [],
  optimizedMedia = [],
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

  const protectionLabels: Record<string, string> = {
    "impact:steel-toe": "Steel Toe",
    "impact:composite-shell": "Cangkang Komposit",
    "puncture:kevlar-midsole": "Midsole Kevlar",
    "electrical:class-e": "Helm Class E",
    "electrical:eh": "Bersertifikat EH",
    "visibility:hi-vis-class2": "Hi-Vis Class 2",
    "surface:slip-resistant": "Sol Anti-Selip",
    "vision:anti-fog": "Lensa Anti-Kabut",
    "respiratory:n95": "Respirator N95",
    "hand:cut-level-a3": "Tahan Goresan A3",
    "surface:grip-support": "Cengkeraman Anti-Oli",
  };

  const hazardLabels: Record<string, string> = {
    "Impact Hazard": "Bahaya Benturan",
    "Head Impact": "Benturan Kepala",
    "Electrical Hazard": "Bahaya Listrik",
    "Oil & Slip Hazard": "Bahaya Oli & Licin",
    "Roadway Work Zone": "Zona Kerja Jalan",
    "Dust & Debris": "Debu & Serpihan",
    "UV Exposure": "Paparan UV",
    "Dust & Particulate": "Debu & Partikel",
    "Abrasion Hazard": "Bahaya Gesekan",
  };

  const protectionBadges = protectionLevels
    .map((item) => protectionLabels[item] ?? item)
    .filter(Boolean)
    .slice(0, 3);

  const hazardBadges = hazardClasses
    .map((item) => hazardLabels[item] ?? item)
    .filter(Boolean)
    .slice(0, 2);

  const standardHighlights = complianceStandards.slice(0, 2);

  const mediaHints = optimizedMedia
    .map((variant) => {
      const format = variant.format?.toUpperCase();
      if (!format) return null;
      if (variant.sizeKB) {
        return `${format} ${variant.sizeKB}KB`;
      }
      if (variant.note) {
        return `${format} • ${variant.note}`;
      }
      return format;
    })
    .filter(Boolean)
    .slice(0, 2) as string[];

  // Alt text deskriptif untuk gambar produk - Descriptive alt text for product images
  // Menyertakan nama produk, status stok, harga, dan diskon jika ada
  // Includes product name, stock status, price, and discount if available
  const productAltText = `${name} - Produk keselamatan kerja${
    badge ? ` ${badge}` : ''
  }${
    discount > 0 ? `, diskon ${discount}%` : ''
  }${
    !inStock ? ', stok habis' : ''
  }${
    standardHighlights.length ? `, standar ${standardHighlights.join(' & ')}` : ''
  } - Harga ${formatPrice(price)}${
    originalPrice ? ` dari ${formatPrice(originalPrice)}` : ''
  }`;

  return (
    <AnimatedCard>
      {/*
        Gunakan elemen <article> untuk setiap kartu produk. Ini secara semantik
        mengidentifikasi setiap kartu sebagai konten mandiri yang dapat didistribusikan.
        Use <article> for each product card. This semantically identifies each card
        as a self-contained, distributable piece of content.
      */}
      <Card
        className="overflow-hidden hover-elevate transition-shadow flex flex-col h-full"
        data-testid={`card-product-${id}`}
        role="article"
        aria-labelledby={`product-name-${id}`}
      >
        {/*
          Bungkus gambar dan nama produk dalam satu tombol untuk menyederhanakan interaksi.
          Ini menciptakan satu target klik yang jelas untuk navigasi ke detail produk.
          Wrap the product image and name in a single button to simplify interaction.
          This creates a clear, single click target for navigating to product details.
        */}
        <button
          type="button"
          onClick={onClick}
          className="relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-md"
          aria-label={`Lihat detail untuk ${name}`}
        >
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
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="absolute left-2 top-2" data-testid="badge-product" aria-hidden="true">
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
              <Badge variant="destructive" className="absolute right-2 top-2" data-testid="badge-discount" aria-hidden="true">
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
              <Badge variant="secondary" data-testid="badge-out-of-stock" aria-hidden="true">
                Stok Habis
              </Badge>
            </motion.div>
          )}
        </button>

        <div className="p-4 flex flex-col flex-grow">
          <h3
            id={`product-name-${id}`}
            className="mb-2 line-clamp-2 font-semibold text-foreground"
            data-testid="text-product-name"
          >
            {/*
              Buat judul produk sebagai tautan untuk aksesibilitas dan SEO yang lebih baik.
              Ini memberikan cara navigasi alternatif bagi pengguna pembaca layar.
              Make the product title a link for better accessibility and SEO.
              This provides an alternative way for screen reader users to navigate.
            */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClick?.();
              }}
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {name}
            </a>
          </h3>

          <div className="mt-auto">
            {(protectionBadges.length > 0 || hazardBadges.length > 0) && (
              <div className="mb-3 flex flex-wrap gap-2">
                {protectionBadges.map((label) => (
                  <Badge key={`${id}-protection-${label}`} variant="outline" className="text-xs font-medium">
                    {label}
                  </Badge>
                ))}
                {hazardBadges.map((label) => (
                  <Badge key={`${id}-hazard-${label}`} variant="secondary" className="text-xs font-medium">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
            {standardHighlights.length > 0 && (
              <p className="mb-3 text-xs text-muted-foreground" aria-label={`Standar utama ${standardHighlights.join(', ')}`}>
                Standar: <span className="font-medium text-foreground">{standardHighlights.join(" • ")}</span>
              </p>
            )}
            {mediaHints.length > 0 && (
              <p className="mb-3 text-xs text-muted-foreground" aria-label={`Rekomendasi format gambar ${mediaHints.join(', ')}`}>
                Format unggulan: {mediaHints.join(" • ")}
              </p>
            )}
            <div className="mb-3 flex items-baseline gap-2" aria-label={`Harga: ${formatPrice(price)}`}>
              <span className="text-lg font-bold text-foreground" data-testid="text-product-price">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through" data-testid="text-original-price" aria-label="Harga asli">
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
                aria-label={inStock ? `Tambah ${name} ke keranjang` : `${name} saat ini tidak tersedia`}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {inStock ? "Tambah ke Keranjang" : "Stok Habis"}
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </AnimatedCard>
  );
}
