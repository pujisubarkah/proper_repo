<template>
  <form
    class="w-full"
    role="search"
    aria-label="Pencarian Publikasi Repositori"
    @submit.prevent="handleSubmit"
  >
    <div
      class="flex flex-col sm:flex-row items-stretch rounded-xl overflow-hidden border transition-all"
      :class="
        variant === 'hero'
          ? 'bg-white border-white/20 shadow-xl focus-within:ring-2 focus-within:ring-gold-400'
          : 'bg-white border-slate-300 shadow-sm focus-within:border-lan-600 focus-within:ring-2 focus-within:ring-lan-100'
      "
    >
      <!-- Search Field Selector (All Fields, Title, Author, Keyword) -->
      <div class="relative flex items-center border-b sm:border-b-0 sm:border-r border-slate-200 bg-slate-50/90">
        <label :for="selectId" class="sr-only">Kategori Pencarian</label>
        <select
          :id="selectId"
          :value="searchField"
          class="w-full sm:w-40 appearance-none bg-transparent pl-4 pr-9 py-3.5 text-sm font-semibold text-lan-900 focus:outline-none cursor-pointer"
          @change="onFieldChange"
        >
          <option value="all">All Fields</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="keyword">Keyword</option>
        </select>
        <svg
          class="w-4 h-4 text-slate-500 pointer-events-none absolute right-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <!-- Main Search Input -->
      <div class="relative flex-1 flex items-center bg-white">
        <svg
          class="w-5 h-5 text-slate-400 ml-4 shrink-0"
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          :value="modelValue"
          type="text"
          :placeholder="placeholder"
          class="w-full pl-3 pr-10 py-3.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          @input="onQueryInput"
        />
        <button
          v-if="modelValue"
          type="button"
          class="p-1.5 mr-2 text-slate-400 hover:text-slate-700 rounded-md focus:outline-none"
          aria-label="Bersihkan kata kunci"
          @click="clearInput"
        >
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-lan-800 hover:bg-lan-700 text-white transition-colors shrink-0"
      >
        <span>Cari</span>
        <svg
          class="w-4 h-4 text-gold-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { SearchField } from '~/types/repository'

const props = withDefaults(
  defineProps<{
    modelValue: string
    searchField?: SearchField
    placeholder?: string
    variant?: 'hero' | 'inline'
    selectId?: string
  }>(),
  {
    searchField: 'all',
    placeholder: 'Cari judul publikasi, penulis, topik kebijakan, atau kata kunci...',
    variant: 'inline',
    selectId: 'repository-search-field'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:searchField', value: SearchField): void
  (e: 'submit', payload: { query: string; field: SearchField }): void
}>()

function onQueryInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onFieldChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:searchField', target.value as SearchField)
}

function clearInput() {
  emit('update:modelValue', '')
  emit('submit', { query: '', field: props.searchField })
}

function handleSubmit() {
  emit('submit', {
    query: props.modelValue.trim(),
    field: props.searchField
  })
}
</script>
