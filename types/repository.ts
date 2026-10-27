export type SearchField = 'all' | 'title' | 'author' | 'keyword'

export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

export type DocumentType =
  | 'Proyek Perubahan'
  | 'PKN Tingkat I'
  | 'Artikel Jurnal'
  | 'Laporan Kajian'
  | 'Kertas Kerja'
  | 'Modul Pelatihan'
  | 'Prosiding Seminar'

export type CollectionIconType =
  | 'policy'
  | 'competency'
  | 'digital'
  | 'governance'
  | 'innovation'
  | 'leadership'

export interface Collection {
  id: string
  slug: string
  kategoriId?: number
  name: string
  shortDescription: string
  description: string
  icon: CollectionIconType
  featured: boolean
  curatorUnit: string
  scopeNotes: string[]
}

export interface Author {
  id: string
  slug: string
  name: string
  affiliation: string
  roleTitle: string
  shortBio: string
  expertise: string[]
  orcidPlaceholder: string | null
  contactPlaceholder: string
}

export interface PublicationMetadata {
  identifierUri: string
  properId?: number
  diklatName?: string
  angkatan?: number | string
  ndh?: number | string
  instansiName?: string
  kategoriName?: string
  posterPortraitUrl?: string | null
  posterLandscapeUrl?: string | null
  youtubeUrl?: string | null
  videoInternalUrl?: string | null
  viewsCount?: number
  rating?: string | null
  issnOrIsbn: string | null
  doi: string | null
  publisher: string
  rights: string
  fundingNote: string | null
  volumeIssue: string | null
}

export interface Publication {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  authorSlugs: string[]
  collectionSlug: string
  year: number
  publishedDate: string
  documentType: DocumentType
  abstract: string
  fullDescriptionHtml?: string
  keywords: string[]
  featured: boolean
  language: string
  pages: string
  pdfUrl: string | null
  fileSize: string | null
  metadata: PublicationMetadata
}

export interface EnrichedPublication extends Publication {
  authors: Author[]
  collection: Collection
}

export interface EnrichedCollection extends Collection {
  publicationCount: number
  publications: EnrichedPublication[]
}

export interface EnrichedAuthor extends Author {
  publicationCount: number
  publications: EnrichedPublication[]
}

export interface RepositoryStatItem {
  label: string
  value: string
  subtext: string
  isSampleNote: string
}
