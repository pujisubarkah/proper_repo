<template>
  <div class="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm">
    <div class="w-14 h-14 rounded-full bg-lan-50 border border-lan-100 text-lan-700 flex items-center justify-center mx-auto mb-4">
      <svg
        class="w-7 h-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.6"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
    <h3 class="text-lg font-bold text-slate-900 mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
      {{ description }}
    </p>
    <div v-if="showReset" class="flex justify-center">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-lan-900 text-white hover:bg-lan-800 transition-colors shadow-sm"
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <span>{{ resetLabel }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    showReset?: boolean
    resetLabel?: string
  }>(),
  {
    title: 'Tidak Ada Data yang Ditemukan',
    description:
      'Pencarian atau kombinasi filter Anda belum menemukan dokumen yang sesuai dalam data contoh repositori.',
    showReset: true,
    resetLabel: 'Reset Pencarian & Filter'
  }
)

defineEmits<{
  (e: 'reset'): void
}>()
</script>
