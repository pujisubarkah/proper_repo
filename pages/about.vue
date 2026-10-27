<template>
  <div class="pb-16">
    <!-- Page Header -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-6 sm:py-8">
        <Breadcrumbs :items="[{ label: 'About' }]" />

        <div class="mt-2 max-w-3xl">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200 mb-2">
            Profil Portal Repositori
          </span>
          <h1 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Tentang LAN Knowledge Repository
          </h1>
          <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            "Discover Knowledge, Advance Public Service" — Prototipe portal repositori institusional untuk pengelolaan dan diseminasi pengetahuan administrasi negara.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container-repository pt-8 space-y-10">
      <!-- Purpose & Vision Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <h2 class="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Tujuan Pembangunan Repositori
          </h2>
          <p class="text-sm sm:text-base text-slate-700 leading-relaxed">
            <strong>LAN Knowledge Repository</strong> dirancang sebagai prototipe gerbang pengetahuan digital terpusat bagi Lembaga Administrasi Negara (LAN). Portal ini bertujuan menghimpun, melestarikan, dan memperluas jangkauan pemanfaatan aset intelektual di bidang administrasi publik, reformasi birokrasi, serta pengembangan kapasitas Aparatur Sipil Negara (ASN).
          </p>
          <p class="text-sm sm:text-base text-slate-700 leading-relaxed">
            Melalui struktur navigasi koleksi yang terorganisasi dan pencarian berbasis metadata, portal ini memudahkan pembuat kebijakan, peneliti, widyaiswara, mahasiswa, serta masyarakat luas dalam menemukan rujukan ilmiah untuk mendukung pengambilan keputusan berbasis bukti (<em>evidence-based policy</em>).
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 class="text-sm font-bold text-lan-900 mb-1">Preservasi Digital</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Menjaga keberlanjutan arsip kajian, laporan riset, dan naskah kebijakan dengan pengenal metadata terstandar.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 class="text-sm font-bold text-lan-900 mb-1">Diseminasi Terbuka</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Mempercepat pertukaran gagasan dan praktik baik pelayanan publik antar-instansi pusat maupun pemerintah daerah.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 class="text-sm font-bold text-lan-900 mb-1">Rujukan Perubahan &amp; Kebijakan</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Menyediakan rujukan laporan proyek perubahan dan sintesis kajian yang relevan dengan tantangan tata kelola pemerintahan modern.
              </p>
            </div>
          </div>
        </div>

        <!-- Prototype Disclaimer Notice Card -->
        <div class="lg:col-span-4 bg-amber-50/80 rounded-xl border border-amber-200 p-6 shadow-sm space-y-3">
          <div class="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <svg
              class="w-5 h-5 text-amber-700 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <span>Catatan Penting Prototipe</span>
          </div>
          <p class="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            Aplikasi ini merupakan <strong>prototipe antarmuka (UI/UX frontend template)</strong>. Seluruh data publikasi, abstrak, nama penulis, afiliasi, angka statistik, dan dokumen PDF contoh yang ditampilkan merupakan <strong>data simulasi lokal (dummy data)</strong> dan bukan merupakan publikasi resmi Lembaga Administrasi Negara (LAN).
          </p>
        </div>
      </div>

      <!-- Types of Works Collected -->
      <div class="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-lan-700">
            Cakupan Repositori
          </span>
          <h2 class="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Jenis Karya Ilmiah yang Dihimpun
          </h2>
          <p class="text-sm text-slate-600 mt-1">
            Repositori ini mengklasifikasikan dokumen pengetahuan ke dalam enam kategori utama:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="work in collectedWorkTypes"
            :key="work.title"
            class="p-5 rounded-xl border border-slate-200 hover:border-lan-300 transition-colors bg-slate-50/50 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <h3 class="text-base font-bold text-slate-900">
                  {{ work.title }}
                </h3>
                <span class="px-2 py-0.5 rounded text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-100">
                  {{ work.badge }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {{ work.description }}
              </p>
            </div>
            <NuxtLink
              :to="{ path: '/publications', query: { type: work.title } }"
              class="inline-flex items-center gap-1 text-xs font-semibold text-lan-800 hover:text-lan-600"
            >
              <span>Telusuri {{ work.title }}</span>
              <svg
                class="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Contact Information (Explicitly Marked as Placeholder) -->
      <div class="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100">
          <div>
            <h2 class="font-serif text-xl font-bold text-slate-900">
              Informasi Kontak Pengelola (Placeholder)
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
              Rincian kontak di bawah ini adalah penanda tempat (placeholder) untuk simulasi tata letak halaman informasi institusi.
            </p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 self-start sm:self-auto">
            Data Kontak Placeholder
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Unit Pengelola (Placeholder)
            </p>
            <p class="font-semibold text-slate-900">
              Sekretariat Pengelola LAN Knowledge Repository (Simulasi UI)
            </p>
            <p class="text-xs text-slate-600">
              Gedung Contoh Blok A Lantai 3, Jl. Veteran No. 10, Gambir, Jakarta Pusat 10110 (Placeholder Alamat)
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Surat Elektronik &amp; Telepon (Placeholder)
            </p>
            <p class="font-semibold text-slate-900">
              repositori-contoh@simulasi-lan.go.id
            </p>
            <p class="text-xs text-slate-600">
              Telepon: (021) 0000-XXXX ext. 101 (Nomor Placeholder Prototipe)
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Jam Layanan Kurasi (Placeholder)
            </p>
            <p class="font-semibold text-slate-900">
              Senin – Jumat: 08.00 – 16.00 WIB
            </p>
            <p class="text-xs text-slate-600">
              Layanan bantuan deposit karya ilmiah &amp; verifikasi metadata (Simulasi)
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DocumentType } from '~/types/repository'

useHead({
  title: 'About — LAN Knowledge Repository'
})

const collectedWorkTypes: Array<{
  title: DocumentType
  badge: string
  description: string
}> = [
  {
    title: 'Proyek Perubahan',
    badge: 'Kepemimpinan & Inovasi',
    description:
      'Laporan Proyek Perubahan (Proper) dan Aksi Perubahan hasil Pelatihan Kepemimpinan Nasional (PKN), Administrator, dan Pengawas yang menghadirkan terobosan nyata di instansi pemerintah.'
  },
  {
    title: 'Artikel Jurnal',
    badge: 'Peer-Reviewed',
    description:
      'Naskah hasil penelitian empiris dan kajian konseptual yang diterbitkan pada berkala ilmiah bidang administrasi negara dan manajemen publik.'
  },
  {
    title: 'Laporan Kajian',
    badge: 'Riset Institusional',
    description:
      'Laporan komprehensif hasil kajian strategis, evaluasi program nasional/daerah, dan pemetaan tata kelola pemerintahan.'
  },
  {
    title: 'Kertas Kerja',
    badge: 'Working Paper',
    description:
      'Naskah akademik tahap awal atau pemikiran metodologis untuk memantik diskusi ilmiah sebelum publikasi formal.'
  },
  {
    title: 'Modul Pelatihan',
    badge: 'Bahan Ajar ASN',
    description:
      'Modul pembelajaran terstruktur, buku panduan, dan studi kasus untuk program pelatihan kepemimpinan serta pengembangan kompetensi ASN.'
  },
  {
    title: 'Prosiding Seminar',
    badge: 'Konferensi Ilmiah',
    description:
      'Kumpulan makalah yang dipresentasikan pada simposium, forum kebijakan nasional, dan lokakarya inovasi pelayanan publik.'
  }
]
</script>
