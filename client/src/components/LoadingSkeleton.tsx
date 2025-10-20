import { motion } from 'framer-motion';

// Komponen skeleton untuk kartu produk dengan label aksesibilitas
// Product card skeleton component with accessibility labels
export function ProductCardSkeleton() {
  return (
    <motion.div
      className="rounded-lg border bg-card overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      aria-label="Memuat produk..."
    >
      {/* Placeholder gambar produk - Product image placeholder */}
      <div className="aspect-square bg-muted animate-pulse" aria-hidden="true" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse" aria-hidden="true" />
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" aria-hidden="true" />
        <div className="h-6 bg-muted rounded w-1/2 animate-pulse" aria-hidden="true" />
        <div className="h-10 bg-muted rounded animate-pulse" aria-hidden="true" />
      </div>
      {/* Teks tersembunyi untuk screen reader - Hidden text for screen readers */}
      <span className="sr-only">Sedang memuat informasi produk</span>
    </motion.div>
  );
}

// Komponen skeleton untuk kartu kategori dengan label aksesibilitas
// Category card skeleton component with accessibility labels
export function CategoryCardSkeleton() {
  return (
    <motion.div
      className="rounded-lg border bg-card p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      aria-label="Memuat kategori..."
    >
      <div className="flex items-center gap-4">
        {/* Placeholder ikon kategori - Category icon placeholder */}
        <div className="h-16 w-16 bg-muted rounded-md animate-pulse" aria-hidden="true" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" aria-hidden="true" />
          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" aria-hidden="true" />
        </div>
        <div className="h-5 w-5 bg-muted rounded animate-pulse" aria-hidden="true" />
      </div>
      {/* Teks tersembunyi untuk screen reader - Hidden text for screen readers */}
      <span className="sr-only">Sedang memuat informasi kategori</span>
    </motion.div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}