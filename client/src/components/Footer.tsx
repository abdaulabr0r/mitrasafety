import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto" role="contentinfo">
      {/* Footer navigasi dan informasi - Footer navigation and information */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Informasi perusahaan - Company information */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-bold text-foreground">Mitra Safety</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Penyedia perlengkapan keselamatan kerja terpercaya di Indonesia sejak 2015.
            </p>
            {/* Alamat kontak - Contact address */}
            <address className="space-y-2 text-sm not-italic">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Jl. Industri Raya No. 123, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+622112345678" className="hover:text-foreground transition-colors" aria-label="Telepon +62 21 1234 5678">
                  +62 21 1234 5678
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@mitrasafety.co.id" className="hover:text-foreground transition-colors" aria-label="Email info@mitrasafety.co.id">
                  info@mitrasafety.co.id
                </a>
              </div>
            </address>
          </div>

          {/* Navigasi kategori produk - Product category navigation */}
          <nav aria-label="Kategori produk">
            <h4 className="mb-4 font-semibold text-foreground">Kategori Produk</h4>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li><a href="#" className="hover:text-foreground transition-colors">Helm Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sarung Tangan</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Rompi Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sepatu Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kacamata Pelindung</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Masker & Respirator</a></li>
            </ul>
          </nav>

          {/* Navigasi informasi perusahaan - Company information navigation */}
          <nav aria-label="Informasi perusahaan">
            <h4 className="mb-4 font-semibold text-foreground">Informasi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li><a href="#" className="hover:text-foreground transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cara Pemesanan</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kebijakan Pengiriman</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kebijakan Pengembalian</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </nav>

          {/* Navigasi layanan pelanggan - Customer service navigation */}
          <nav aria-label="Layanan pelanggan">
            <h4 className="mb-4 font-semibold text-foreground">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
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
          </nav>
        </div>

        {/* Hak cipta - Copyright */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Mitra Safety Indonesia. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
