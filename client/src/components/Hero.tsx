import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Truck } from "lucide-react";
import heroImage from "@assets/generated_images/Indonesian_worker_safety_hero_image_db7e2279.png";

interface HeroProps {
  onShopNowClick?: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight" data-testid="text-hero-title">
            Perlengkapan Keselamatan Kerja Terlengkap
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90" data-testid="text-hero-subtitle">
            Produk berkualitas tinggi dengan harga terjangkau. Dipercaya oleh 500+ perusahaan di Indonesia.
          </p>
          <Button
            size="lg"
            variant="default"
            onClick={onShopNowClick}
            className="gap-2 min-h-12 px-8"
            data-testid="button-shop-now"
          >
            <ShoppingBag className="h-5 w-5" />
            Belanja Sekarang
          </Button>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Produk Berstandar</h3>
                <p className="text-sm text-white/80">Sertifikat SNI & ISO</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Gratis Ongkir</h3>
                <p className="text-sm text-white/80">Minimal pembelian 500rb</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Harga Grosir</h3>
                <p className="text-sm text-white/80">Untuk pembelian banyak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
