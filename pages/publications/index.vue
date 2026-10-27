<template>
  <div class="pb-16">
    <!-- Page Header & Search Section -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-6 sm:py-8">
        <Breadcrumbs :items="[{ label: 'Publications' }]" />

        <div class="mt-2 max-w-3xl">
          <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Katalog Proyek Perubahan (ProperExpo LAN)
          </h1>
          <p class="text-sm sm:text-base text-slate-600 mt-1.5">
            Telusuri koleksi Proyek Perubahan peserta Pelatihan Kepemimpinan Nasional (PKN) berdasarkan judul, pemrakarsa, instansi, angkatan, maupun tahun.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="mt-6">
          <SearchBar
            v-model="searchQuery"
            v-model:search-field="searchField"
            variant="inline"
            select-id="publications-search-field"
            placeholder="Masukkan kata kunci judul proyek perubahan, nama peserta, atau instansi..."
            @submit="onSearchSubmit"
          />
        </div>
      </div>
    </section>

    <!-- Main Content: Filter Sidebar + Results List -->
    <section class="container-repository pt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Sidebar: FilterPanel + Angkatan Filter -->
        <div class="lg:col-span-4 xl:col-span-3 space-y-5">
          <FilterPanel
            v-model:selected-year="selectedYear"
            v-model:selected-type="selectedType"
            v-model:sort-by="sortBy"
            :available-years="availableYears"
            :available-types="availableTypes"
            :type-counts="typeCounts"
            :has-active-filters="hasActiveFilters"
            @reset="resetAllFilters"
          />

          <!-- Additional Filter: PKN Angkatan -->
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter Angkatan PKN
            </h3>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                class="col-span-3 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                :class="
                  selectedAngkatan === ''
                    ? 'bg-lan-900 text-white border-lan-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                "
                @click="selectedAngkatan = ''"
              >
                Semua Angkatan
              </button>
              <button
                v-for="ang in availableAngkatan"
                :key="ang"
                type="button"
                class="px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors text-center"
                :class="
                  selectedAngkatan === ang
                    ? 'bg-lan-900 text-white border-lan-900 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                "
                @click="selectedAngkatan = ang"
              >
                Angk. {{ ang }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Main Area: Active Filter Tags, Result Summary, PublicationList, Pagination -->
        <div class="lg:col-span-8 xl:col-span-9 space-y-5">
          <!-- Results Status Bar -->
          <div class="bg-white rounded-xl border border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div class="text-sm text-slate-600">
              Ditemukan
              <span class="font-bold text-slate-900">{{ filteredPublications.length }}</span>
              Proyek Perubahan
              <span v-if="searchQuery.trim()">
                untuk pencarian
                <span class="font-semibold text-lan-800">"{{ searchQuery.trim() }}"</span>
                <span class="text-xs text-slate-500">({{ fieldLabelMap[searchField] }})</span>
              </span>
            </div>

            <!-- Active Filter Pills -->
            <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2">
              <span
                v-if="selectedType"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200"
              >
                <span>Jenis: {{ selectedType }}</span>
                <button
                  type="button"
                  class="hover:text-lan-950"
                  aria-label="Hapus filter jenis publikasi"
                  @click="selectedType = ''"
                >
                  &times;
                </button>
              </span>

              <span
                v-if="selectedYear !== null"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200"
              >
                <span>Tahun: {{ selectedYear }}</span>
                <button
                  type="button"
                  class="hover:text-lan-950"
                  aria-label="Hapus filter tahun"
                  @click="selectedYear = null"
                >
                  &times;
                </button>
              </span>

              <span
                v-if="selectedAngkatan !== ''"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200"
              >
                <span>Angkatan: {{ selectedAngkatan }}</span>
                <button
                  type="button"
                  class="hover:text-lan-950"
                  aria-label="Hapus filter angkatan"
                  @click="selectedAngkatan = ''"
                >
                  &times;
                </button>
              </span>

              <button
                type="button"
                class="text-xs font-semibold text-slate-500 hover:text-lan-800 underline"
                @click="resetAllFilters"
              >
                Reset
              </button>
            </div>
          </div>

          <!-- Publication List -->
          <PublicationList
            :publications="paginatedPublications"
            empty-title="Proyek Perubahan Tidak Ditemukan"
            empty-description="Tidak ada Proyek Perubahan yang cocok dengan kriteria pencarian dan filter Anda. Silakan sesuaikan kata kunci atau reset filter."
            :show-reset="true"
            @reset="resetAllFilters"
          />

          <!-- Frontend Pagination -->
          <Pagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
            :total-items="filteredPublications.length"
            :per-page="itemsPerPage"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DocumentType, SearchField, SortOption } from '~/types/repository'

useHead({
  title: 'Publications — LAN Knowledge Repository'
})

const route = useRoute()
const router = useRouter()

const {
  enrichedPublications,
  availableYears,
  availableTypes,
  availableAngkatan,
  syncAllFromProperExpoApi
} = useProperExpo()

onMounted(() => {
  syncAllFromProperExpoApi()
})

const searchQuery = ref<string>(typeof route.query.q === 'string' ? route.query.q : '')
const searchField = ref<SearchField>(
  typeof route.query.field === 'string' &&
    ['all', 'title', 'author', 'keyword'].includes(route.query.field)
    ? (route.query.field as SearchField)
    : 'all'
)
const selectedType = ref<DocumentType | ''>(
  typeof route.query.type === 'string'
    ? (route.query.type as DocumentType)
    : ''
)
const selectedYear = ref<number | null>(
  typeof route.query.year === 'string' && !Number.isNaN(Number(route.query.year))
    ? Number(route.query.year)
    : null
)
const selectedAngkatan = ref<string>(
  typeof route.query.angkatan === 'string' ? route.query.angkatan : ''
)
const sortBy = ref<SortOption>('newest')
const currentPage = ref(1)
const itemsPerPage = 8

const fieldLabelMap: Record<SearchField, string> = {
  all: 'All Fields',
  title: 'Title',
  author: 'Author',
  keyword: 'Keyword'
}

watch(
  () => route.query,
  (q) => {
    if (typeof q.q === 'string') {
      searchQuery.value = q.q
    }
    if (
      typeof q.field === 'string' &&
      ['all', 'title', 'author', 'keyword'].includes(q.field)
    ) {
      searchField.value = q.field as SearchField
    }
    if (typeof q.type === 'string') {
      selectedType.value = q.type as DocumentType
    }
  }
)

const typeCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const t of availableTypes.value) {
    counts[t] = enrichedPublications.value.filter((p) => p.documentType === t).length
  }
  return counts
})

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value.trim() !== '' ||
    searchField.value !== 'all' ||
    selectedType.value !== '' ||
    selectedYear.value !== null ||
    selectedAngkatan.value !== '' ||
    sortBy.value !== 'newest'
  )
})

const filteredPublications = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  const filtered = enrichedPublications.value.filter((pub) => {
    if (selectedYear.value !== null && pub.year !== selectedYear.value) {
      return false
    }

    if (selectedType.value !== '' && pub.documentType !== selectedType.value) {
      return false
    }

    if (
      selectedAngkatan.value !== '' &&
      String(pub.metadata.angkatan) !== selectedAngkatan.value
    ) {
      return false
    }

    if (q) {
      const titleMatch = pub.title.toLowerCase().includes(q)
      const abstractMatch = pub.abstract.toLowerCase().includes(q)
      const authorMatch = pub.authors.some(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.affiliation.toLowerCase().includes(q)
      )
      const keywordMatch = pub.keywords.some((k) =>
        k.toLowerCase().includes(q)
      )
      const collectionMatch = pub.collection.name.toLowerCase().includes(q)

      if (searchField.value === 'title') {
        return titleMatch
      }
      if (searchField.value === 'author') {
        return authorMatch
      }
      if (searchField.value === 'keyword') {
        return keywordMatch || collectionMatch
      }
      return (
        titleMatch ||
        abstractMatch ||
        authorMatch ||
        keywordMatch ||
        collectionMatch
      )
    }

    return true
  })

  return [...filtered].sort((a, b) => {
    if (sortBy.value === 'newest') {
      return b.year - a.year || a.title.localeCompare(b.title, 'id')
    }
    if (sortBy.value === 'oldest') {
      return a.year - b.year || a.title.localeCompare(b.title, 'id')
    }
    if (sortBy.value === 'title-asc') {
      return a.title.localeCompare(b.title, 'id')
    }
    if (sortBy.value === 'title-desc') {
      return b.title.localeCompare(a.title, 'id')
    }
    return 0
  })
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredPublications.value.length / itemsPerPage))
)

const paginatedPublications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredPublications.value.slice(start, start + itemsPerPage)
})

watch(
  [searchQuery, searchField, selectedYear, selectedType, selectedAngkatan, sortBy],
  () => {
    currentPage.value = 1
  }
)

function onSearchSubmit() {
  currentPage.value = 1
}

function resetAllFilters() {
  searchQuery.value = ''
  searchField.value = 'all'
  selectedYear.value = null
  selectedType.value = ''
  selectedAngkatan.value = ''
  sortBy.value = 'newest'
  currentPage.value = 1
  if (Object.keys(route.query).length > 0) {
    router.replace({ path: '/publications', query: {} })
  }
}
</script>
