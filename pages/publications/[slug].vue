<template>
  <div class="pb-16">
    <!-- Top Bar with Breadcrumbs & Back Button -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs
            :items="[
              { label: 'Publications', to: '/publications' },
              { label: publication ? publication.title : isLoadingDetail ? 'Memuat Proyek Perubahan...' : 'Dokumen Tidak Ditemukan' }
            ]"
          />
          <NuxtLink
            to="/publications"
            class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-lan-800 hover:text-lan-600 shrink-0"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span>Kembali ke Daftar Publikasi</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Loading State when Fetching Live by ID -->
    <div v-if="isLoadingDetail && !publication" class="container-repository pt-12">
      <div class="bg-white rounded-xl border border-slate-200 p-10 text-center shadow-sm">
        <p class="text-sm font-semibold text-lan-800">
          Mengambil detail Proyek Perubahan dari API ProperExpo LAN...
        </p>
      </div>
    </div>

    <!-- Main Detail Content -->
    <div v-else-if="publication" class="container-repository pt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left/Main Scholarly Content Column -->
        <article class="lg:col-span-8 space-y-6">
          <!-- Primary Header Card -->
          <div class="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <!-- Badges Row -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-lan-900 text-white">
                {{ publication.documentType }}
              </span>
              <span
                v-if="publication.metadata.angkatan"
                class="px-3 py-1 rounded-md text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200"
              >
                PKN Angkatan {{ publication.metadata.angkatan }}
              </span>
              <span class="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                Tahun {{ publication.year }}
              </span>
              <span
                v-if="publication.metadata.properId"
                class="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200"
              >
                ID ProperExpo #{{ publication.metadata.properId }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-5">
              {{ publication.title }}
            </h1>

            <!-- Author / Pemrakarsa Proyek Perubahan -->
            <div class="border-t border-b border-slate-100 py-4 mb-6">
              <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Pemrakarsa / Peserta Pelatihan Kepemimpinan
              </h2>
              <div class="grid grid-cols-1 gap-3">
                <NuxtLink
                  v-for="author in publication.authors"
                  :key="author.slug"
                  :to="`/authors/${author.slug}`"
                  class="flex items-start gap-3.5 p-3.5 rounded-lg border border-slate-200/80 hover:border-lan-400 hover:bg-lan-50/50 transition-colors group"
                >
                  <div class="w-11 h-11 rounded-full bg-lan-900 text-gold-300 font-bold text-sm flex items-center justify-center shrink-0">
                    {{ getInitials(author.name) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-base font-bold text-slate-900 group-hover:text-lan-700">
                      {{ author.name }}
                    </p>
                    <p class="text-xs sm:text-sm font-medium text-lan-800">
                      {{ publication.metadata.instansiName || author.affiliation }}
                    </p>
                    <p class="text-xs text-slate-500 mt-0.5">
                      {{ publication.metadata.diklatName }} &bull; Angkatan {{ publication.metadata.angkatan }} (NDH: {{ publication.metadata.ndh }})
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Abstract / Deskripsi Proyek Perubahan -->
            <section class="space-y-3 mb-6">
              <h2 class="text-sm font-bold uppercase tracking-wider text-lan-900 flex items-center gap-2">
                <span class="w-1.5 h-4 rounded-full bg-lan-700 inline-block"></span>
                <span>Deskripsi &amp; Ringkasan Proyek Perubahan</span>
              </h2>
              <div class="font-serif text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p
                  v-for="(paragraph, idx) in abstractParagraphs"
                  :key="idx"
                >
                  {{ paragraph }}
                </p>
              </div>
            </section>

            <!-- Landscape Poster Preview if Available -->
            <section
              v-if="publication.metadata.posterLandscapeUrl && !landscapeError"
              class="pt-5 border-t border-slate-100 space-y-3 mb-6"
            >
              <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500">
                Infografis / Poster Landscape Proyek Perubahan
              </h2>
              <div class="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  :src="publication.metadata.posterLandscapeUrl"
                  :alt="`Infografis ${publication.title}`"
                  class="w-full h-auto object-contain max-h-[460px]"
                  @error="landscapeError = true"
                />
              </div>
            </section>

            <!-- Keywords Section -->
            <section class="pt-5 border-t border-slate-100">
              <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Kata Kunci &amp; Klaster
              </h2>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="kw in publication.keywords"
                  :key="kw"
                  :to="{ path: '/publications', query: { q: kw, field: 'keyword' } }"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-lan-100 hover:text-lan-900 transition-colors"
                >
                  <span>{{ kw }}</span>
                </NuxtLink>
              </div>
            </section>
          </div>

          <!-- Detailed Metadata Table Card -->
          <div class="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h2 class="text-base font-bold text-slate-900">
                Metadata Proyek Perubahan (ProperExpo LAN)
              </h2>
              <span class="text-xs text-slate-500">
                Sumber: properexpo.lan.go.id
              </span>
            </div>

            <dl class="divide-y divide-slate-100 text-sm">
              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Judul Proyek Perubahan</dt>
                <dd class="sm:col-span-2 text-slate-900 font-medium">{{ publication.title }}</dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Pemrakarsa / Peserta</dt>
                <dd class="sm:col-span-2 text-slate-800">
                  {{ publication.authors.map((a) => a.name).join('; ') }}
                </dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Instansi Asal</dt>
                <dd class="sm:col-span-2 text-slate-800">
                  {{ publication.metadata.instansiName || 'Tidak Tersedia (Placeholder)' }}
                </dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Program Pelatihan (Diklat)</dt>
                <dd class="sm:col-span-2 text-slate-800">
                  {{ publication.metadata.diklatName || 'Pelatihan Kepemimpinan Nasional (PKN)' }}
                </dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Angkatan &amp; Tahun</dt>
                <dd class="sm:col-span-2 text-slate-800">
                  Angkatan {{ publication.metadata.angkatan || '-' }} &bull; Tahun {{ publication.year }} (NDH: {{ publication.metadata.ndh || '-' }})
                </dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Kategori / Koleksi</dt>
                <dd class="sm:col-span-2">
                  <NuxtLink
                    :to="`/collections/${publication.collection.slug}`"
                    class="font-semibold text-lan-700 hover:text-lan-900 underline"
                  >
                    {{ publication.collection.name }}
                  </NuxtLink>
                </dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Statistik Kunjungan &amp; Rating</dt>
                <dd class="sm:col-span-2 text-slate-800">
                  {{ publication.metadata.viewsCount || 0 }} kali dilihat
                  <span v-if="publication.metadata.rating">
                    &bull; Rating {{ publication.metadata.rating }} / 5.0
                  </span>
                </dd>
              </div>

              <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                <dt class="font-semibold text-slate-500">Tautan ProperExpo LAN</dt>
                <dd class="sm:col-span-2 font-mono text-xs text-lan-700 break-all">
                  <a
                    :href="publication.metadata.identifierUri"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                  >
                    {{ publication.metadata.identifierUri }}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </article>

        <!-- Right Sidebar: Poster Portrait, Video & PDF Download, Collection Context, Citation -->
        <aside class="lg:col-span-4 space-y-6">
          <!-- Poster Portrait Card -->
          <div
            v-if="publication.metadata.posterPortraitUrl && !portraitError"
            class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3"
          >
            <div class="flex items-center justify-between px-1">
              <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500">
                Poster Proyek Perubahan
              </h2>
              <a
                :href="publication.metadata.posterPortraitUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-semibold text-lan-700 hover:text-lan-900"
              >
                Ukuran Penuh &nearr;
              </a>
            </div>
            <div class="rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img
                :src="publication.metadata.posterPortraitUrl"
                :alt="`Poster ${publication.title}`"
                class="w-full h-auto object-cover"
                @error="portraitError = true"
              />
            </div>
          </div>

          <!-- Media, Video & PDF Download Card -->
          <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-bold uppercase tracking-wider text-slate-900">
                Akses Media &amp; Dokumen
              </h2>
              <span class="px-2 py-0.5 rounded text-xs font-semibold bg-lan-50 text-lan-800">
                ProperExpo
              </span>
            </div>

            <div class="space-y-2.5">
              <!-- YouTube Video Link if Available -->
              <a
                v-if="publication.metadata.youtubeUrl"
                :href="publication.metadata.youtubeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-lan-900 hover:bg-lan-800 text-white transition-colors shadow-sm"
              >
                <svg
                  class="w-5 h-5 text-gold-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
                <span>Tonton Video Proyek Perubahan</span>
              </a>

              <!-- Local Sample PDF Download -->
              <a
                v-if="publication.pdfUrl"
                :href="publication.pdfUrl"
                download="LAN-ProperExpo-Ringkasan.pdf"
                class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-lan-900 bg-lan-50 hover:bg-lan-100 border border-lan-200 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-lan-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span>Download PDF Contoh Lokal</span>
              </a>

              <!-- Original ProperExpo Page Link -->
              <a
                :href="publication.metadata.identifierUri"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <span>Buka di Portal ProperExpo LAN &nearr;</span>
              </a>
            </div>
          </div>

          <!-- Collection Information Card -->
          <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kategori Proyek Perubahan
            </h2>
            <h3 class="text-base font-bold text-slate-900">
              <NuxtLink
                :to="`/collections/${publication.collection.slug}`"
                class="hover:text-lan-700 transition-colors"
              >
                {{ publication.collection.name }}
              </NuxtLink>
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              {{ publication.collection.shortDescription }}
            </p>
            <div class="pt-2">
              <NuxtLink
                :to="`/collections/${publication.collection.slug}`"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-lan-800 hover:text-lan-600"
              >
                <span>Lihat Seluruh Proyek Perubahan di Kategori Ini</span>
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

          <!-- Suggested Citation Box -->
          <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500">
                Format Sitasi
              </h2>
              <button
                type="button"
                class="text-xs font-semibold text-lan-700 hover:text-lan-900"
                @click="copyCitation"
              >
                {{ copied ? 'Tersalin!' : 'Salin Sitasi' }}
              </button>
            </div>
            <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-serif">
              {{ formattedCitation }}
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Fallback if Slug Not Found -->
    <div v-else class="container-repository pt-12">
      <EmptyState
        title="Proyek Perubahan Tidak Ditemukan"
        description="Dokumen dengan alamat tautan atau ID tersebut tidak ditemukan."
        reset-label="Kembali ke Katalog Proyek Perubahan"
        @reset="router.push('/publications')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EnrichedPublication } from '~/types/repository'

const route = useRoute()
const router = useRouter()
const {
  enrichedPublications,
  findOrFetchPublicationBySlugOrId
} = useProperExpo()

const slug = computed(() => String(route.params.slug || ''))
const isLoadingDetail = ref(false)
const portraitError = ref(false)
const landscapeError = ref(false)
const fetchedExtra = ref<EnrichedPublication | undefined>(undefined)

const publication = computed(() => {
  const s = slug.value.trim()
  const foundInState = enrichedPublications.value.find(
    (p) =>
      p.slug === s ||
      String(p.metadata.properId) === s ||
      p.slug.startsWith(`${s}-`)
  )
  return foundInState || fetchedExtra.value
})

onMounted(async () => {
  if (!publication.value && slug.value) {
    isLoadingDetail.value = true
    fetchedExtra.value = await findOrFetchPublicationBySlugOrId(slug.value)
    isLoadingDetail.value = false
  }
})

watch(slug, async (newSlug) => {
  portraitError.value = false
  landscapeError.value = false
  if (!publication.value && newSlug) {
    isLoadingDetail.value = true
    fetchedExtra.value = await findOrFetchPublicationBySlugOrId(newSlug)
    isLoadingDetail.value = false
  }
})

const abstractParagraphs = computed(() => {
  if (!publication.value) return []
  return publication.value.abstract
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
})

useHead(() => ({
  title: publication.value
    ? `${publication.value.title} — LAN Knowledge Repository`
    : 'Detail Proyek Perubahan — LAN Knowledge Repository'
}))

const copied = ref(false)

const formattedCitation = computed(() => {
  if (!publication.value) return ''
  const authorsText = publication.value.authors.map((a) => a.name).join(', ')
  return `${authorsText} (${publication.value.year}). "${publication.value.title}." Laporan Proyek Perubahan ${publication.value.metadata.diklatName || 'PKN'} Angkatan ${publication.value.metadata.angkatan || '-'}, ${publication.value.metadata.instansiName || 'LAN'}. Diakses melalui ProperExpo LAN.`
})

async function copyCitation() {
  if (!formattedCitation.value || typeof navigator === 'undefined') return
  try {
    await navigator.clipboard.writeText(formattedCitation.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}

function getInitials(name: string): string {
  const cleaned = name
    .replace(/^(Prof\.|Dr\.|Drs\.|Ir\.|H\.|Hj\.)\s*/gi, '')
    .replace(/,.*$/, '')
    .trim()
  const parts = cleaned.split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
}
</script>
