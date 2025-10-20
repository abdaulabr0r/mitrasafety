import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Truck } from "lucide-react";
import { motion } from "framer-motion";
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
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight" 
            data-testid="text-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Perlengkapan Keselamatan Kerja Terlengkap
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8 text-white/90" 
            data-testid="text-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Produk berkualitas tinggi dengan harga terjangkau. Dipercaya oleh 500+ perusahaan di Indonesia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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
          </motion.div>

          <motion.div 
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Shield, title: "Produk Berstandar", desc: "Sertifikat SNI & ISO" },
              { icon: Truck, title: "Gratis Ongkir", desc: "Minimal pembelian 500rb" },
              { icon: ShoppingBag, title: "Harga Grosir", desc: "Untuk pembelian banyak" }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="rounded-full bg-white/20 p-2 backdrop-blur-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
