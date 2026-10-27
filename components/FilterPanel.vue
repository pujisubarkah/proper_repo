<template>
  <aside class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-6">
    <!-- Header & Reset -->
    <div class="flex items-center justify-between border-b border-slate-100 pb-4">
      <div class="flex items-center gap-2">
        <svg
          class="w-5 h-5 text-lan-700"
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        <h2 class="text-sm font-bold uppercase tracking-wider text-slate-900">
          Filter &amp; Urutan
        </h2>
      </div>
      <button
        v-if="hasActiveFilters"
        type="button"
        class="text-xs font-semibold text-lan-700 hover:text-lan-900 underline underline-offset-2 transition-colors"
        @click="$emit('reset')"
      >
        Reset Semua
      </button>
    </div>

    <!-- Sorting -->
    <div class="space-y-2">
      <label for="sort-select" class="block text-xs font-semibold uppercase tracking-wider text-slate-600">
        Urutkan Berdasarkan
      </label>
      <div class="relative">
        <select
          id="sort-select"
          :value="sortBy"
          class="w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 pl-3.5 pr-9 py-2.5 text-sm font-medium text-slate-800 focus:border-lan-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lan-100"
          @change="onSortChange"
        >
          <option value="newest">Terbaru (Tahun Tertinggi)</option>
          <option value="oldest">Terlama (Tahun Terendah)</option>
          <option value="title-asc">Judul (A – Z)</option>
          <option value="title-desc">Judul (Z – A)</option>
        </select>
        <svg
          class="w-4 h-4 text-slate-500 pointer-events-none absolute right-3 top-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>

    <!-- Document Type Filter -->
    <div class="space-y-2.5 pt-2 border-t border-slate-100">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-600">
        Jenis Publikasi
      </h3>
      <div class="space-y-1.5">
        <button
          type="button"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors"
          :class="
            selectedType === ''
              ? 'bg-lan-900 text-white font-semibold'
              : 'text-slate-700 hover:bg-slate-100'
          "
          @click="$emit('update:selectedType', '')"
        >
          <span>Semua Jenis Dokumen</span>
        </button>
        <button
          v-for="docType in availableTypes"
          :key="docType"
          type="button"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors"
          :class="
            selectedType === docType
              ? 'bg-lan-900 text-white font-semibold'
              : 'text-slate-700 hover:bg-slate-100'
          "
          @click="$emit('update:selectedType', docType)"
        >
          <span class="truncate">{{ docType }}</span>
          <span
            v-if="typeCounts && typeCounts[docType] !== undefined"
            class="text-xs px-2 py-0.5 rounded-full"
            :class="
              selectedType === docType
                ? 'bg-lan-800 text-gold-300'
                : 'bg-slate-100 text-slate-600'
            "
          >
            {{ typeCounts[docType] }}
          </span>
        </button>
      </div>
    </div>

    <!-- Year Filter -->
    <div class="space-y-2.5 pt-2 border-t border-slate-100">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-600">
        Tahun Terbit
      </h3>
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="col-span-2 px-3 py-2 rounded-lg text-sm text-center transition-colors border"
          :class="
            selectedYear === null
              ? 'bg-lan-900 text-white border-lan-900 font-semibold'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          "
          @click="$emit('update:selectedYear', null)"
        >
          Semua Tahun
        </button>
        <button
          v-for="year in availableYears"
          :key="year"
          type="button"
          class="px-3 py-2 rounded-lg text-sm text-center transition-colors border"
          :class="
            selectedYear === year
              ? 'bg-lan-900 text-white border-lan-900 font-semibold'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          "
          @click="$emit('update:selectedYear', year)"
        >
          {{ year }}
        </button>
      </div>
    </div>

    <!-- Bottom Reset Action -->
    <div v-if="hasActiveFilters" class="pt-3 border-t border-slate-100">
      <button
        type="button"
        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        @click="$emit('reset')"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <span>Hapus Filter Aktif</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { DocumentType, SortOption } from '~/types/repository'

const props = defineProps<{
  selectedYear: number | null
  selectedType: DocumentType | ''
  sortBy: SortOption
  availableYears: number[]
  availableTypes: DocumentType[]
  typeCounts?: Record<string, number>
  hasActiveFilters?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectedYear', year: number | null): void
  (e: 'update:selectedType', docType: DocumentType | ''): void
  (e: 'update:sortBy', sort: SortOption): void
  (e: 'reset'): void
}>()

function onSortChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:sortBy', target.value as SortOption)
}
</script>
