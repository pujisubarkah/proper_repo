<template>
  <nav aria-label="Breadcrumb" class="py-3">
    <ol class="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
      <li>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 hover:text-lan-800 transition-colors font-medium"
        >
          <svg
            class="w-4 h-4 text-slate-400"
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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span>Home</span>
        </NuxtLink>
      </li>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-1.5 max-w-full"
      >
        <svg
          class="w-3.5 h-3.5 text-slate-400 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-lan-800 transition-colors font-medium truncate max-w-[200px] sm:max-w-xs"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="text-slate-800 font-semibold truncate max-w-[240px] sm:max-w-md md:max-w-xl"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
