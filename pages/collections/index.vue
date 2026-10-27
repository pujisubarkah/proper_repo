<template>
  <div class="pb-16">
    <!-- Page Header -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-6 sm:py-8">
        <Breadcrumbs :items="[{ label: 'Collections' }]" />

        <div class="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="max-w-3xl">
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Kategori Proyek Perubahan (ProperExpo LAN)
            </h1>
            <p class="text-sm sm:text-base text-slate-600 mt-1.5">
              Proyek perubahan dibagi dalam beberapa kategori sesuai dengan tujuan utama pelaksanaan proyek perubahan pada Pelatihan Kepemimpinan Nasional (PKN).
            </p>
          </div>

          <!-- Quick Filter Input -->
          <div class="w-full md:w-72">
            <div class="relative">
              <input
                v-model="filterQuery"
                type="text"
                placeholder="Saring nama kategori..."
                class="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-lan-600 focus:outline-none focus:ring-2 focus:ring-lan-100"
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collections Grid -->
    <section class="container-repository pt-8">
      <div
        v-if="filteredCollections.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <CollectionCard
          v-for="col in filteredCollections"
          :key="col.id"
          :collection="col"
        />
      </div>

      <EmptyState
        v-else
        title="Kategori Tidak Ditemukan"
        description="Tidak ada nama atau deskripsi kategori yang cocok dengan kata kunci yang Anda ketikkan."
        reset-label="Tampilkan Semua Kategori"
        @reset="filterQuery = ''"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Collections — LAN Knowledge Repository'
})

const { enrichedCollections, syncAllFromProperExpoApi } = useProperExpo()

onMounted(() => {
  syncAllFromProperExpoApi()
})

const filterQuery = ref('')

const filteredCollections = computed(() => {
  const q = filterQuery.value.trim().toLowerCase()
  if (!q) return enrichedCollections.value
  return enrichedCollections.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  )
})
</script>
