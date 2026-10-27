<template>
  <footer class="bg-lan-950 text-slate-300 border-t border-lan-900 mt-auto">
    <div class="container-repository py-12 lg:py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        <!-- Brand & Tagline -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-lan-900 border border-lan-800 flex items-center justify-center">
              <svg
                class="w-5 h-5 text-gold-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-white font-bold text-base tracking-tight">
                LAN KNOWLEDGE REPOSITORY
              </h2>
              <p class="text-xs text-gold-300 font-medium">
                Discover Knowledge, Advance Public Service
              </p>
            </div>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed max-w-md">
            Prototipe antarmuka repositori institusional untuk menghimpun, melestarikan, dan menyebarluaskan karya ilmiah di bidang administrasi negara, kebijakan publik, serta pengembangan kompetensi ASN.
          </p>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-lan-900/90 border border-lan-800 text-xs text-slate-300">
            <svg
              class="w-4 h-4 text-gold-400 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <span>Seluruh dokumen dan profil pada aplikasi ini merupakan data contoh (dummy data).</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="lg:col-span-3 space-y-3">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-white">
            Navigasi Portal
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-slate-400 hover:text-white transition-colors">
                Beranda (Home)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/collections" class="text-slate-400 hover:text-white transition-colors">
                Koleksi Tematik (Collections)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/publications" class="text-slate-400 hover:text-white transition-colors">
                Daftar Publikasi (Publications)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/authors" class="text-slate-400 hover:text-white transition-colors">
                Direktori Penulis (Authors)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-slate-400 hover:text-white transition-colors">
                Tentang Repositori (About)
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Featured Collections Quick Links -->
        <div class="lg:col-span-4 space-y-3">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-white">
            Koleksi Utama
          </h3>
          <ul class="space-y-2 text-sm">
            <li v-for="col in featuredCollections" :key="col.slug">
              <NuxtLink
                :to="`/collections/${col.slug}`"
                class="text-slate-400 hover:text-white transition-colors line-clamp-1"
              >
                {{ col.name }}
              </NuxtLink>
            </li>
          </ul>
          <div class="pt-2 text-xs text-slate-400 border-t border-lan-900">
            <p class="font-medium text-slate-300">Kontak Pengelola (Placeholder):</p>
            <p>Jl. Veteran No. 10, Jakarta Pusat (Alamat Contoh / Placeholder UI)</p>
            <p>Email: repositori-contoh@simulasi-lan.go.id (Placeholder)</p>
          </div>
        </div>
      </div>

      <!-- Bottom Copyright -->
      <div class="mt-10 pt-6 border-t border-lan-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>
          &copy; {{ new Date().getFullYear() }} LAN Knowledge Repository (Prototipe UI). Dibangun untuk simulasi antarmuka repositori ilmiah.
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/about" class="hover:text-white transition-colors">
            Kebijakan Akses Contoh
          </NuxtLink>
          <span>&bull;</span>
          <NuxtLink to="/publications" class="hover:text-white transition-colors">
            Katalog Dokumen
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { COLLECTIONS } from '~/data/repository'

const featuredCollections = COLLECTIONS.slice(0, 4)
</script>
