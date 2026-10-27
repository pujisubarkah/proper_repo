<template>
  <div class="pb-16">
    <!-- Top Bar with Breadcrumbs & Back Navigation -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs
            :items="[
              { label: 'Collections', to: '/collections' },
              { label: collection ? collection.name : 'Kategori Tidak Ditemukan' }
            ]"
          />
          <NuxtLink
            to="/collections"
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
            <span>Kembali ke Daftar Kategori</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div v-if="collection" class="container-repository pt-8 space-y-8">
      <!-- Collection Overview Banner Card -->
      <div class="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div class="lg:col-span-8 space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-lan-900 text-gold-300">
                Kategori ProperExpo LAN
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200">
                {{ collection.publicationCount }} Proyek Perubahan
              </span>
            </div>

            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {{ collection.name }}
            </h1>

            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
              {{ collection.description }}
            </p>

            <div class="pt-2 text-xs text-slate-500">
              <span class="font-semibold text-slate-700">Klaster ProperExpo:</span>
              {{ collection.curatorUnit }}
            </div>
          </div>

          <!-- Scope Notes Box -->
          <div class="lg:col-span-4 bg-slate-50 rounded-xl border border-slate-200/80 p-5 space-y-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-lan-900">
              Cakupan Topik Proyek Perubahan
            </h2>
            <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
              <li
                v-for="scope in collection.scopeNotes"
                :key="scope"
                class="flex items-start gap-2"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-lan-700 mt-2 shrink-0"></span>
                <span>{{ scope }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Related Publications List -->
      <div class="space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 class="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Daftar Proyek Perubahan dalam Kategori Ini
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
              Menampilkan {{ collection.publications.length }} Proyek Perubahan pada kategori {{ collection.name }}.
            </p>
          </div>

          <NuxtLink
            to="/publications"
            class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-lan-800 hover:text-lan-600"
          >
            <span>Telusuri Semua di Katalog Utama</span>
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

        <PublicationList
          :publications="collection.publications"
          :show-reset="false"
        />
      </div>
    </div>

    <!-- Fallback if Collection Slug Not Found -->
    <div v-else class="container-repository pt-12">
      <EmptyState
        title="Kategori Tidak Ditemukan"
        description="Kategori yang Anda cari tidak ditemukan dalam repositori."
        reset-label="Kembali ke Daftar Kategori"
        @reset="router.push('/collections')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { findCollectionBySlug, syncAllFromProperExpoApi } = useProperExpo()

onMounted(() => {
  syncAllFromProperExpoApi()
})

const slug = computed(() => String(route.params.slug || ''))
const collection = computed(() => findCollectionBySlug(slug.value))

useHead(() => ({
  title: collection.value
    ? `${collection.value.name} — Collections — LAN Knowledge Repository`
    : 'Kategori Tidak Ditemukan — LAN Knowledge Repository'
}))
</script>
