<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-lan-950 text-white overflow-hidden border-b border-lan-900">
      <!-- Subtle Architectural Grid Background Pattern -->
      <div
        class="absolute inset-0 opacity-10 pointer-events-none"
        style="background-image: radial-gradient(#93badc 1px, transparent 1px); background-size: 28px 28px;"
        aria-hidden="true"
      ></div>
      <div
        class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lan-800/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      ></div>

      <div class="container-repository relative py-14 sm:py-20 lg:py-24">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lan-900/90 border border-lan-700/80 text-xs sm:text-sm text-gold-300 font-medium">
            <svg
              class="w-4 h-4 text-gold-400 shrink-0"
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span>Portal Repositori Proyek Perubahan — Lembaga Administrasi Negara (ProperExpo LAN)</span>
          </div>

          <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Discover Knowledge,
            <span class="text-gold-300">Advance Public Service</span>
          </h1>

          <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Telusuri ratusan Proyek Perubahan (Proper) peserta Pelatihan Kepemimpinan Nasional (PKN) dari seluruh kementerian, lembaga, dan pemerintah daerah di Indonesia.
          </p>

          <!-- Prominent Search Bar -->
          <div class="pt-3 max-w-3xl mx-auto">
            <SearchBar
              v-model="searchQuery"
              v-model:search-field="searchField"
              variant="hero"
              select-id="hero-search-field"
              placeholder="Cari judul proyek perubahan (misal: Spill The Messenger), nama peserta, atau instansi..."
              @submit="handleHeroSearch"
            />
          </div>

          <!-- Popular Quick Search Keywords -->
          <div class="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span class="text-slate-400 font-medium">Pencarian Cepat:</span>
            <button
              v-for="topic in popularTopics"
              :key="topic"
              type="button"
              class="px-3 py-1 rounded-full bg-lan-900/80 hover:bg-lan-800 text-slate-200 hover:text-white border border-lan-800 transition-colors"
              @click="searchByTopic(topic)"
            >
              {{ topic }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Repository Statistics Bar -->
    <section class="bg-white border-b border-slate-200 shadow-sm" aria-label="Statistik Repositori ProperExpo">
      <div class="container-repository py-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div class="flex items-center gap-2">
            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ringkasan Repositori Proyek Perubahan
            </h2>
          </div>
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-lan-800 bg-lan-50 border border-lan-200 px-2.5 py-0.5 rounded-md">
            <span
              class="w-2 h-2 rounded-full"
              :class="isLiveSynced ? 'bg-emerald-500' : 'bg-gold-500'"
            ></span>
            <span>
              {{
                isLiveSynced
                  ? `Tersinkronisasi dengan API ProperExpo LAN (${enrichedPublications.length} Proyek Perubahan)`
                  : 'Terhubung dengan Data ProperExpo LAN (properexpo.lan.go.id)'
              }}
            </span>
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="stat in dynamicStats"
            :key="stat.label"
            class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {{ stat.label }}
              </span>
              <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-lan-100 text-lan-800">
                {{ stat.isSampleNote }}
              </span>
            </div>
            <div class="text-2xl sm:text-3xl font-bold text-lan-950 tracking-tight">
              {{ stat.value }}
            </div>
            <p class="text-xs text-slate-500 mt-1">
              {{ stat.subtext }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Collections Section -->
    <section class="py-12 sm:py-16">
      <div class="container-repository">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-lan-700">
              Kategori Proyek Perubahan
            </span>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Featured Collections
            </h2>
            <p class="text-sm text-slate-600 mt-1 max-w-2xl">
              Klasifikasi Proyek Perubahan berdasarkan 5 klaster tujuan utama pembangunan nasional di ProperExpo LAN.
            </p>
          </div>
          <NuxtLink
            to="/collections"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-lan-800 hover:text-lan-600 shrink-0"
          >
            <span>Lihat Semua Kategori ({{ enrichedCollections.length }})</span>
            <svg
              class="w-4 h-4"
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CollectionCard
            v-for="col in featuredCollections"
            :key="col.id"
            :collection="col"
          />
        </div>
      </div>
    </section>

    <!-- Featured Research / Proyek Perubahan Unggulan -->
    <section class="py-12 sm:py-16 bg-lan-900/5 border-y border-slate-200">
      <div class="container-repository">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-gold-700">
              Sorotan Proyek Perubahan
            </span>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Featured Research &amp; Proyek Perubahan
            </h2>
            <p class="text-sm text-slate-600 mt-1 max-w-2xl">
              Pilihan Proyek Perubahan unggulan dari Pelatihan Kepemimpinan Nasional (PKN) Tingkat I berbagai angkatan.
            </p>
          </div>
          <NuxtLink
            to="/publications"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-lan-800 hover:text-lan-600 shrink-0"
          >
            <span>Eksplorasi Semua Proyek Perubahan</span>
            <svg
              class="w-4 h-4"
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

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PublicationCard
            v-for="pub in featuredResearch"
            :key="pub.id"
            :publication="pub"
          />
        </div>
      </div>
    </section>

    <!-- Latest Publications & Quick Directory Section -->
    <section class="py-12 sm:py-16">
      <div class="container-repository">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <!-- Latest Publications Column -->
          <div class="lg:col-span-8 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-lan-700">
                  Katalog Terkini
                </span>
                <h2 class="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                  Latest Publications
                </h2>
              </div>
              <NuxtLink
                to="/publications"
                class="inline-flex items-center gap-1 text-sm font-semibold text-lan-800 hover:text-lan-600"
              >
                <span>Semua Proyek Perubahan ({{ enrichedPublications.length }})</span>
                <svg
                  class="w-4 h-4"
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

            <PublicationList :publications="latestPublications" :show-reset="false" />
          </div>

          <!-- Sidebar: Browse by Kategori & Contributors -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Browse by Kategori ProperExpo -->
            <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Telusuri Berdasarkan Kategori
              </h3>
              <ul class="space-y-2">
                <li v-for="col in enrichedCollections" :key="col.slug">
                  <NuxtLink
                    :to="`/collections/${col.slug}`"
                    class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-lan-50 hover:text-lan-900 transition-colors group"
                  >
                    <span class="font-medium truncate pr-2">{{ col.name }}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 group-hover:bg-lan-100 group-hover:text-lan-900 shrink-0">
                      {{ col.publicationCount }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Featured Authors Preview -->
            <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Peserta &amp; Pemrakarsa
                </h3>
                <NuxtLink
                  to="/authors"
                  class="text-xs font-semibold text-lan-700 hover:text-lan-900"
                >
                  Lihat Semua ({{ enrichedAuthors.length }})
                </NuxtLink>
              </div>
              <ul class="space-y-3.5">
                <li
                  v-for="author in highlightedAuthors"
                  :key="author.id"
                  class="flex items-start justify-between gap-3"
                >
                  <div class="min-w-0">
                    <NuxtLink
                      :to="`/authors/${author.slug}`"
                      class="text-sm font-semibold text-slate-900 hover:text-lan-700 transition-colors block truncate"
                    >
                      {{ author.name }}
                    </NuxtLink>
                    <p class="text-xs text-slate-500 truncate">
                      {{ author.affiliation }}
                    </p>
                  </div>
                  <span class="shrink-0 px-2 py-0.5 rounded text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-100">
                    {{ author.publicationCount }} proper
                  </span>
                </li>
              </ul>
            </div>

            <!-- Institutional Info Card -->
            <div class="bg-lan-900 text-white rounded-xl p-6 shadow-sm space-y-3">
              <span class="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-lan-800 text-gold-300 border border-lan-700">
                ProperExpo LAN
              </span>
              <h3 class="font-serif text-lg font-bold">
                Tentang LAN Knowledge Repository
              </h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pelajari tujuan pembangunan repositori Proyek Perubahan Pelatihan Kepemimpinan Nasional (PKN) serta cakupan klaster inovasinya.
              </p>
              <div class="pt-1">
                <NuxtLink
                  to="/about"
                  class="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-gold-200"
                >
                  <span>Baca Selengkapnya</span>
                  <svg
                    class="w-4 h-4"
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { SearchField } from '~/types/repository'

const router = useRouter()
const {
  enrichedPublications,
  enrichedCollections,
  enrichedAuthors,
  isLiveSynced,
  syncAllFromProperExpoApi
} = useProperExpo()

onMounted(() => {
  syncAllFromProperExpoApi()
})

const searchQuery = ref('')
const searchField = ref<SearchField>('all')

const popularTopics = [
  'Spill The Messenger',
  'Digitalisasi Pemerintahan',
  'Pengentasan Kemiskinan',
  'Program Prioritas Presiden',
  'Peningkatan Investasi'
]

const dynamicStats = computed(() => [
  {
    label: 'Proyek Perubahan',
    value: `${enrichedPublications.value.length}`,
    subtext: isLiveSynced.value
      ? 'Seluruh data API ProperExpo LAN'
      : 'Data aktif ProperExpo LAN',
    isSampleNote: 'ProperExpo LAN'
  },
  {
    label: 'Kategori Tematik',
    value: `${enrichedCollections.value.length}`,
    subtext: 'Klaster prioritas pembangunan nasional',
    isSampleNote: 'ProperExpo LAN'
  },
  {
    label: 'Pemrakarsa / Peserta',
    value: `${enrichedAuthors.value.length}`,
    subtext: 'Peserta Pelatihan Kepemimpinan Nasional',
    isSampleNote: 'PKN Tingkat I'
  },
  {
    label: 'Angkatan PKN',
    value: '59 – 67',
    subtext: 'Tahun 2024 s.d. 2026',
    isSampleNote: 'Data Resmi API'
  }
])

const featuredCollections = computed(() =>
  enrichedCollections.value.filter((c) => c.featured).slice(0, 4)
)

const featuredResearch = computed(() => {
  const feat = enrichedPublications.value.filter((p) => p.featured)
  return (feat.length >= 4 ? feat : enrichedPublications.value).slice(0, 4)
})

const latestPublications = computed(() =>
  [...enrichedPublications.value]
    .sort((a, b) => b.year - a.year || (a.metadata.properId || 0) - (b.metadata.properId || 0))
    .slice(0, 4)
)

const highlightedAuthors = computed(() =>
  enrichedAuthors.value.slice(0, 5)
)

function handleHeroSearch(payload: { query: string; field: SearchField }) {
  const queryParams: Record<string, string> = {}
  if (payload.query) {
    queryParams.q = payload.query
  }
  if (payload.field && payload.field !== 'all') {
    queryParams.field = payload.field
  }
  router.push({
    path: '/publications',
    query: queryParams
  })
}

function searchByTopic(topic: string) {
  router.push({
    path: '/publications',
    query: {
      q: topic,
      field: 'all'
    }
  })
}
</script>
