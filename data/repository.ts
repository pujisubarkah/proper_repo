import seedItems from './properexpo-seed.json'
import type {
  Author,
  Collection,
  DocumentType,
  EnrichedAuthor,
  EnrichedCollection,
  EnrichedPublication,
  Publication,
  RepositoryStatItem
} from '~/types/repository'

export const PROPEREXPO_API_BASE = 'https://properexpo.lan.go.id/app/api'
export const PROPEREXPO_UPLOAD_BASE =
  'https://properexpo.lan.go.id/uploads/properexpo-lan'
export const PROPEREXPO_VIDEO_BASE =
  'https://properexpo.lan.go.id/uploads/properexpo-lan/video'

export interface ProperExpoRawItem {
  id_proper: number
  id_diklat?: string | number | null
  angkatan?: string | number | null
  tahun?: string | number | null
  ndh?: string | number | null
  nama?: string | null
  id_instansi?: string | number | null
  id_proper_kategori?: string | number | null
  judul?: string | null
  judul_lengkap?: string | null
  deskripsi_singkat?: string | null
  deskripsi_lengkap?: string | null
  link_youtube?: string | null
  link_video_internal?: string | null
  link_video_eksternal?: string | null
  jenis_video?: string | null
  berkas_poster_potrait?: string | null
  berkas_poster_landscape?: string | null
  jumlah_lihat?: string | number | null
  jumlah_share?: string | number | null
  rating?: string | number | null
  created_at?: string | null
  md_diklat?: {
    id_diklat?: number
    nama?: string
  } | null
  md_instansi?: {
    id_instansi?: number
    nama?: string
  } | null
  ref_proper_kategori?: {
    id_proper_kategori?: number
    nama?: string
  } | null
}

// Official ProperExpo Categories mapped to Institutional Collections
export const COLLECTIONS: Collection[] = [
  {
    id: 'col-kat-4',
    slug: 'digitalisasi-pemerintahan',
    kategoriId: 4,
    name: 'Digitalisasi Pemerintahan',
    shortDescription:
      'Proyek perubahan yang menghadirkan transformasi layanan digital pemerintah, integrasi sistem informasi, dan tata kelola berbasis elektronik.',
    description:
      'Koleksi ini menghimpun Laporan Proyek Perubahan (Proper) peserta Pelatihan Kepemimpinan Nasional (PKN) yang berfokus pada akselerasi digitalisasi pemerintahan, interoperabilitas data lintas instansi, modernisasi kearsipan dan layanan publik digital, serta pemanfaatan teknologi informasi dalam birokrasi.',
    icon: 'digital',
    featured: true,
    curatorUnit: 'ProperExpo LAN — Klaster Digitalisasi Pemerintahan',
    scopeNotes: [
      'Platform Layanan Digital & Sistem Pemerintahan Berbasis Elektronik (SPBE)',
      'Integrasi Basis Data Nasional dan Diseminasi Informasi Publik',
      'Otomasi Proses Bisnis Birokrasi dan Pelayanan Masyarakat'
    ]
  },
  {
    id: 'col-kat-2',
    slug: 'program-prioritas-presiden',
    kategoriId: 2,
    name: 'Program Prioritas Presiden',
    shortDescription:
      'Proyek perubahan strategis yang mengawal pencapaian agenda pembangunan prioritas nasional lintas kementerian, lembaga, dan daerah.',
    description:
      'Menyajikan himpunan Proyek Perubahan (Proper) yang dirancang untuk mengakselerasi eksekusi Program Prioritas Presiden. Mencakup sinergi lintas sektor, ketahanan pangan dan energi, pembangunan sumber daya manusia unggul, reformasi tata kelola strategis, serta penguatan daya saing bangsa.',
    icon: 'policy',
    featured: true,
    curatorUnit: 'ProperExpo LAN — Klaster Program Prioritas Presiden',
    scopeNotes: [
      'Sinkronisasi Kebijakan Pusat dan Daerah pada Program Strategis Nasional',
      'Ketahanan Pangan, Energi, Kesehatan, dan Transformasi SDM',
      'Kolaborasi Pentahelix dalam Eksekusi Agenda Prioritas Pemerintah'
    ]
  },
  {
    id: 'col-kat-1',
    slug: 'pengentasan-kemiskinan',
    kategoriId: 1,
    name: 'Pengentasan Kemiskinan',
    shortDescription:
      'Terobosan kepemimpinan dalam pemberdayaan ekonomi masyarakat, pelindungan sosial adaptif, dan perluasan akses layanan dasar.',
    description:
      'Koleksi Proyek Perubahan yang berfokus pada strategi pengentasan kemiskinan ekstrem, perluasan kesempatan kerja kompetitif, pemberdayaan UMKM dan ekonomi kerakyatan, serta peningkatan kualitas pelayanan dasar di daerah tertinggal dan kepulauan.',
    icon: 'competency',
    featured: true,
    curatorUnit: 'ProperExpo LAN — Klaster Pengentasan Kemiskinan',
    scopeNotes: [
      'Pemberdayaan Ekonomi Masyarakat & Peningkatan Kompetensi Tenaga Kerja',
      'Konvergensi Program Penurunan Kemiskinan Lintas Sektor',
      'Inklusi Sosial dan Akses Pelayanan Dasar Wilayah Rentan'
    ]
  },
  {
    id: 'col-kat-3',
    slug: 'peningkatan-investasi',
    kategoriId: 3,
    name: 'Peningkatan Investasi',
    shortDescription:
      'Inovasi kemudahan berusaha, kepastian regulasi perizinan, dan penguatan ekosistem investasi berkelanjutan di pusat maupun daerah.',
    description:
      'Berisi Proyek Perubahan yang merancang terobosan debirokratisasi perizinan, penguatan iklim investasi daerah, kemitraan pemerintah dan badan usaha, serta pengembangan kawasan ekonomi yang berdaya saing tinggi.',
    icon: 'innovation',
    featured: true,
    curatorUnit: 'ProperExpo LAN — Klaster Peningkatan Investasi',
    scopeNotes: [
      'Penyederhanaan Regulasi dan Percepatan Layanan Perizinan Berusaha',
      'Promosi dan Penguatan Ekosistem Investasi Daerah & Nasional',
      'Sinergi Dunia Usaha, BUMN, dan Pemerintah dalam Hilirisasi Ekonomi'
    ]
  },
  {
    id: 'col-kat-9',
    slug: 'inovasi-tata-kelola-lainnya',
    kategoriId: 9,
    name: 'Inovasi & Tata Kelola Sektor Publik',
    shortDescription:
      'Proyek perubahan kepemimpinan strategis di bidang reformasi kelembagaan, manajemen kinerja, pertahanan-keamanan, dan pelayanan publik.',
    description:
      'Koleksi Proyek Perubahan Pelatihan Kepemimpinan Nasional (PKN) yang mencakup terobosan manajemen perubahan organisasi, peningkatan akuntabilitas kinerja, penguatan pengawasan internal, serta inovasi tata kelola aparatur negara.',
    icon: 'governance',
    featured: false,
    curatorUnit: 'ProperExpo LAN — Klaster Inovasi & Tata Kelola',
    scopeNotes: [
      'Manajemen Perubahan dan Penguatan Kelembagaan Instansi',
      'Peningkatan Kualitas Pelayanan Publik dan Tata Laksana',
      'Kolaborasi Antar-Lembaga dalam Penyelenggaraan Pemerintahan'
    ]
  }
]

// Utility: Strip HTML tags and normalize whitespace
export function stripHtmlToText(html?: string | null): string {
  if (!html) return ''
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function slugifyText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export function getCollectionSlugByKategoriId(
  kategoriId?: string | number | null
): string {
  const num = Number(kategoriId)
  if (num === 4) return 'digitalisasi-pemerintahan'
  if (num === 2) return 'program-prioritas-presiden'
  if (num === 1) return 'pengentasan-kemiskinan'
  if (num === 3) return 'peningkatan-investasi'
  return 'inovasi-tata-kelola-lainnya'
}

export function mapRawItemToAuthor(raw: ProperExpoRawItem): Author {
  const cleanName = (raw.nama || 'Peserta PKN LAN').trim()
  const authorSlug = slugifyText(cleanName) || `author-${raw.id_proper}`
  const instansi =
    raw.md_instansi?.nama?.trim() || 'Instansi Pemerintah Republik Indonesia'
  const diklat =
    raw.md_diklat?.nama?.trim() ||
    'Pelatihan Kepemimpinan Nasional (PKN) Tingkat I'
  const angkatanStr = raw.angkatan ? `Angkatan ${raw.angkatan}` : ''
  const kategoriName =
    raw.ref_proper_kategori?.nama?.trim() || 'Inovasi Tata Kelola'

  return {
    id: `auth-${authorSlug}`,
    slug: authorSlug,
    name: cleanName,
    affiliation: instansi,
    roleTitle: `Peserta ${diklat} ${angkatanStr}`.trim(),
    shortBio: `Pemrakarsa Proyek Perubahan pada ${diklat} ${angkatanStr} dari ${instansi}, dengan fokus terobosan pada klaster ${kategoriName}.`,
    expertise: [
      kategoriName,
      angkatanStr ? `PKN ${angkatanStr}` : 'Kepemimpinan Nasional',
      'Proyek Perubahan'
    ],
    orcidPlaceholder: null,
    contactPlaceholder: `Terdaftar pada ProperExpo LAN (ID Proper #${raw.id_proper})`
  }
}

export function mapRawItemToPublication(raw: ProperExpoRawItem): Publication {
  const idProper = Number(raw.id_proper)
  const shortTitle = (raw.judul || `Proyek Perubahan #${idProper}`).trim()
  const fullTitle = raw.judul_lengkap ? raw.judul_lengkap.trim() : null
  const displayTitle =
    fullTitle && fullTitle.toLowerCase() !== shortTitle.toLowerCase()
      ? `${shortTitle}: ${fullTitle}`
      : shortTitle

  const slug = `${idProper}-${slugifyText(shortTitle) || 'proper'}`
  const author = mapRawItemToAuthor(raw)
  const collectionSlug = getCollectionSlugByKategoriId(raw.id_proper_kategori)

  const descFull = stripHtmlToText(raw.deskripsi_lengkap)
  const descShort = stripHtmlToText(raw.deskripsi_singkat)
  const abstractText =
    descFull ||
    descShort ||
    `Laporan Proyek Perubahan oleh ${author.name} (${author.affiliation}) pada ${raw.md_diklat?.nama || 'Pelatihan Kepemimpinan Nasional'}.`

  const year = Number(raw.tahun) || 2024
  const angkatan = raw.angkatan ? String(raw.angkatan) : '-'
  const diklatName =
    raw.md_diklat?.nama || 'Pelatihan Kepemimpinan Nasional (PKN) Tingkat I'
  const instansiName =
    raw.md_instansi?.nama || 'Instansi Pemerintah Republik Indonesia'
  const kategoriName =
    raw.ref_proper_kategori?.nama || 'Inovasi & Tata Kelola Sektor Publik'

  const keywords: string[] = [
    'Proyek Perubahan',
    kategoriName,
    `PKN Angkatan ${angkatan}`
  ]
  if (instansiName && instansiName.length <= 45) {
    keywords.push(instansiName)
  }

  const posterPortraitUrl = raw.berkas_poster_potrait
    ? `${PROPEREXPO_UPLOAD_BASE}/berkas_poster_potrait/${raw.berkas_poster_potrait}`
    : null
  const posterLandscapeUrl = raw.berkas_poster_landscape
    ? `${PROPEREXPO_UPLOAD_BASE}/berkas_poster_landscape/${raw.berkas_poster_landscape}`
    : null
  const videoInternalUrl = raw.link_video_internal
    ? `${PROPEREXPO_VIDEO_BASE}/${raw.link_video_internal}`
    : null

  return {
    id: `proper-${idProper}`,
    slug,
    title: displayTitle,
    subtitle: fullTitle ? shortTitle : null,
    authorSlugs: [author.slug],
    collectionSlug,
    year,
    publishedDate: `Tahun ${year} (Angkatan ${angkatan})`,
    documentType: 'Proyek Perubahan',
    abstract: abstractText,
    fullDescriptionHtml: raw.deskripsi_lengkap || raw.deskripsi_singkat || '',
    keywords,
    featured: [1, 5, 4, 2, 12, 15].includes(idProper),
    language: 'Bahasa Indonesia',
    pages: `PKN Angkatan ${angkatan}`,
    pdfUrl: '/sample-publication.pdf',
    fileSize: 'Dokumen & Media ProperExpo',
    metadata: {
      identifierUri: `https://properexpo.lan.go.id/web/proper/detail/${idProper}`,
      properId: idProper,
      diklatName,
      angkatan,
      ndh: raw.ndh ?? '-',
      instansiName,
      kategoriName,
      posterPortraitUrl,
      posterLandscapeUrl,
      youtubeUrl: raw.link_youtube || null,
      videoInternalUrl,
      viewsCount: Number(raw.jumlah_lihat) || 0,
      rating: raw.rating ? String(raw.rating) : null,
      issnOrIsbn: null,
      doi: null,
      publisher: `${instansiName} — ${diklatName} (ProperExpo LAN)`,
      rights: 'Akses Terbuka — ProperExpo Lembaga Administrasi Negara (LAN)',
      fundingNote: null,
      volumeIssue: `${diklatName} • Angkatan ${angkatan} (${year})`
    }
  }
}

// Build initial dataset from the 60 real ProperExpo items in properexpo-seed.json
function buildDatasetFromRawList(rawList: ProperExpoRawItem[]) {
  const authorsMap = new Map<string, Author>()
  const publications: Publication[] = []

  for (const raw of rawList) {
    if (!raw || !raw.id_proper) continue
    const author = mapRawItemToAuthor(raw)
    if (!authorsMap.has(author.slug)) {
      authorsMap.set(author.slug, author)
    }
    const pub = mapRawItemToPublication(raw)
    publications.push(pub)
  }

  return {
    authors: Array.from(authorsMap.values()),
    publications
  }
}

const initialBuilt = buildDatasetFromRawList(seedItems as ProperExpoRawItem[])

export const AUTHORS: Author[] = initialBuilt.authors
export const PUBLICATIONS: Publication[] = initialBuilt.publications

// Helper Functions for Relational Consistency

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export function getAuthorBySlug(
  slug: string,
  customAuthors: Author[] = AUTHORS
): Author | undefined {
  return customAuthors.find((a) => a.slug === slug)
}

export function enrichPublication(
  pub: Publication,
  customAuthors: Author[] = AUTHORS
): EnrichedPublication {
  const collection =
    getCollectionBySlug(pub.collectionSlug) || COLLECTIONS[0]
  const authors = pub.authorSlugs
    .map((slug) => getAuthorBySlug(slug, customAuthors))
    .filter((a): a is Author => Boolean(a))

  return {
    ...pub,
    authors,
    collection
  }
}

export function getAllEnrichedPublications(
  customPublications: Publication[] = PUBLICATIONS,
  customAuthors: Author[] = AUTHORS
): EnrichedPublication[] {
  return customPublications.map((p) => enrichPublication(p, customAuthors))
}

export function getEnrichedPublicationBySlug(
  slugOrId: string,
  customPublications: Publication[] = PUBLICATIONS,
  customAuthors: Author[] = AUTHORS
): EnrichedPublication | undefined {
  const trimmed = slugOrId.trim()
  const found = customPublications.find(
    (p) =>
      p.slug === trimmed ||
      String(p.metadata.properId) === trimmed ||
      p.slug.startsWith(`${trimmed}-`)
  )
  return found ? enrichPublication(found, customAuthors) : undefined
}

export function getAllEnrichedCollections(
  customPublications: Publication[] = PUBLICATIONS,
  customAuthors: Author[] = AUTHORS
): EnrichedCollection[] {
  const allPubs = getAllEnrichedPublications(customPublications, customAuthors)
  return COLLECTIONS.map((col) => {
    const publications = allPubs.filter((p) => p.collectionSlug === col.slug)
    return {
      ...col,
      publicationCount: publications.length,
      publications
    }
  })
}

export function getEnrichedCollectionBySlug(
  slug: string,
  customPublications: Publication[] = PUBLICATIONS,
  customAuthors: Author[] = AUTHORS
): EnrichedCollection | undefined {
  return getAllEnrichedCollections(customPublications, customAuthors).find(
    (c) => c.slug === slug
  )
}

export function getAllEnrichedAuthors(
  customPublications: Publication[] = PUBLICATIONS,
  customAuthors: Author[] = AUTHORS
): EnrichedAuthor[] {
  const allPubs = getAllEnrichedPublications(customPublications, customAuthors)
  return customAuthors.map((author) => {
    const publications = allPubs.filter((p) =>
      p.authorSlugs.includes(author.slug)
    )
    return {
      ...author,
      publicationCount: publications.length,
      publications
    }
  })
}

export function getEnrichedAuthorBySlug(
  slug: string,
  customPublications: Publication[] = PUBLICATIONS,
  customAuthors: Author[] = AUTHORS
): EnrichedAuthor | undefined {
  return getAllEnrichedAuthors(customPublications, customAuthors).find(
    (a) => a.slug === slug
  )
}

export function getAvailableYears(
  customPublications: Publication[] = PUBLICATIONS
): number[] {
  const years = Array.from(new Set(customPublications.map((p) => p.year)))
  return years.sort((a, b) => b - a)
}

export function getAvailableDocumentTypes(
  customPublications: Publication[] = PUBLICATIONS
): DocumentType[] {
  const types = Array.from(
    new Set(customPublications.map((p) => p.documentType))
  )
  return types.sort((a, b) => a.localeCompare(b, 'id'))
}

export function getAvailableAngkatan(
  customPublications: Publication[] = PUBLICATIONS
): string[] {
  const angkatanSet = new Set<string>()
  for (const p of customPublications) {
    if (p.metadata.angkatan && p.metadata.angkatan !== '-') {
      angkatanSet.add(String(p.metadata.angkatan))
    }
  }
  return Array.from(angkatanSet).sort((a, b) => Number(b) - Number(a))
}

export const REPOSITORY_STATS: RepositoryStatItem[] = [
  {
    label: 'Total Proyek Perubahan',
    value: '362',
    subtext: 'Terdata pada API ProperExpo LAN',
    isSampleNote: 'ProperExpo LAN'
  },
  {
    label: 'Kategori Tematik',
    value: `${COLLECTIONS.length}`,
    subtext: 'Klaster prioritas pembangunan nasional',
    isSampleNote: 'ProperExpo LAN'
  },
  {
    label: 'Angkatan PKN Tingkat I',
    value: '59 – 67',
    subtext: 'Pelatihan Kepemimpinan Nasional',
    isSampleNote: 'Tahun 2024–2026'
  },
  {
    label: 'Katalog Aktif Termuat',
    value: `${PUBLICATIONS.length}+`,
    subtext: 'Dilengkapi poster, abstrak & tautan video',
    isSampleNote: 'Sinkronisasi API'
  }
]
