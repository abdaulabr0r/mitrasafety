import { storage } from "./storage";

const categories = [
  { id: "helmet", name: "Helm Safety", icon: "🪖", productCount: 0 },
  { id: "gloves", name: "Sarung Tangan", icon: "🧤", productCount: 0 },
  { id: "vest", name: "Rompi Safety", icon: "🦺", productCount: 0 },
  { id: "boots", name: "Sepatu Safety", icon: "👢", productCount: 0 },
  { id: "goggles", name: "Kacamata Pelindung", icon: "🥽", productCount: 0 },
  { id: "mask", name: "Masker & Respirator", icon: "😷", productCount: 0 },
];

const products = [
  {
    name: "Helm Safety Proyek MSA V-Gard dengan Ventilasi",
    price: 125000,
    originalPrice: 175000,
    description: "Helm safety premium dengan teknologi ventilasi terbaik untuk kenyamanan maksimal. Dilengkapi dengan suspensi 4-titik yang dapat disesuaikan dan tali dagu yang kuat. Memenuhi standar SNI dan ISO untuk perlindungan kepala di berbagai lingkungan kerja.",
    imageUrl: "/attached_assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
    images: [
      "/attached_assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
      "/attached_assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
      "/attached_assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
    ],
    category: "helmet",
    badge: "Best Seller",
    inStock: true,
    specifications: [
      { label: "Material", value: "ABS High Impact" },
      { label: "Berat", value: "350 gram" },
      { label: "Sertifikasi", value: "SNI, ISO 9001" },
      { label: "Warna", value: "Merah, Kuning, Putih" },
    ],
  },
  {
    name: "Sarung Tangan Safety Premium Anti-Slip",
    price: 45000,
    description: "Sarung tangan dengan grip anti-slip untuk pekerjaan presisi dan perlindungan tangan maksimal. Material kulit sintetis premium yang tahan lama dan nyaman digunakan sepanjang hari.",
    imageUrl: "/attached_assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
    images: [
      "/attached_assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
      "/attached_assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
    ],
    category: "gloves",
    inStock: true,
    specifications: [
      { label: "Material", value: "Kulit Sintetis" },
      { label: "Ukuran", value: "L, XL" },
    ],
  },
  {
    name: "Rompi Safety High-Visibility dengan Reflektif",
    price: 65000,
    originalPrice: 85000,
    description: "Rompi safety dengan strip reflektif untuk visibilitas maksimal di area kerja. Cocok untuk pekerja konstruksi, jalan raya, dan area berisiko tinggi.",
    imageUrl: "/attached_assets/generated_images/Safety_vest_product_photo_f0077f14.png",
    images: [
      "/attached_assets/generated_images/Safety_vest_product_photo_f0077f14.png",
      "/attached_assets/generated_images/Safety_vest_product_photo_f0077f14.png",
    ],
    category: "vest",
    inStock: true,
    specifications: [
      { label: "Material", value: "Polyester" },
      { label: "Warna", value: "Orange, Kuning" },
    ],
  },
  {
    name: "Sepatu Safety Boot Steel Toe Cap",
    price: 350000,
    description: "Sepatu safety dengan pelindung baja pada ujung kaki untuk perlindungan maksimal. Dilengkapi dengan sol anti-slip dan material kulit asli yang tahan lama.",
    imageUrl: "/attached_assets/generated_images/Safety_boots_product_photo_a89a15d4.png",
    images: [
      "/attached_assets/generated_images/Safety_boots_product_photo_a89a15d4.png",
      "/attached_assets/generated_images/Safety_boots_product_photo_a89a15d4.png",
    ],
    category: "boots",
    inStock: true,
    specifications: [
      { label: "Material", value: "Kulit Asli" },
      { label: "Sol", value: "Anti-slip Rubber" },
      { label: "Ukuran", value: "39-45" },
    ],
  },
  {
    name: "Kacamata Safety Anti-Fog UV Protection",
    price: 55000,
    originalPrice: 75000,
    description: "Kacamata pelindung dengan teknologi anti-fog dan perlindungan UV. Cocok untuk berbagai jenis pekerjaan yang memerlukan perlindungan mata.",
    imageUrl: "/attached_assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
    images: [
      "/attached_assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
      "/attached_assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
    ],
    category: "goggles",
    badge: "Promo",
    inStock: true,
    specifications: [
      { label: "Lensa", value: "Polycarbonate" },
      { label: "Fitur", value: "Anti-Fog, UV400" },
    ],
  },
  {
    name: "Masker N95 Respirator 3M",
    price: 25000,
    description: "Masker N95 untuk perlindungan pernapasan dari partikel berbahaya. Tingkat filtrasi 95% sesuai standar NIOSH.",
    imageUrl: "/attached_assets/generated_images/Safety_mask_product_photo_5ed8c680.png",
    images: ["/attached_assets/generated_images/Safety_mask_product_photo_5ed8c680.png"],
    category: "mask",
    inStock: false,
    specifications: [
      { label: "Tingkat Filtrasi", value: "95%" },
      { label: "Standar", value: "N95, NIOSH" },
    ],
  },
  {
    name: "Helm Safety Standar SNI Kuning",
    price: 85000,
    description: "Helm safety standar dengan sertifikasi SNI untuk berbagai jenis pekerjaan. Material HDPE yang kuat dan tahan benturan.",
    imageUrl: "/attached_assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png",
    images: [
      "/attached_assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png",
      "/attached_assets/generated_images/Yellow_hard_hat_product_photo_a25e423f.png",
    ],
    category: "helmet",
    inStock: true,
    specifications: [
      { label: "Material", value: "HDPE" },
      { label: "Sertifikasi", value: "SNI" },
    ],
  },
  {
    name: "Sarung Tangan Kulit Safety Premium",
    price: 75000,
    originalPrice: 95000,
    description: "Sarung tangan kulit premium untuk pekerjaan berat dengan perlindungan maksimal. Material kulit asli yang kuat dan tahan lama.",
    imageUrl: "/attached_assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
    images: [
      "/attached_assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
      "/attached_assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
    ],
    category: "gloves",
    inStock: true,
    specifications: [
      { label: "Material", value: "Kulit Asli" },
      { label: "Ukuran", value: "M, L, XL" },
    ],
  },
];

async function seed() {
  console.log("Seeding database...");

  console.log("Creating categories...");
  for (const category of categories) {
    try {
      await storage.createCategory(category);
      console.log(`Created category: ${category.name}`);
    } catch (error) {
      console.log(`Category ${category.name} already exists or error occurred`);
    }
  }

  console.log("Creating products...");
  for (const product of products) {
    try {
      await storage.createProduct(product);
      console.log(`Created product: ${product.name}`);
    } catch (error) {
      console.log(`Product ${product.name} already exists or error occurred`);
    }
  }

  console.log("Updating category product counts...");
  const categoryCount: { [key: string]: number } = {};
  for (const product of products) {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
  }

  for (const [categoryId, count] of Object.entries(categoryCount)) {
    await storage.updateCategoryProductCount(categoryId, count);
    console.log(`Updated ${categoryId} count to ${count}`);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
