<template>
  <NuxtLink
    :to="`/authors/${author.slug}`"
    class="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-lan-400 transition-all duration-200 flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-lan-600"
  >
    <div>
      <!-- Top Row: Avatar & Publication Count -->
      <div class="flex items-start justify-between gap-3 mb-4">
        <div
          class="w-12 h-12 rounded-full bg-lan-900 text-gold-300 font-bold text-base flex items-center justify-center shrink-0 border-2 border-lan-100 group-hover:bg-lan-800 transition-colors"
          aria-hidden="true"
        >
          {{ initials }}
        </div>
        <span
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-lan-50 text-lan-800 border border-lan-100"
        >
          <svg
            class="w-3.5 h-3.5 text-lan-600"
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <span>{{ author.publicationCount }} Publikasi Contoh</span>
        </span>
      </div>

      <!-- Author Name & Role -->
      <h3 class="text-base font-bold text-slate-900 group-hover:text-lan-700 transition-colors mb-1">
        {{ author.name }}
      </h3>
      <p class="text-xs font-semibold text-lan-700 mb-1">
        {{ author.roleTitle }}
      </p>
      <p class="text-xs text-slate-500 mb-3 line-clamp-2">
        {{ author.affiliation }}
      </p>

      <!-- Short Bio -->
      <p class="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
        {{ author.shortBio }}
      </p>
    </div>

    <!-- Expertise Chips & Link -->
    <div class="pt-3 border-t border-slate-100 space-y-3">
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="exp in author.expertise"
          :key="exp"
          class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium"
        >
          {{ exp }}
        </span>
      </div>

      <div class="flex items-center justify-between text-xs font-semibold text-lan-800 group-hover:text-lan-600 pt-1">
        <span>Lihat Profil &amp; Karya</span>
        <svg
          class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { EnrichedAuthor } from '~/types/repository'

const props = defineProps<{
  author: EnrichedAuthor
}>()

const initials = computed(() => {
  const cleaned = props.author.name
    .replace(/^(Prof\.|Dr\.|Ir\.|H\.|Hj\.)\s*/gi, '')
    .replace(/,.*$/, '')
    .trim()
  const parts = cleaned.split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
})
</script>
