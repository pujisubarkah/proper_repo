<template>
  <div class="pb-16">
    <!-- Page Header & Author Search -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-6 sm:py-8">
        <Breadcrumbs :items="[{ label: 'Authors' }]" />

        <div class="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="max-w-3xl">
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Direktori Peserta &amp; Pemrakarsa Proyek Perubahan
            </h1>
            <p class="text-sm sm:text-base text-slate-600 mt-1.5">
              Daftar profil peserta Pelatihan Kepemimpinan Nasional (PKN) dari berbagai kementerian, lembaga, dan pemerintah daerah.
            </p>
          </div>

          <!-- Search Input by Author Name or Instansi -->
          <div class="w-full md:w-80">
            <label for="author-search" class="sr-only">Cari Nama atau Instansi</label>
            <div class="relative">
              <input
                id="author-search"
                v-model="searchQuery"
                type="text"
                placeholder="Cari nama peserta atau instansi..."
                class="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-lan-600 focus:outline-none focus:ring-2 focus:ring-lan-100"
              />
              <svg
                class="w-4 h-4 text-slate-400 absolute left-3 top-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <button
                v-if="searchQuery"
                type="button"
                class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                aria-label="Bersihkan pencarian"
                @click="searchQuery = ''"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Authors Grid -->
    <section class="container-repository pt-8 space-y-6">
      <div class="flex items-center justify-between text-xs sm:text-sm text-slate-600">
        <p>
          Menampilkan <span class="font-bold text-slate-900">{{ paginatedAuthors.length }}</span> dari <span class="font-bold text-slate-900">{{ filteredAuthors.length }}</span> pemrakarsa Proyek Perubahan
        </p>
        <span class="px-2.5 py-0.5 rounded bg-lan-50 text-lan-800 border border-lan-200 text-xs font-medium">
          ProperExpo LAN
        </span>
      </div>

      <div
        v-if="paginatedAuthors.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AuthorCard
          v-for="author in paginatedAuthors"
          :key="author.id"
          :author="author"
        />
      </div>

      <EmptyState
        v-else
        title="Peserta Tidak Ditemukan"
        description="Tidak ada nama peserta atau instansi yang sesuai dengan kata kunci pencarian Anda."
        reset-label="Tampilkan Semua Peserta"
        @reset="searchQuery = ''"
      />

      <Pagination
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filteredAuthors.length"
        :per-page="perPage"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Authors — LAN Knowledge Repository'
})

const { enrichedAuthors, syncAllFromProperExpoApi } = useProperExpo()

onMounted(() => {
  syncAllFromProperExpoApi()
})

const searchQuery = ref('')
const currentPage = ref(1)
const perPage = 16

const filteredAuthors = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return enrichedAuthors.value
  return enrichedAuthors.value.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.affiliation.toLowerCase().includes(q) ||
      a.expertise.some((e) => e.toLowerCase().includes(q))
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredAuthors.value.length / perPage))
)

const paginatedAuthors = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredAuthors.value.slice(start, start + perPage)
})

watch(searchQuery, () => {
  currentPage.value = 1
})
</script>
