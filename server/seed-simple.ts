import { db } from "./db";
import { categories, products } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await db.delete(products);
    await db.delete(categories);

    // Insert categories
    console.log("📂 Inserting categories...");
    const sampleCategories = [
      { id: "helmet", name: "Helm Safety", icon: "🪖", productCount: 0 },
      { id: "gloves", name: "Sarung Tangan", icon: "🧤", productCount: 0 },
      { id: "vest", name: "Rompi Safety", icon: "🦺", productCount: 0 },
      { id: "boots", name: "Sepatu Safety", icon: "👢", productCount: 0 },
      { id: "goggles", name: "Kacamata Pelindung", icon: "🥽", productCount: 0 },
      { id: "mask", name: "Masker & Respirator", icon: "😷", productCount: 0 },
    ];
    
    await db.insert(categories).values(sampleCategories);

    // Insert products
    console.log("📦 Inserting products...");
    const sampleProducts = [
      {
        name: "Helm Safety Proyek MSA V-Gard dengan Ventilasi",
        description: "Helm safety premium dengan teknologi ventilasi terbaik untuk kenyamanan maksimal.",
        price: 125000,
        originalPrice: 175000,
        category: "helmet",
        imageUrl: "/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png",
        images: JSON.stringify(["/assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png"]),
        inStock: true,
        badge: "Best Seller",
        specifications: JSON.stringify([
          { label: "Material", value: "ABS High Impact" },
          { label: "Berat", value: "350 gram" },
          { label: "Sertifikasi", value: "SNI, ISO 9001" }
        ]),
      },
      {
        name: "Sarung Tangan Safety Premium Anti-Slip",
        description: "Sarung tangan dengan grip anti-slip untuk pekerjaan presisi.",
        price: 45000,
        category: "gloves",
        imageUrl: "/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png",
        images: JSON.stringify(["/assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png"]),
        inStock: true,
        specifications: JSON.stringify([
          { label: "Material", value: "Kulit Sintetis" },
          { label: "Ukuran", value: "L, XL" }
        ]),
      },
      {
        name: "Rompi Safety High-Visibility dengan Reflektif",
        description: "Rompi safety dengan strip reflektif untuk visibilitas maksimal.",
        price: 65000,
        originalPrice: 85000,
        category: "vest",
        imageUrl: "/assets/generated_images/Safety_vest_product_photo_f0077f14.png",
        images: JSON.stringify(["/assets/generated_images/Safety_vest_product_photo_f0077f14.png"]),
        inStock: true,
        specifications: JSON.stringify([
          { label: "Material", value: "Polyester" },
          { label: "Warna", value: "Orange, Kuning" }
        ]),
      },
      {
        name: "Sepatu Safety Boot Steel Toe Cap",
        description: "Sepatu safety dengan pelindung baja pada ujung kaki.",
        price: 350000,
        category: "boots",
        imageUrl: "/assets/generated_images/Safety_boots_product_photo_a89a15d4.png",
        images: JSON.stringify(["/assets/generated_images/Safety_boots_product_photo_a89a15d4.png"]),
        inStock: true,
        specifications: JSON.stringify([
          { label: "Material", value: "Kulit Asli" },
          { label: "Sol", value: "Anti-slip Rubber" }
        ]),
      },
      {
        name: "Kacamata Safety Anti-Fog UV Protection",
        description: "Kacamata pelindung dengan teknologi anti-fog dan perlindungan UV.",
        price: 55000,
        originalPrice: 75000,
        category: "goggles",
        imageUrl: "/assets/generated_images/Safety_goggles_product_photo_3808d9b3.png",
        images: JSON.stringify(["/assets/generated_images/Safety_goggles_product_photo_3808d9b3.png"]),
        inStock: true,
        badge: "Promo",
        specifications: JSON.stringify([
          { label: "Lensa", value: "Polycarbonate" },
          { label: "Fitur", value: "Anti-Fog, UV400" }
        ]),
      },
      {
        name: "Masker N95 Respirator 3M",
        description: "Masker N95 untuk perlindungan pernapasan dari partikel berbahaya.",
        price: 25000,
        category: "mask",
        imageUrl: "/assets/generated_images/Safety_mask_product_photo_5ed8c680.png",
        images: JSON.stringify(["/assets/generated_images/Safety_mask_product_photo_5ed8c680.png"]),
        inStock: false,
        specifications: JSON.stringify([
          { label: "Tingkat Filtrasi", value: "95%" },
          { label: "Standar", value: "N95, NIOSH" }
        ]),
      }
    ];

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