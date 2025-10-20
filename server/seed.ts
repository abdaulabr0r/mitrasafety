import { db } from "./db";
import { categories, products } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { InsertCategory, InsertProduct } from "@shared/schema";

// Sample categories data
const sampleCategories: InsertCategory[] = [
  { id: "helmet", name: "Helm Safety", icon: "🪖", productCount: 0 },
  { id: "gloves", name: "Sarung Tangan", icon: "🧤", productCount: 0 },
  { id: "vest", name: "Rompi Safety", icon: "🦺", productCount: 0 },
  { id: "boots", name: "Sepatu Safety", icon: "👢", productCount: 0 },
  { id: "goggles", name: "Kacamata Pelindung", icon: "🥽", productCount: 0 },
  { id: "mask", name: "Masker & Respirator", icon: "😷", productCount: 0 },
];

// Sample products data
const sampleProducts: InsertProduct[] = [
  {
    name: "Helm Safety Proyek MSA V-Gard dengan Ventilasi",
    description: "Helm safety premium dengan teknologi ventilasi terbaik untuk kenyamanan maksimal. Dilengkapi dengan suspensi 4-titik yang dapat disesuaikan dan tali dagu yang kuat. Memenuhi standar SNI dan ISO untuk perlindungan kepala di berbagai lingkungan kerja.",
    price: 125000,
    originalPrice: 175000,
    category: "helmet",
    imageUrl: "/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
    images: JSON.stringify([
      "/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
      "/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
      "/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
      "/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png"
    ]),
    inStock: true,
    badge: "Best Seller",
    specifications: JSON.stringify([
      { label: "Material", value: "ABS High Impact" },
      { label: "Berat", value: "350 gram" },
      { label: "Sertifikasi", value: "SNI, ISO 9001" },
      { label: "Warna", value: "Merah, Kuning, Putih" },
    ]),
  },
  {
    name: "Sarung Tangan Safety Premium Anti-Slip",
    description: "Sarung tangan dengan grip anti-slip untuk pekerjaan presisi dan perlindungan tangan maksimal. Terbuat dari bahan berkualitas tinggi yang tahan lama dan nyaman digunakan.",
    price: 45000,
    category: "gloves",
    imageUrl: "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
    images: JSON.stringify([
      "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
      "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png"
    ]),
    inStock: true,
    specifications: JSON.stringify([
      { label: "Material", value: "Kulit Sintetis" },
      { label: "Ukuran", value: "L, XL" },
      { label: "Sertifikasi", value: "CE, EN388" },
    ]),
  },
  {
    name: "Rompi Safety High-Visibility dengan Reflektif",
    description: "Rompi safety dengan strip reflektif untuk visibilitas maksimal di area kerja. Desain ergonomis dan bahan yang breathable untuk kenyamanan sepanjang hari.",
    price: 65000,
    originalPrice: 85000,
    category: "vest",
    imageUrl: "/assets/generated_images/Safety_vest_product_photo_f0077f14.png",
    images: [
      "/assets/generated_images/Safety_vest_product_photo_f0077f14.png",
      "/assets/generated_images/Safety_vest_product_photo_f0077f14.png",
      "/assets/generated_images/Safety_vest_product_photo_f0077f14.png"
    ],
    inStock: true,
    specifications: [
      { label: "Material", value: "Polyester" },
      { label: "Warna", value: "Orange, Kuning" },
      { label: "Standar", value: "EN ISO 20471" },
    ],
  },
  {
    name: "Sepatu Safety Boot Steel Toe Cap",
    description: "Sepatu safety dengan pelindung baja pada ujung kaki untuk perlindungan maksimal. Sol anti-slip dan desain ergonomis untuk kenyamanan dan keamanan optimal.",
    price: 350000,
    category: "boots",
    imageUrl: "/assets/generated_images/Safety_boots_product_photo_a89a15d4.png",
    images: [
      "/assets/generated_images/Safety_boots_product_photo_a89a15d4.png",
      "/assets/generated_images/Safety_boots_product_photo_a89a15d4.png"
    ],
    inStock: true,
    specifications: [
      { label: "Material", value: "Kulit Asli" },
      { label: "Sol", value: "Anti-slip Rubber" },
      { label: "Ukuran", value: "39-45" },
      { label: "Sertifikasi", value: "SNI, EN ISO 20345" },
    ],
  },
  {
    name: "Kacamata Safety Anti-Fog UV Protection",
    description: "Kacamata pelindung dengan teknologi anti-fog dan perlindungan UV. Lensa polycarbonate yang tahan benturan dan frame yang nyaman untuk penggunaan jangka panjang.",
    price: 55000,
    originalPrice: 75000,
    category: "goggles",
    imageUrl: "/assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
    images: [
      "/assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
      "/assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
      "/assets/generated_images/Safety_goggles_product_photo_3808d9b3.png"
    ],
    inStock: true,
    badge: "Promo",
    specifications: [
      { label: "Lensa", value: "Polycarbonate" },
      { label: "Fitur", value: "Anti-Fog, UV400" },
      { label: "Sertifikasi", value: "ANSI Z87.1" },
    ],
  },
  {
    name: "Masker N95 Respirator 3M",
    description: "Masker N95 untuk perlindungan pernapasan dari partikel berbahaya. Tingkat filtrasi 95% dengan desain yang nyaman dan seal yang baik.",
    price: 25000,
    category: "mask",
    imageUrl: "/assets/generated_images/Safety_mask_product_photo_5ed8c680.png",
    images: ["/assets/generated_images/Safety_mask_product_photo_5ed8c680.png"],
    inStock: false,
    specifications: [
      { label: "Tingkat Filtrasi", value: "95%" },
      { label: "Standar", value: "N95, NIOSH" },
      { label: "Kemasan", value: "Box isi 20 pcs" },
    ],
  },
  {
    name: "Helm Safety Standar SNI Kuning",
    description: "Helm safety standar dengan sertifikasi SNI untuk berbagai jenis pekerjaan. Desain klasik dengan perlindungan yang handal dan harga terjangkau.",
    price: 85000,
    category: "helmet",
    imageUrl: "/assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png",
    images: [
      "/assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png",
      "/assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png"
    ],
    inStock: true,
    specifications: [
      { label: "Material", value: "HDPE" },
      { label: "Sertifikasi", value: "SNI" },
      { label: "Warna", value: "Kuning, Putih, Biru" },
    ],
  },
  {
    name: "Sarung Tangan Kulit Safety Premium",
    description: "Sarung tangan kulit premium untuk pekerjaan berat dengan perlindungan maksimal. Terbuat dari kulit asli berkualitas tinggi yang tahan lama.",
    price: 75000,
    originalPrice: 95000,
    category: "gloves",
    imageUrl: "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
    images: [
      "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
      "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
      "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png"
    ],
    inStock: true,
    specifications: [
      { label: "Material", value: "Kulit Asli" },
      { label: "Ukuran", value: "M, L, XL" },
      { label: "Fitur", value: "Reinforced Palm" },
    ],
  },
];

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await db.delete(products);
    await db.delete(categories);

    // Insert categories
    console.log("📂 Inserting categories...");
    await db.insert(categories).values(sampleCategories);

    // Insert products
    console.log("📦 Inserting products...");
    await db.insert(products).values(sampleProducts);

    // Update category product counts
    console.log("🔢 Updating category product counts...");
    for (const category of sampleCategories) {
      const productCount = sampleProducts.filter(p => p.category === category.id).length;
      await db.update(categories)
        .set({ productCount })
        .where(eq(categories.id, category.id));
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`📊 Inserted ${sampleCategories.length} categories and ${sampleProducts.length} products`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}