<template>
  <article
    class="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-lan-300 transition-all duration-200 flex flex-col justify-between"
  >
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-5">
      <!-- Optional Poster Portrait Thumbnail from ProperExpo LAN -->
      <NuxtLink
        v-if="publication.metadata.posterPortraitUrl && !posterError"
        :to="`/publications/${publication.slug}`"
        class="w-full sm:w-28 md:w-32 h-44 sm:h-40 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 group relative"
      >
        <img
          :src="publication.metadata.posterPortraitUrl"
          :alt="`Poster ${publication.title}`"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          @error="posterError = true"
        />
        <span
          v-if="publication.metadata.properId"
          class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-lan-950/85 text-gold-300"
        >
          #{{ publication.metadata.properId }}
        </span>
      </NuxtLink>

      <div class="flex-1 min-w-0">
        <!-- Top Metadata Row: Document Type, Angkatan, Year, Collection -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div class="flex flex-wrap items-center gap-1.5">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border"
              :class="badgeClass"
            >
              {{ publication.documentType }}
            </span>
            <span
              v-if="publication.metadata.angkatan && publication.metadata.angkatan !== '-'"
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-200"
            >
              PKN Angkatan {{ publication.metadata.angkatan }}
            </span>
            <span class="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
              <svg
                class="w-3.5 h-3.5 text-slate-500"
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <span>{{ publication.year }}</span>
            </span>
          </div>

          <NuxtLink
            v-if="publication.collection"
            :to="`/collections/${publication.collection.slug}`"
            class="text-xs font-semibold text-lan-700 hover:text-lan-900 hover:underline truncate max-w-[220px]"
          >
            {{ publication.collection.name }}
          </NuxtLink>
        </div>

        <!-- Title -->
        <h3 class="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug mb-1.5">
          <NuxtLink
            :to="`/publications/${publication.slug}`"
            class="hover:text-lan-700 transition-colors focus:outline-none focus:underline"
          >
            {{ publication.title }}
          </NuxtLink>
        </h3>

        <!-- Authors & Instansi -->
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-600 mb-2.5">
          <template v-for="(author, idx) in publication.authors" :key="author.slug">
            <NuxtLink
              :to="`/authors/${author.slug}`"
              class="font-semibold text-lan-800 hover:text-lan-600 underline decoration-slate-300 hover:decoration-lan-600 underline-offset-2 transition-colors"
            >
              {{ author.name }}
            </NuxtLink>
            <span v-if="idx < publication.authors.length - 1" class="text-slate-400">&bull;</span>
          </template>
          <span
            v-if="publication.metadata.instansiName"
            class="text-xs text-slate-500 font-medium"
          >
            &mdash; {{ publication.metadata.instansiName }}
          </span>
        </div>

        <!-- Abstract Excerpt -->
        <p class="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3">
          {{ publication.abstract }}
        </p>
      </div>
    </div>

    <!-- Bottom Row: Keywords & Actions -->
    <div class="pt-3 mt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-1.5">
        <span
          v-for="kw in publication.keywords.slice(0, 3)"
          :key="kw"
          class="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium truncate max-w-[200px]"
        >
          {{ kw }}
        </span>
        <span
          v-if="publication.metadata.viewsCount"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-xs"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span>{{ publication.metadata.viewsCount }}x dilihat</span>
        </span>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <a
          v-if="publication.metadata.youtubeUrl"
          :href="publication.metadata.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-lan-900 px-2.5 py-1.5 rounded-md border border-slate-200 hover:border-lan-300 bg-slate-50 hover:bg-lan-50 transition-colors"
        >
          <svg
            class="w-3.5 h-3.5 text-lan-700"
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
          <span>Video</span>
        </a>
        <NuxtLink
          :to="`/publications/${publication.slug}`"
          class="inline-flex items-center gap-1 text-xs font-semibold text-lan-800 hover:text-lan-600 transition-colors"
        >
          <span>Detail Proyek Perubahan</span>
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { EnrichedPublication } from '~/types/repository'

const props = defineProps<{
  publication: EnrichedPublication
}>()

const posterError = ref(false)

const badgeClass = computed(() => {
  switch (props.publication.documentType) {
    case 'Proyek Perubahan':
      return 'bg-amber-50 text-amber-900 border-amber-200'
    case 'Artikel Jurnal':
      return 'bg-lan-50 text-lan-800 border-lan-200'
    case 'Laporan Kajian':
      return 'bg-emerald-50 text-emerald-900 border-emerald-200'
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200'
  }
})
</script>
