# Cetrofarm - Website Company Profile

Situs web profil perusahaan resmi **PT. Cetro Tama Indonesia (Cetrofarm)**. Dibangun menggunakan **TanStack Start**, **Vite**, **Nitro**, dan **Tailwind CSS**.

---

### 🚀 Cara Menjalankan Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan server pengembangan lokal (port 3000)
npm run dev

# Jalankan build static
npm run build

# Jalankan verifikasi build (cek broken links, sitemap, & og:image)
npm run verify
```

---

### 📁 Panduan Deploy ke Hosting Rumahweb (cPanel)

#### 1. Struktur Folder Hasil Build
Setelah menjalankan `npm run build`, hasil ekspor statis akan berada di dalam folder:
```
.output/public/
```

#### 2. Cara Mengunggah ke cPanel Rumahweb
1. Login ke **cPanel Rumahweb** Anda.
2. Buka **File Manager** dan masuk ke folder **`public_html`**.
3. Jika situs WordPress lama berada di folder **`public_html/home/`** atau subdomain **`shop.cetrofarm.com`** berada di folder terpisah, **JANGAN MENGHAPUS** folder tersebut.
4. Unggah seluruh **isi** folder `.output/public/` (termasuk `.htaccess`, `submit-form.php`, `sitemap.xml`, dan folder `assets`) langsung ke dalam `public_html`.

#### 3. Pengujian Redirect 301 Migrasi WordPress
File `.htaccess` yang terikut di folder root akan secara otomatis melakukan **301 Permanent Redirect** dari URL lama WordPress:
- `cetrofarm.com/home/about/` ➔ `cetrofarm.com/tentang`
- `cetrofarm.com/home/article/` ➔ `cetrofarm.com/artikel`
- `cetrofarm.com/home/testimonials/` ➔ `cetrofarm.com/testimoni`
- `cetrofarm.com/home/contact-us/` ➔ `cetrofarm.com/kontak`
- `cetrofarm.com/home/privacy-policy/` ➔ `cetrofarm.com/kebijakan-privasi`
- Artikel lama ➔ Artikel baru yang paling relevan

---

### 📋 Lingkungan Variabel (Environment Variables)

Atur variabel berikut pada pengaturan Vercel / cPanel jika diperlukan:
- `VITE_SITE_URL` = `https://cetrofarm.com` (URL resmi produksi)
- `VITE_FORM_ENDPOINT` = `/submit-form.php` (atau URL Formspree jika memakai service eksternal)
- `VITE_SHOW_UNVERIFIED_CLAIMS` = `false` (Sembunyikan sertifikasi/mitra yang belum terverifikasi)
