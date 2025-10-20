# Panduan Optimasi Gambar - Image Optimization Guide
## Safety Store (Mitra Safety)

---

## 📋 Daftar Isi - Table of Contents

1. [Ringkasan](#ringkasan)
2. [Optimasi yang Telah Diterapkan](#optimasi-yang-telah-diterapkan)
3. [Panduan untuk Gambar Baru](#panduan-untuk-gambar-baru)
4. [Format Gambar yang Direkomendasikan](#format-gambar-yang-direkomendasikan)
5. [Implementasi Teknis](#implementasi-teknis)
6. [Tools dan Konversi](#tools-dan-konversi)
7. [Checklist Optimasi](#checklist-optimasi)
8. [Best Practices](#best-practices)

---

## 🚀 Panduan Cepat untuk Developer (Quick Start Guide)

Berikut adalah langkah-langkah utama yang harus diikuti setiap kali menambahkan gambar baru ke dalam proyek.

1.  **Siapkan Gambar Sumber**:
    *   **Resolusi**: Minimal `800x800px` untuk produk, `1920x1080px` untuk hero.
    *   **Aspek Rasio**: `1:1` (persegi) untuk produk, `16:9` untuk hero.
    *   **Format**: Gunakan `PNG` atau `JPEG` berkualitas tinggi sebagai sumber.

2.  **Konversi ke WebP**:
    *   Gunakan [Squoosh.app](https://squoosh.app/) untuk mengonversi gambar ke format `WebP`.
    *   **Setting Kualitas**: `85` untuk gambar produk, `80` untuk gambar hero.
    *   Tujuannya adalah ukuran file di bawah `100KB` untuk produk dan `200KB` untuk hero.

3.  **Simpan Kedua File**:
    *   Simpan kedua versi gambar (`.webp` dan `.png` asli sebagai fallback) di folder `attached_assets/generated_images/`.
    *   Gunakan nama file yang deskriptif, contoh: `helm-safety-kuning-depan.webp`.

4.  **Implementasikan dengan `<picture>`**:
    *   Gunakan elemen `<picture>` di dalam kode React Anda untuk memastikan browser modern memuat WebP, sementara browser lama memuat PNG.
    *   Lihat [contoh implementasi teknis](#implementasi-teknis) di bawah untuk kode yang bisa di-copy-paste.

5.  **Tambahkan Atribut Penting**:
    *   `alt`: Tulis deskripsi yang jelas dalam Bahasa Indonesia.
    *   `width` & `height`: Sesuaikan dengan ukuran gambar untuk mencegah CLS.
    *   `loading="lazy"`: Gunakan untuk semua gambar di bawah "the fold" (semua gambar produk di grid).

---

## 🎯 Ringkasan

Optimasi gambar adalah aspek krusial untuk performa web, terutama untuk pengguna di Indonesia yang sering mengakses dengan koneksi mobile. Panduan ini menjelaskan strategi optimasi gambar yang telah diterapkan dan cara mengoptimalkan gambar baru.

**Manfaat Optimasi Gambar:**
- ⚡ **Waktu Muat Cepat**: Halaman bisa 30-50% lebih cepat.
- 💾 **Hemat Kuota**: Ukuran file gambar bisa 50% lebih kecil.
- 📱 **Pengalaman Mobile Unggul**: Sangat penting untuk pengguna di Indonesia.
- 🎨 **Layout Stabil**: Mencegah Cumulative Layout Shift (CLS) untuk skor Web Vitals yang baik.
- ♿ **Aksesibilitas Terjamin**: Alt text yang deskriptif membantu pengguna dengan pembaca layar.

---

## ✅ Optimasi yang Telah Diterapkan

### 1. **Lazy Loading**
Semua gambar produk menggunakan `loading="lazy"` untuk memuat gambar hanya saat diperlukan.

**Lokasi implementasi:**
- ✓ `ProductCard.tsx` - Gambar produk di grid
- ✓ `ProductDetailModal.tsx` - Thumbnail galeri
- ✓ `CartSheet.tsx` - Gambar produk di keranjang

**Pengecualian (tidak lazy load):**
- Gambar utama di ProductDetailModal (langsung terlihat saat modal dibuka)
- Hero background image (above the fold)

### 2. **Width & Height Attributes**
Semua gambar memiliki atribut `width` dan `height` untuk mencegah Cumulative Layout Shift (CLS).

**Ukuran standar:**
- Gambar produk card: `400x400px`
- Gambar modal utama: `600x600px`
- Thumbnail galeri: `150x150px`
- Gambar keranjang: `80x80px`

### 3. **Descriptive Alt Text**
Semua gambar memiliki alt text yang deskriptif dalam Bahasa Indonesia untuk aksesibilitas.

**Format alt text:**
```
{Nama Produk} - {Kategori} - {Status Stok} - {Informasi Tambahan}
```

Contoh:
```tsx
alt="Helm Safety Merah - Helm Safety - Tersedia - Gambar produk utama"
```

### 4. **Aspect Ratio Preservation**
Menggunakan CSS `aspect-square` dan `aspect-ratio` untuk menjaga proporsi gambar.

---

## 🆕 Panduan untuk Gambar Baru

### Langkah-langkah Menambahkan Gambar Produk Baru

#### 1. **Persiapan Gambar**

**Spesifikasi gambar produk:**
- Resolusi minimum: 800x800px
- Resolusi optimal: 1200x1200px
- Rasio aspek: 1:1 (square)
- Format sumber: PNG atau JPEG berkualitas tinggi

**Spesifikasi gambar hero:**
- Resolusi minimum: 1920x1080px
- Resolusi optimal: 2560x1440px
- Rasio aspek: 16:9
- Ukuran file maksimal: 200KB

#### 2. **Konversi ke WebP**

WebP menghasilkan file 30-50% lebih kecil dibanding PNG dengan kualitas visual yang sama.

**Online Tools (Gratis):**
- [Squoosh.app](https://squoosh.app/) - Recommended, by Google
- [CloudConvert](https://cloudconvert.com/png-to-webp)
- [TinyPNG](https://tinypng.com/) - Juga support WebP

**Command Line (untuk batch processing):**

```bash
# Install cwebp (Linux/Mac)
sudo apt-get install webp  # Ubuntu/Debian
brew install webp          # MacOS

# Konversi single file
cwebp -q 85 input.png -o output.webp

# Batch convert semua PNG di folder
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

**Kualitas yang Direkomendasikan:**
- Gambar produk: q=85 (balance antara kualitas dan ukuran)
- Hero images: q=80 (karena ukuran lebih besar)
- Thumbnail: q=75 (ukuran kecil, kualitas cukup)

#### 3. **Struktur File**

Simpan gambar dengan struktur berikut:

```
attached_assets/
├── generated_images/
│   ├── product-name.png          # Fallback
│   ├── product-name.webp         # WebP version
│   ├── hero-image.png            # Fallback
│   └── hero-image.webp           # WebP version
```

#### 4. **Implementasi di Komponen**

**Opsi A: Picture Element dengan WebP Fallback (Recommended)**

Gunakan elemen `<picture>` untuk dukungan WebP dengan fallback PNG:

```tsx
import productWebP from "@assets/generated_images/product-name.webp";
import productPNG from "@assets/generated_images/product-name.png";

// Di dalam komponen:
<picture>
  <source 
    srcSet={productWebP} 
    type="image/webp" 
  />
  <img
    src={productPNG}
    alt="Deskripsi produk yang lengkap"
    loading="lazy"
    width={400}
    height={400}
    className="h-full w-full object-cover"
  />
</picture>
```

**Opsi B: Simple Image (Jika hanya ada satu format)**

```tsx
import productImage from "@assets/generated_images/product-name.webp";

<img
  src={productImage}
  alt="Deskripsi produk yang lengkap"
  loading="lazy"
  width={400}
  height={400}
  className="h-full w-full object-cover"
/>
```

**Contoh Copy-Paste Siap Pakai untuk Komponen Produk**

Berikut adalah contoh lengkap yang bisa langsung diadaptasi ke dalam komponen `ProductCard.tsx` atau sejenisnya.

1.  **Impor Gambar**:
    *   Pastikan kedua file (`.webp` dan `.png`) ada di folder `attached_assets/generated_images/`.

    ```tsx
    // Di bagian atas file komponen Anda
    import helmSafetyWebP from "@assets/generated_images/helm-safety-kuning.webp";
    import helmSafetyPng from "@assets/generated_images/helm-safety-kuning.png";
    ```

2.  **Gunakan di dalam JSX**:
    *   Gantilah elemen `<img>` yang ada dengan blok `<picture>` ini.

    ```tsx
    // Di dalam return statement dari komponen Anda, gantikan <img> yang ada

    <div className="aspect-square overflow-hidden bg-muted">
      <picture>
        {/*
          Browser akan mencoba memuat sumber pertama (WebP). Jika tidak didukung,
          ia akan beralih ke sumber berikutnya. 'type="image/webp"' sangat penting.
          The browser will try to load the first source (WebP). If not supported,
          it will fall back to the next. 'type="image/webp"' is crucial.
        */}
        <source srcSet={helmSafetyWebP} type="image/webp" />

        {/*
          Elemen <img> ini adalah fallback utama dan juga tempat atribut penting
          seperti alt, width, height, dan loading diletakkan.
          This <img> element is the ultimate fallback and also where key attributes
          like alt, width, height, and loading are placed.
        */}
        <motion.img
          src={helmSafetyPng}
          alt="Helm safety berwarna kuning cerah, tampak dari depan, siap melindungi kepala di lokasi kerja."
          className="h-full w-full object-cover"
          loading="lazy"
          width={400}
          height={400}
          data-testid="img-product"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </picture>
    </div>
    ```

#### 5. **Responsive Images dengan srcset**

Untuk gambar yang tampil dalam berbagai ukuran:

```tsx
<img
  src={productImage}
  srcSet={`
    ${productImage400} 400w,
    ${productImage800} 800w,
    ${productImage1200} 1200w
  `}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Deskripsi produk"
  loading="lazy"
  width={400}
  height={400}
/>
```

**Penjelasan:**
- `srcSet`: Daftar gambar dengan berbagai ukuran
- `sizes`: Memberitahu browser ukuran gambar di berbagai breakpoint
- `400w, 800w, 1200w`: Width descriptor untuk setiap gambar

---

## 📊 Format Gambar yang Direkomendasikan

### Perbandingan Format

| Format | Ukuran File | Kualitas | Browser Support | Rekomendasi |
|--------|-------------|----------|-----------------|-------------|
| **WebP** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 96% (modern) | **Primary format** |
| **PNG** | ⭐⭐ | ⭐⭐⭐⭐⭐ | 100% | **Fallback** |
| **JPEG** | ⭐⭐⭐ | ⭐⭐⭐⭐ | 100% | Untuk foto |
| **AVIF** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 80% (baru) | Future consideration |

### Kapan Menggunakan Format Apa

**WebP:**
- ✅ Semua gambar produk baru
- ✅ Hero images
- ✅ Promotional banners
- ✅ Category images

**PNG (sebagai fallback):**
- ✅ Fallback untuk WebP
- ✅ Logo dengan transparansi
- ✅ Icons dan badges

**JPEG:**
- ✅ Foto berkualitas tinggi tanpa transparansi
- ⚠️ Tidak untuk logo atau graphics dengan teks

---

## 💻 Implementasi Teknis

### Komponen dengan Gambar

#### 1. **ProductCard.tsx**

```tsx
// Sudah dioptimasi dengan:
// - loading="lazy"
// - width={400} height={400}
// - Alt text deskriptif

<motion.img
  src={imageUrl}
  alt={productAltText}
  className="h-full w-full object-cover"
  loading="lazy"
  width={400}
  height={400}
  data-testid="img-product"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
/>
```

#### 2. **ProductDetailModal.tsx**

```tsx
// Gambar utama - tidak lazy (langsung terlihat)
<img
  src={images[selectedImage]}
  alt={mainImageAlt}
  className="h-full w-full object-cover"
  width={600}
  height={600}
  data-testid="img-product-main"
/>

// Thumbnail - dengan lazy loading
<img
  src={image}
  alt={`${product.name} - Tampilan ${index + 1}`}
  className="h-full w-full object-cover"
  loading="lazy"
  width={150}
  height={150}
/>
```

#### 3. **CartSheet.tsx**

```tsx
// Gambar kecil di keranjang
<img
  src={item.imageUrl}
  alt={`${item.name} - ${formatPrice(item.price)}`}
  className="h-20 w-20 rounded-md object-cover"
  loading="lazy"
  width={80}
  height={80}
  data-testid="img-cart-item"
/>
```

#### 4. **Hero.tsx**

```tsx
// Background image via CSS
// Vite automatically optimizes imported images
import heroImage from "@assets/generated_images/hero.webp";

<div 
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${heroImage})` }}
  role="img"
  aria-label="Deskripsi hero image"
>
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
</div>
```

---

## 🛠️ Tools dan Konversi

### Online Tools (Gratis)

1. **Squoosh.app** ⭐ Recommended
   - By Google Chrome team
   - Comparison view
   - Multiple format support
   - Manual quality control
   - URL: https://squoosh.app/

2. **TinyPNG/TinyJPG**
   - Batch processing
   - API available
   - Also supports WebP
   - URL: https://tinypng.com/

3. **CloudConvert**
   - Batch conversion
   - Many formats
   - URL: https://cloudconvert.com/

### Command Line Tools

**cwebp (Official WebP encoder):**
```bash
# Install
sudo apt-get install webp

# Usage
cwebp -q 85 input.png -o output.webp

# Batch convert
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

**ImageMagick:**
```bash
# Install
sudo apt-get install imagemagick

# Convert to WebP
convert input.png -quality 85 output.webp

# Resize and convert
convert input.png -resize 800x800 -quality 85 output.webp
```

### Node.js Packages

**sharp** (Recommended for automation):
```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

// Convert to WebP
await sharp('input.png')
  .webp({ quality: 85 })
  .toFile('output.webp');

// Resize and convert
await sharp('input.png')
  .resize(800, 800)
  .webp({ quality: 85 })
  .toFile('output.webp');

// Batch processing
const files = ['image1.png', 'image2.png'];
for (const file of files) {
  await sharp(file)
    .webp({ quality: 85 })
    .toFile(file.replace('.png', '.webp'));
}
```

---

## ✅ Checklist Optimasi

Gunakan checklist ini saat menambahkan gambar baru:

### Checklist Gambar Produk

- [ ] Gambar memiliki resolusi minimal 800x800px
- [ ] Gambar memiliki rasio aspek 1:1 (square)
- [ ] Gambar dikonversi ke format WebP
- [ ] Gambar PNG disimpan sebagai fallback
- [ ] Ukuran file WebP < 100KB
- [ ] Gambar disimpan di `attached_assets/generated_images/`
- [ ] Alt text deskriptif dalam Bahasa Indonesia
- [ ] Menggunakan `loading="lazy"`
- [ ] Memiliki atribut `width` dan `height`
- [ ] Tested di berbagai ukuran layar

### Checklist Gambar Hero

- [ ] Resolusi minimal 1920x1080px
- [ ] Rasio aspek 16:9
- [ ] Dikonversi ke WebP
- [ ] Ukuran file < 200KB
- [ ] Memiliki fallback PNG
- [ ] Gradient overlay untuk readability
- [ ] Alt text deskriptif
- [ ] Tested di mobile dan desktop

### Checklist Implementasi Kode

- [ ] Import gambar dengan benar
- [ ] Gunakan elemen `<picture>` jika ada WebP + fallback
- [ ] Alt text yang meaningful
- [ ] Width dan height attributes
- [ ] Lazy loading (kecuali above the fold)
- [ ] Tested di browser modern (Chrome, Firefox, Safari)
- [ ] Tested di mobile device
- [ ] Tidak ada layout shift (CLS)

---

## 🎯 Best Practices

### 1. **Prioritas Loading**

**Eager loading (tidak lazy):**
- Hero image (above the fold)
- Logo website
- Gambar pertama di ProductDetailModal

**Lazy loading:**
- Gambar produk di grid/list
- Thumbnail galeri
- Gambar di keranjang
- Gambar di bawah fold

### 2. **Ukuran File Target**

| Tipe Gambar | Target Ukuran | Maksimal |
|-------------|---------------|----------|
| Product thumbnail | 30-50KB | 80KB |
| Product detail | 50-80KB | 150KB |
| Hero image | 100-150KB | 200KB |
| Cart thumbnail | 10-20KB | 30KB |

### 3. **Quality Settings**

**WebP Quality:**
- Product images: `q=85`
- Hero images: `q=80`
- Thumbnails: `q=75`

**PNG Compression:**
- Gunakan tools seperti TinyPNG
- Target: 70-80% compression
- Maintain visual quality

### 4. **Naming Convention**

```
product-category-name-variant.webp
product-category-name-variant.png

Contoh:
helmet-safety-red-main.webp
helmet-safety-red-main.png
helmet-safety-red-side.webp
boots-safety-black-main.webp
```

### 5. **Alt Text Guidelines**

**Format lengkap:**
```
{Nama Produk} - {Kategori} - {Variant/View} - {Status} - {Harga}
```

**Contoh bagus:**
```tsx
alt="Helm Safety Merah - Helm Proyek - Tampilan depan - Stok tersedia - Rp 150.000"
```

**Contoh kurang baik:**
```tsx
alt="helmet" // Terlalu singkat
alt="red helmet image" // Tidak deskriptif
alt="" // Kosong (hindari)
```

### 6. **Responsive Breakpoints**

Jika menggunakan responsive images:

```tsx
sizes="
  (max-width: 640px) 100vw,    // Mobile: full width
  (max-width: 1024px) 50vw,    // Tablet: 2 columns
  33vw                          // Desktop: 3 columns
"
```

### 7. **Caching Strategy**

Gambar statis akan di-cache oleh browser:
- Vite menambahkan hash ke filename
- Browser cache hingga 1 tahun
- Update gambar = filename baru

---

## 📈 Monitoring dan Testing

### Tools untuk Test Performa

1. **Lighthouse (Chrome DevTools)**
   - Open DevTools → Lighthouse tab
   - Run Performance audit
   - Check image optimization score

2. **WebPageTest**
   - URL: https://webpagetest.org/
   - Test dari berbagai lokasi
   - Detail waterfall chart

3. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Mobile + Desktop score
   - Specific recommendations

### Metrics yang Dimonitor

- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FID (First Input Delay)**: < 100ms
- **Total Image Size**: < 500KB per page

### Manual Testing Checklist

- [ ] Test di Chrome (Desktop)
- [ ] Test di Chrome (Mobile)
- [ ] Test di Firefox
- [ ] Test di Safari (iOS)
- [ ] Test dengan slow 3G connection
- [ ] Test dengan disabled JavaScript
- [ ] Verify lazy loading works
- [ ] Verify no layout shift

---

## 🔄 Migration Plan (Gambar Existing)

### Fase 1: Konversi Gambar Utama (Priority High)

1. Hero image
2. Top 10 produk terlaris
3. Category images

### Fase 2: Konversi Bulk Products

1. Batch convert semua PNG ke WebP
2. Update database references
3. Deploy dengan fallback
4. Monitor performance

### Fase 3: Cleanup

1. Verify semua gambar sudah WebP
2. Keep PNG sebagai fallback
3. Remove unused images

---

## 📚 Resources dan Referensi

### Dokumentasi Official

- [WebP Google Developers](https://developers.google.com/speed/webp)
- [MDN Image Optimization](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web.dev Image Performance](https://web.dev/fast/#optimize-your-images)

### Tools

- [Squoosh.app](https://squoosh.app/) - Image optimizer
- [TinyPNG](https://tinypng.com/) - PNG/WebP optimizer
- [Sharp](https://sharp.pixelplumbing.com/) - Node.js image processing

### Browser Support

- [Can I Use WebP](https://caniuse.com/webp) - 96.73% global support
- [Can I Use AVIF](https://caniuse.com/avif) - 80.48% global support

---

## 📝 Changelog

**2025-10-20:**
- ✅ Implemented lazy loading pada semua product images
- ✅ Added width/height attributes untuk mencegah CLS
- ✅ Optimized ProductCard.tsx images
- ✅ Optimized ProductDetailModal.tsx images  
- ✅ Optimized CartSheet.tsx images
- ✅ Added comprehensive alt text dalam Bahasa Indonesia
- ✅ Documented image optimization strategy
- ✅ Created IMAGE_OPTIMIZATION.md guide

---

## 💡 FAQ

**Q: Apakah semua browser support WebP?**
A: 96% browser modern support WebP. Sisanya akan fallback ke PNG.

**Q: Apakah harus konversi semua gambar existing ke WebP?**
A: Tidak wajib, tapi direkomendasikan untuk performa optimal. Prioritaskan gambar yang sering diakses.

**Q: Berapa kualitas WebP yang ideal?**
A: Untuk produk gambar: q=85. Untuk hero: q=80. Untuk thumbnail: q=75.

**Q: Apakah lazy loading affect SEO?**
A: Tidak. Google bot dapat meng-crawl lazy loaded images dengan baik.

**Q: Bagaimana cara test lazy loading bekerja?**
A: Buka Chrome DevTools → Network tab → Throttling → Slow 3G → Scroll dan lihat images loading.

**Q: Ukuran ideal gambar produk?**
A: Resolusi: 800x800px minimum, 1200x1200px optimal. Ukuran file: < 100KB.

---

## 🤝 Kontributor

Dokumentasi ini dibuat untuk Safety Store (Mitra Safety) e-commerce platform.

**Maintainer:** Development Team  
**Last Updated:** October 20, 2025  
**Version:** 1.0.0

---

**Catatan:** Panduan ini akan terus diperbarui seiring perkembangan best practices dan teknologi web.
