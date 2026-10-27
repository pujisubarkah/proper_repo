<template>
  <div>
    <div v-if="publications.length > 0" class="space-y-4">
      <PublicationCard
        v-for="pub in publications"
        :key="pub.id"
        :publication="pub"
      />
    </div>
    <EmptyState
      v-else
      :title="emptyTitle"
      :description="emptyDescription"
      :show-reset="showReset"
      @reset="$emit('reset')"
    />
  </div>
</template>

<script setup lang="ts">
import type { EnrichedPublication } from '~/types/repository'

withDefaults(
  defineProps<{
    publications: EnrichedPublication[]
    emptyTitle?: string
    emptyDescription?: string
    showReset?: boolean
  }>(),
  {
    emptyTitle: 'Tidak Ada Publikasi yang Ditemukan',
    emptyDescription:
      'Tidak ditemukan publikasi contoh yang sesuai dengan kata kunci pencarian atau filter yang Anda pilih.',
    showReset: true
  }
)

defineEmits<{
  (e: 'reset'): void
}>()
</script>
