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
      aria-labelledby="hero-title"
    >
      {/* 
        Gunakan elemen <img> untuk gambar hero demi aksesibilitas yang lebih baik.
        Ini memastikan pembaca layar dapat mengidentifikasi dan mengumumkan alt text gambar.
        Gunakan loading="eager" karena ini adalah gambar Largest Contentful Paint (LCP).
        
        Use an <img> element for the hero image for better accessibility.
        This ensures screen readers can identify and announce the image's alt text.
        Use loading="eager" as this is likely the Largest Contentful Paint (LCP) image.
      */}
      <img
        src={heroImage}
        alt="Seorang pekerja konstruksi Indonesia mengenakan helm keselamatan dan rompi visibilitas tinggi, berdiri dengan latar belakang lokasi konstruksi."
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        width={1920}
        height={1080}
      />

      {/* Overlay gradien untuk memastikan keterbacaan teks - Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" aria-hidden="true" />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl text-white">
          {/*
            Gunakan <h1> untuk judul utama halaman untuk struktur semantik yang benar.
            Use <h1> for the main page title for correct semantic structure.
          */}
          <motion.h1
            id="hero-title"
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight" 
            data-testid="text-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Perlengkapan Keselamatan Kerja Terlengkap untuk Anda
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 text-white/90" 
            data-testid="text-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Produk berkualitas tinggi dengan harga terjangkau. Telah dipercaya oleh lebih dari 500 perusahaan di seluruh Indonesia.
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
              { icon: Shield, title: "Produk Berstandar", desc: "Bersertifikat SNI & ISO" },
              { icon: Truck, title: "Gratis Ongkir", desc: "Untuk pembelian di atas Rp500.000" },
              { icon: ShoppingBag, title: "Harga Grosir", desc: "Tersedia untuk pembelian dalam jumlah besar" }
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
