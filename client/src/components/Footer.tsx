import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Mitra Safety</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Penyedia perlengkapan keselamatan kerja terpercaya di Indonesia sejak 2015.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Jl. Industri Raya No. 123, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@mitrasafety.co.id</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Kategori Produk</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Helm Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sarung Tangan</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Rompi Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sepatu Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kacamata Pelindung</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Masker & Respirator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Informasi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cara Pemesanan</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kebijakan Pengiriman</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kebijakan Pengembalian</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Lacak Pesanan</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Konsultasi Produk</a></li>
            </ul>
            <div className="mt-6">
              <h5 className="mb-3 text-sm font-semibold text-foreground">Metode Pembayaran</h5>
              <p className="text-xs text-muted-foreground">
                Transfer Bank, E-wallet (GoPay, OVO, Dana), COD
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Mitra Safety Indonesia. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
