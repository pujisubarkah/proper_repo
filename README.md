# LAN Knowledge Repository

> *"Discover Knowledge, Advance Public Service"*

Prototipe portal frontend repositori pengetahuan institusional untuk **Lembaga Administrasi Negara (LAN)** menggunakan **Nuxt 3**, **Vue 3**, **TypeScript**, dan **Tailwind CSS**.

## Fitur Utama

- **Tanpa Backend / Database / Supabase**: Seluruh data menggunakan sumber data dummy TypeScript lokal yang terpusat (`data/repository.ts`) dengan relasi yang konsisten antara publikasi, koleksi, dan penulis.
- **Pencarian Multi-Field**: Mendukung pencarian berdasarkan *All Fields*, *Title*, *Author*, dan *Keyword*.
- **Filter, Urutan, dan Paginasi Frontend**: Filter berdasarkan tahun terbit dan jenis publikasi, pengurutan (*Terbaru*, *Terlama*, *Judul A–Z*, *Judul Z–A*), serta paginasi dinamis di sisi klien.
- **8 Halaman Lengkap**:
  - `/` — Homepage (Hero search, statistik contoh, Featured Collections, Featured Research, Latest Publications)
  - `/publications` — Katalog publikasi dengan pencarian, filter, urutan, dan paginasi
  - `/publications/[slug]` — Detail publikasi ilmiah, metadata Dublin Core contoh, sitasi, dan unduhan PDF lokal
  - `/collections` — Direktori koleksi tematik
  - `/collections/[slug]` — Detail koleksi dan daftar publikasi terkait
  - `/authors` — Direktori penulis dengan pencarian nama
  - `/authors/[slug]` — Profil penulis dan daftar karya terkait
  - `/about` — Tujuan repositori, cakupan jenis karya, dan informasi kontak placeholder

## Menjalankan Secara Lokal

```bash
# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Build untuk produksi / Vercel
npm run build
```
