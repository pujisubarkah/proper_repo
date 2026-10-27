<template>
  <div class="pb-16">
    <!-- Top Bar with Breadcrumbs & Back Button -->
    <section class="bg-white border-b border-slate-200">
      <div class="container-repository py-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs
            :items="[
              { label: 'Authors', to: '/authors' },
              { label: author ? author.name : 'Profil Tidak Ditemukan' }
            ]"
          />
          <NuxtLink
            to="/authors"
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
            <span>Kembali ke Direktori Peserta</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div v-if="author" class="container-repository pt-8 space-y-8">
      <!-- Author Profile Header Card -->
      <div class="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div class="lg:col-span-8 flex flex-col sm:flex-row items-start gap-5">
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-lan-900 text-gold-300 font-bold text-xl sm:text-2xl flex items-center justify-center shrink-0 border-2 border-lan-100"
              aria-hidden="true"
            >
              {{ initials }}
            </div>

            <div class="space-y-2.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200">
                  {{ author.roleTitle }}
                </span>
                <span class="px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
                  ProperExpo LAN
                </span>
              </div>

              <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {{ author.name }}
              </h1>

              <p class="text-sm font-semibold text-lan-800">
                {{ author.affiliation }}
              </p>

              <p class="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                {{ author.shortBio }}
              </p>

              <!-- Expertise Tags -->
              <div class="pt-2 flex flex-wrap items-center gap-2">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Klaster &amp; Program:
                </span>
                <NuxtLink
                  v-for="exp in author.expertise"
                  :key="exp"
                  :to="{ path: '/publications', query: { q: exp, field: 'keyword' } }"
                  class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-lan-100 hover:text-lan-900 transition-colors"
                >
                  {{ exp }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Author Metadata & Placeholder Info -->
          <div class="lg:col-span-4 bg-slate-50 rounded-xl border border-slate-200/80 p-5 space-y-3 text-xs sm:text-sm">
            <h2 class="text-xs font-bold uppercase tracking-wider text-lan-900 pb-2 border-b border-slate-200">
              Informasi Kepesertaan
            </h2>
            <div>
              <p class="text-xs font-semibold text-slate-500">Jumlah Proyek Perubahan</p>
              <p class="font-bold text-lan-900 text-base">{{ author.publicationCount }} Proyek Perubahan</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-500">Instansi Asal</p>
              <p class="text-slate-800 font-medium">{{ author.affiliation }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-500">Referensi Data</p>
              <p class="text-slate-700 break-all">{{ author.contactPlaceholder }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Author's Related Publications -->
      <div class="space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 class="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Proyek Perubahan oleh {{ author.name }}
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
              Menampilkan {{ author.publications.length }} Proyek Perubahan yang diprakarsai oleh {{ author.name }}.
            </p>
          </div>
        </div>

        <PublicationList
          :publications="author.publications"
          :show-reset="false"
        />
      </div>
    </div>

    <!-- Fallback if Author Not Found -->
    <div v-else class="container-repository pt-12">
      <EmptyState
        title="Profil Peserta Tidak Ditemukan"
        description="Peserta yang Anda cari tidak tersedia dalam direktori repositori."
        reset-label="Kembali ke Direktori Peserta"
        @reset="router.push('/authors')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { findAuthorBySlug, syncAllFromProperExpoApi } = useProperExpo()

onMounted(() => {
  syncAllFromProperExpoApi()
})

const slug = computed(() => String(route.params.slug || ''))
const author = computed(() => findAuthorBySlug(slug.value))

useHead(() => ({
  title: author.value
    ? `${author.value.name} — Authors — LAN Knowledge Repository`
    : 'Profil Peserta — LAN Knowledge Repository'
}))

const initials = computed(() => {
  if (!author.value) return 'AU'
  const cleaned = author.value.name
    .replace(/^(Prof\.|Dr\.|Drs\.|Ir\.|H\.|Hj\.)\s*/gi, '')
    .replace(/,.*$/, '')
    .trim()
  const parts = cleaned.split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
})
</script>
