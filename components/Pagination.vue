<template>
  <nav
    v-if="totalPages > 1"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200"
    aria-label="Navigasi Halaman"
  >
    <p class="text-xs sm:text-sm text-slate-600">
      Menampilkan
      <span class="font-semibold text-slate-900">{{ startItem }}</span>
      &ndash;
      <span class="font-semibold text-slate-900">{{ endItem }}</span>
      dari
      <span class="font-semibold text-slate-900">{{ totalItems }}</span>
      dokumen contoh
    </p>

    <div class="inline-flex items-center gap-1.5">
      <!-- Previous Button -->
      <button
        type="button"
        :disabled="currentPage <= 1"
        class="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors"
        :class="
          currentPage <= 1
            ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-lan-50 hover:border-lan-300 hover:text-lan-900'
        "
        aria-label="Halaman sebelumnya"
        @click="goToPage(currentPage - 1)"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span class="hidden sm:inline">Sebelumnya</span>
      </button>

      <!-- Page Numbers -->
      <button
        v-for="page in pages"
        :key="page"
        type="button"
        class="w-9 h-9 rounded-lg text-sm font-semibold border transition-colors flex items-center justify-center"
        :class="
          page === currentPage
            ? 'border-lan-900 bg-lan-900 text-white shadow-sm'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-lan-50 hover:border-lan-300 hover:text-lan-900'
        "
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <!-- Next Button -->
      <button
        type="button"
        :disabled="currentPage >= totalPages"
        class="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors"
        :class="
          currentPage >= totalPages
            ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-lan-50 hover:border-lan-300 hover:text-lan-900'
        "
        aria-label="Halaman berikutnya"
        @click="goToPage(currentPage + 1)"
      >
        <span class="hidden sm:inline">Berikutnya</span>
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.totalItems)
})

const pages = computed(() => {
  const list: number[] = []
  for (let i = 1; i <= props.totalPages; i++) {
    list.push(i)
  }
  return list
})

function goToPage(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('update:currentPage', page)
}
</script>
