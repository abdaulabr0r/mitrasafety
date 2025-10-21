import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description?: string;
    imageUrl: string;
    images?: string[];
    category: string;
    badge?: string;
    inStock: boolean;
    specifications?: { label: string; value: string }[];
    protectionLevels?: string[];
    complianceStandards?: string[];
    hazardClasses?: string[];
    optimizedMedia?: { format: string; sizeKB?: number; note?: string; url?: string }[];
  } | null;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductDetailModal({
  open,
  onOpenChange,
  product,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;
  
  const images = product.images || [product.imageUrl];
  const protectionLevels = product.protectionLevels ?? [];
  const complianceStandards = product.complianceStandards ?? [];
  const hazardClasses = product.hazardClasses ?? [];
  const optimizedMedia = product.optimizedMedia ?? [];

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

  // Alt text deskriptif untuk gambar produk detail - Descriptive alt text for product detail images
  // Menyertakan nama produk, kategori, status stok, dan informasi tambahan
  // Includes product name, category, stock status, and additional information
  const mainImageAlt = `${product.name} - ${product.category}${
    product.badge ? `, ${product.badge}` : ''
  } - ${product.inStock ? 'Tersedia' : 'Stok habis'} - Gambar produk utama`;

  // Navigasi keyboard untuk galeri gambar - Keyboard navigation for image gallery
  // Gunakan panah kiri/kanan untuk berpindah gambar
  // Use left/right arrows to navigate images
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigasi gambar dengan panah kiri/kanan - Navigate images with left/right arrows
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, images.length]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        aria-describedby="product-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <p id="product-modal-description" className="sr-only">
            Modal detail produk. Gunakan panah kiri dan kanan untuk navigasi gambar. Tekan Escape untuk menutup.
            Product detail modal. Use left and right arrow keys to navigate images. Press Escape to close.
          </p>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
              {/* 
                Gambar utama produk dengan optimasi - Main product image with optimization
                
                Optimasi yang diterapkan - Applied optimizations:
                - width & height: Mencegah Cumulative Layout Shift (CLS)
                - Tidak menggunakan lazy loading karena gambar modal biasanya langsung terlihat
                - Modal images don't use lazy loading as they are immediately visible
                
                Untuk gambar produk baru - For new product images:
                - Gunakan format WebP dengan fallback PNG untuk kompatibilitas maksimal
                - Use WebP format with PNG fallback for maximum compatibility
              */}
              <img
                src={images[selectedImage]}
                alt={mainImageAlt}
                className="h-full w-full object-cover"
                width={600}
                height={600}
                data-testid="img-product-main"
              />
              {product.badge && (
                <Badge className="absolute left-2 top-2" data-testid="badge-product" aria-label={`Label produk: ${product.badge}`}>
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive" className="absolute right-2 top-2" data-testid="badge-discount" aria-label={`Diskon ${discount} persen`}>
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Galeri thumbnail gambar - Image thumbnail gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2" role="tablist" aria-label="Galeri gambar produk">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-all hover-elevate ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                    role="tab"
                    aria-selected={selectedImage === index}
                    aria-label={`Tampilkan gambar ${index + 1} dari ${images.length}${selectedImage === index ? ', sedang ditampilkan' : ''}`}
                  >
                    {/* 
                      Thumbnail dengan optimasi - Thumbnail with optimization
                      - loading="lazy": Thumbnail menggunakan lazy loading untuk performa
                      - width & height: Mencegah layout shift
                    */}
                    <img
                      src={image}
                      alt={`${product.name} - Tampilan ${index + 1} dari ${images.length} - ${product.category}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={150}
                      height={150}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="text-product-name">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-warning text-warning" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.0) • 127 penilaian</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary" data-testid="text-product-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through" data-testid="text-original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {product.inStock ? (
              <Badge variant="outline" className="text-success border-success">
                Stok Tersedia
              </Badge>
            ) : (
              <Badge variant="destructive">Stok Habis</Badge>
            )}

            {(protectionLevels.length > 0 || complianceStandards.length > 0 || hazardClasses.length > 0) && (
              <div className="space-y-3 rounded-md border bg-card/60 p-4 text-sm">
                {protectionLevels.length > 0 && (
                  <div>
                    <p className="mb-2 font-semibold text-foreground">Perlindungan Utama</p>
                    <div className="flex flex-wrap gap-2">
                      {protectionLevels.map((item) => (
                        <Badge key={`protection-${item}`} variant="outline" className="text-xs font-medium">
                          {protectionLabels[item] ?? item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {complianceStandards.length > 0 && (
                  <div>
                    <p className="mb-1 font-semibold text-foreground">Standar Sertifikasi</p>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      {complianceStandards.map((standard) => (
                        <li key={`standard-${standard}`}>{standard}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {hazardClasses.length > 0 && (
                  <div>
                    <p className="mb-1 font-semibold text-foreground">Risiko yang Ditangani</p>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      {hazardClasses.map((hazard) => (
                        <li key={`hazard-${hazard}`}>{hazard}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {optimizedMedia.length > 0 && (
              <div className="rounded-md border bg-card/60 p-4 text-sm text-muted-foreground">
                <p className="mb-2 font-semibold text-foreground">Panduan Optimasi Gambar</p>
                <ul className="space-y-1">
                  {optimizedMedia.map((variant, index) => (
                    <li key={`media-${variant.format}-${index}`}>
                      <span className="font-medium text-foreground">{variant.format?.toUpperCase()}</span>
                      {variant.sizeKB ? ` • ${variant.sizeKB}KB` : null}
                      {variant.note ? ` • ${variant.note}` : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 border-y py-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">Jumlah:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    data-testid="button-decrease-quantity"
                    aria-label="Kurangi jumlah"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    data-testid="button-increase-quantity"
                    aria-label="Tambah jumlah"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={() => {
                  onAddToCart?.(product.id, quantity);
                  setQuantity(1);
                }}
                disabled={!product.inStock}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                Tambah ke Keranjang
              </Button>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Deskripsi
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1">
                  Spesifikasi
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description ||
                    "Produk keselamatan kerja berkualitas tinggi yang dirancang untuk melindungi pekerja dari berbagai risiko di tempat kerja. Memenuhi standar SNI dan tersertifikasi untuk penggunaan industri."}
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="space-y-2">
                {product.specifications ? (
                  <dl className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="font-semibold text-foreground">{spec.label}:</dt>
                        <dd className="text-muted-foreground">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Spesifikasi detail akan segera tersedia.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
