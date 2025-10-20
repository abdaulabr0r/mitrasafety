import { Button } from "@/components/ui/button";
import { ShoppingBag, Shield, Truck } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/Indonesian_worker_safety_hero_image_db7e2279.png";

interface HeroProps {
  onShopNowClick?: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section 
      className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden" 
      aria-label="Banner promosi utama"
    >
      {/* 
        Gambar latar belakang hero dengan optimasi - Hero background image with optimization
        
        Optimasi yang diterapkan - Applied optimizations:
        - Background image menggunakan import static untuk optimasi Vite
        - Vite secara otomatis mengoptimalkan gambar yang diimport
        - Gradient overlay memastikan teks tetap terbaca di berbagai tema
        
        Untuk gambar hero baru - For new hero images:
        - Gunakan format WebP dengan ukuran file optimal (maksimal 200KB)
        - Pertimbangkan menggunakan gambar dengan resolusi 1920x1080 atau 2560x1440
        - Use WebP format with optimal file size (max 200KB)
        - Consider using 1920x1080 or 2560x1440 resolution
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Pekerja Indonesia dengan perlengkapan keselamatan"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" aria-hidden="true" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl text-white">
          {/* Judul utama hero - Main hero title */}
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight" 
            data-testid="text-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Perlengkapan Keselamatan Kerja Terlengkap
          </motion.h2>
          {/* Deskripsi hero - Hero description */}
          <motion.p 
            className="text-lg md:text-xl mb-8 text-white/90" 
            data-testid="text-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Produk berkualitas tinggi dengan harga terjangkau. Dipercaya oleh 500+ perusahaan di Indonesia.
          </motion.p>
          {/* Tombol aksi utama - Primary call to action button */}
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
              aria-label="Mulai berbelanja produk keselamatan kerja"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              Belanja Sekarang
            </Button>
          </motion.div>

          {/* Fitur unggulan - Featured benefits */}
          <motion.ul 
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            role="list"
            aria-label="Keunggulan toko kami"
          >
            {[
              { icon: Shield, title: "Produk Berstandar", desc: "Sertifikat SNI & ISO" },
              { icon: Truck, title: "Gratis Ongkir", desc: "Minimal pembelian 500rb" },
              { icon: ShoppingBag, title: "Harga Grosir", desc: "Untuk pembelian banyak" }
            ].map((item, index) => (
              <motion.li 
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
                  aria-hidden="true"
                >
                  <item.icon className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
