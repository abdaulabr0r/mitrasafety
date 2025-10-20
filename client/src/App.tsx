/**
 * DOKUMENTASI NAVIGASI KEYBOARD - KEYBOARD NAVIGATION DOCUMENTATION
 * 
 * Aplikasi Safety Store mendukung navigasi keyboard lengkap untuk aksesibilitas.
 * Safety Store application supports full keyboard navigation for accessibility.
 * 
 * PINTASAN KEYBOARD GLOBAL - GLOBAL KEYBOARD SHORTCUTS:
 * --------------------------------------------------------
 * Tab             : Berpindah ke elemen interaktif berikutnya / Move to next interactive element
 * Shift + Tab     : Berpindah ke elemen interaktif sebelumnya / Move to previous interactive element
 * Enter atau Space: Mengaktifkan tombol atau link / Activate button or link
 * Escape (Esc)    : Menutup modal, dialog, atau sheet yang terbuka / Close open modal, dialog, or sheet
 * / atau s        : Fokus ke input pencarian / Focus search input
 * 
 * NAVIGASI DALAM MODAL PRODUK - PRODUCT MODAL NAVIGATION:
 * --------------------------------------------------------
 * Panah Kiri (←)  : Gambar produk sebelumnya (jika ada multiple gambar) / Previous product image (if multiple images)
 * Panah Kanan (→) : Gambar produk berikutnya (jika ada multiple gambar) / Next product image (if multiple images)
 * Tab             : Berpindah antar kontrol (tombol +/-, jumlah, tambah ke keranjang) / Move between controls
 * Escape (Esc)    : Menutup modal detail produk / Close product detail modal
 * 
 * FITUR AKSESIBILITAS - ACCESSIBILITY FEATURES:
 * --------------------------------------------------------
 * - Indikator fokus terlihat 2px pada semua elemen interaktif (WCAG 2.4.7)
 *   Visible 2px focus indicator on all interactive elements (WCAG 2.4.7)
 * 
 * - Focus trap pada modal dan sheet (fokus terjebak di dalam modal saat terbuka)
 *   Focus trap in modals and sheets (focus stays within modal when open)
 * 
 * - Skip link ke konten utama (tekan Tab dari awal halaman)
 *   Skip link to main content (press Tab from page start)
 * 
 * - ARIA labels dan roles pada semua komponen interaktif
 *   ARIA labels and roles on all interactive components
 * 
 * - Urutan tab logis mengikuti alur visual
 *   Logical tab order following visual flow
 */
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import TestComponents from "@/components/TestComponents";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/test" component={TestComponents} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Link navigasi cepat untuk aksesibilitas keyboard - Skip navigation links for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Langsung ke konten utama"
        >
          Langsung ke Konten Utama
        </a>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
