<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
    <!-- Top Institutional Notice Bar -->
    <div class="bg-lan-950 text-slate-200 text-xs py-1.5 border-b border-lan-900">
      <div class="container-repository flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-gold-400"></span>
          <span class="font-medium text-white">Lembaga Administrasi Negara (LAN)</span>
          <span class="hidden sm:inline text-slate-400">|</span>
          <span class="hidden sm:inline text-slate-300">Prototipe Portal Repositori Pengetahuan Institusional</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded bg-lan-900 text-gold-300 border border-lan-800 font-medium">
            Simulasi UI — Data Contoh
          </span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="container-repository">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Identity -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3.5 group focus:outline-none"
          aria-label="Beranda LAN Knowledge Repository"
        >
          <div
            class="w-11 h-11 rounded-lg bg-lan-900 text-white flex items-center justify-center shadow-sm border border-lan-800 group-hover:bg-lan-800 transition-colors"
          >
            <svg
              class="w-6 h-6 text-gold-400"
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
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-bold tracking-tight text-lan-950 group-hover:text-lan-700 transition-colors">
                LAN KNOWLEDGE REPOSITORY
              </span>
            </div>
            <p class="text-xs text-slate-500 font-medium tracking-wide">
              Discover Knowledge, Advance Public Service
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navigasi Utama">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-3.5 py-2 rounded-md text-sm font-medium transition-colors"
            :class="
              isActiveRoute(item.to)
                ? 'bg-lan-50 text-lan-800 font-semibold border border-lan-200/80'
                : 'text-slate-600 hover:text-lan-900 hover:bg-slate-100/80'
            "
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Quick Action / Search CTA on Desktop -->
        <div class="hidden lg:flex items-center gap-3">
          <NuxtLink
            to="/publications"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-lan-900 text-white hover:bg-lan-800 transition-colors shadow-sm"
          >
            <svg
              class="w-4 h-4 text-gold-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span>Telusuri Publikasi</span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-slate-600 hover:text-lan-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lan-600"
          :aria-expanded="mobileMenuOpen"
          aria-label="Buka menu navigasi"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="block px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors"
        :class="
          isActiveRoute(item.to)
            ? 'bg-lan-50 text-lan-900 font-semibold border border-lan-200'
            : 'text-slate-700 hover:bg-slate-100'
        "
        @click="mobileMenuOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      <div class="pt-2 border-t border-slate-100">
        <NuxtLink
          to="/publications"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-lan-900 text-white hover:bg-lan-800 transition-colors"
          @click="mobileMenuOpen = false"
        >
          <svg
            class="w-4 h-4 text-gold-300"
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
          <span>Telusuri Publikasi</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Publications', to: '/publications' },
  { label: 'Authors', to: '/authors' },
  { label: 'About', to: '/about' }
]

function isActiveRoute(target: string): boolean {
  if (target === '/') {
    return route.path === '/'
  }
  return route.path === target || route.path.startsWith(`${target}/`)
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>
