import ProductDetailModal from '../ProductDetailModal';
import { useState } from 'react';
import helmetImage from "@assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png";

export default function ProductDetailModalExample() {
  const [open, setOpen] = useState(true);

  const mockProduct = {
    id: "1",
    name: "Helm Safety Proyek MSA V-Gard dengan Ventilasi",
    price: 125000,
    originalPrice: 175000,
    description: "Helm safety premium dengan teknologi ventilasi terbaik untuk kenyamanan maksimal. Dilengkapi dengan suspensi 4-titik yang dapat disesuaikan dan tali dagu yang kuat. Memenuhi standar SNI dan ISO untuk perlindungan kepala di berbagai lingkungan kerja.",
    imageUrl: helmetImage,
    images: [helmetImage, helmetImage, helmetImage, helmetImage],
    category: "helmet",
    badge: "Best Seller",
    inStock: true,
    specifications: [
      { label: "Material", value: "ABS High Impact" },
      { label: "Berat", value: "350 gram" },
      { label: "Sertifikasi", value: "SNI, ISO 9001" },
      { label: "Warna", value: "Merah, Kuning, Putih" },
    ],
  };

  return (
    <ProductDetailModal
      open={open}
      onOpenChange={setOpen}
      product={mockProduct}
      onAddToCart={(id, qty) => console.log('Add to cart:', id, qty)}
    />
  );
}
