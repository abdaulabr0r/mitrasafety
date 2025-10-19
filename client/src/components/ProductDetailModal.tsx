import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
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

  const images = product.images || [product.imageUrl];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
                data-testid="img-product-main"
              />
              {product.badge && (
                <Badge className="absolute left-2 top-2" data-testid="badge-product">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive" className="absolute right-2 top-2" data-testid="badge-discount">
                  -{discount}%
                </Badge>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-all hover-elevate ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
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
