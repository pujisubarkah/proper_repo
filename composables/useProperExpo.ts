import {
  AUTHORS,
  COLLECTIONS,
  PROPEREXPO_API_BASE,
  PUBLICATIONS,
  enrichPublication,
  getAllEnrichedAuthors,
  getAllEnrichedCollections,
  getAllEnrichedPublications,
  getAvailableAngkatan,
  getAvailableDocumentTypes,
  getAvailableYears,
  getEnrichedAuthorBySlug,
  getEnrichedCollectionBySlug,
  getEnrichedPublicationBySlug,
  mapRawItemToAuthor,
  mapRawItemToPublication,
  type ProperExpoRawItem
} from '~/data/repository'
import type { Author, EnrichedPublication, Publication } from '~/types/repository'

export function useProperExpo() {
  const publicationsState = useState<Publication[]>(
    'properexpo-publications',
    () => [...PUBLICATIONS]
  )
  const authorsState = useState<Author[]>(
    'properexpo-authors',
    () => [...AUTHORS]
  )
  const isLiveSynced = useState<boolean>('properexpo-live-synced', () => false)
  const isSyncing = useState<boolean>('properexpo-is-syncing', () => false)
  const totalApiCount = useState<number>(
    'properexpo-total-count',
    () => PUBLICATIONS.length
  )

  const enrichedPublications = computed(() =>
    getAllEnrichedPublications(publicationsState.value, authorsState.value)
  )

  const enrichedCollections = computed(() =>
    getAllEnrichedCollections(publicationsState.value, authorsState.value)
  )

  const enrichedAuthors = computed(() =>
    getAllEnrichedAuthors(publicationsState.value, authorsState.value)
  )

  const availableYears = computed(() =>
    getAvailableYears(publicationsState.value)
  )

  const availableTypes = computed(() =>
    getAvailableDocumentTypes(publicationsState.value)
  )

  const availableAngkatan = computed(() =>
    getAvailableAngkatan(publicationsState.value)
  )

  async function syncAllFromProperExpoApi() {
    if (isLiveSynced.value || isSyncing.value) return
    isSyncing.value = true
    try {
      const response = await $fetch<{
        status?: boolean
        data?: {
          total?: number
          data?: ProperExpoRawItem[]
        }
      }>(`${PROPEREXPO_API_BASE}/tx-proper?perPage=400`)

      const rawItems = response?.data?.data
      if (Array.isArray(rawItems) && rawItems.length > 0) {
        const authorsMap = new Map<string, Author>()
        const pubs: Publication[] = []

        for (const raw of rawItems) {
          if (!raw || !raw.id_proper || !raw.judul) continue
          const author = mapRawItemToAuthor(raw)
          if (!authorsMap.has(author.slug)) {
            authorsMap.set(author.slug, author)
          }
          pubs.push(mapRawItemToPublication(raw))
        }

        if (pubs.length > 0) {
          publicationsState.value = pubs
          authorsState.value = Array.from(authorsMap.values())
          totalApiCount.value = response?.data?.total || pubs.length
          isLiveSynced.value = true
        }
      }
    } catch {
      // Keep local seed dataset silently if network/API is unreachable
    } finally {
      isSyncing.value = false
    }
  }

  async function findOrFetchPublicationBySlugOrId(
    slugOrId: string
  ): Promise<EnrichedPublication | undefined> {
    const existing = getEnrichedPublicationBySlug(
      slugOrId,
      publicationsState.value,
      authorsState.value
    )
    if (existing) {
      return existing
    }

    // Extract leading numeric ID if present (e.g., "1" or "1-spill-the-messenger")
    const idMatch = slugOrId.trim().match(/^(\d+)/)
    if (!idMatch) return undefined

    const properId = idMatch[1]
    try {
      const response = await $fetch<{
        status?: boolean
        data?: ProperExpoRawItem
      }>(`${PROPEREXPO_API_BASE}/tx-proper/${properId}`)

      if (response?.data && response.data.id_proper) {
        const raw = response.data
        const newAuthor = mapRawItemToAuthor(raw)
        const newPub = mapRawItemToPublication(raw)

        if (!authorsState.value.some((a) => a.slug === newAuthor.slug)) {
          authorsState.value = [...authorsState.value, newAuthor]
        }
        if (!publicationsState.value.some((p) => p.id === newPub.id)) {
          publicationsState.value = [newPub, ...publicationsState.value]
        }

        return enrichPublication(newPub, authorsState.value)
      }
    } catch {
      return undefined
    }
    return undefined
  }

  function findCollectionBySlug(slug: string) {
    return getEnrichedCollectionBySlug(
      slug,
      publicationsState.value,
      authorsState.value
    )
  }

  function findAuthorBySlug(slug: string) {
    return getEnrichedAuthorBySlug(
      slug,
      publicationsState.value,
      authorsState.value
    )
  }

  return {
    collections: COLLECTIONS,
    publicationsState,
    authorsState,
    enrichedPublications,
    enrichedCollections,
    enrichedAuthors,
    availableYears,
    availableTypes,
    availableAngkatan,
    isLiveSynced,
    isSyncing,
    totalApiCount,
    syncAllFromProperExpoApi,
    findOrFetchPublicationBySlugOrId,
    findCollectionBySlug,
    findAuthorBySlug
  }
}
