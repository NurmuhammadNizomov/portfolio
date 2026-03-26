<template>
  <div class="pt-32 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <NuxtLink to="/">{{ $t('home.greeting').split(',')[0] }}</NuxtLink>
        <span class="breadcrumb-sep">&#9658;</span>
        <span>{{ $t('portfolio.breadcrumb') }}</span>
      </div>

      <!-- Title -->
      <div ref="titleRef" class="mb-12">
        <h1 class="text-4xl font-bold">
          <span class="title-highlight">{{ $t('portfolio.title') }}</span>
        </h1>
      </div>

      <!-- Filters -->
      <div ref="filtersRef" class="flex flex-wrap gap-3 mb-12">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="filter-btn"
          :class="{ active: activeFilter === cat.key }"
          @click="activeFilter = cat.key"
        >
          {{ $t(cat.labelKey) }}
        </button>
      </div>

      <!-- Projects grid -->
      <TransitionGroup
        name="grid"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="portfolio-card rounded-2xl overflow-hidden cursor-pointer group"
          @click="openProject(project)"
        >
          <!-- Card header -->
          <div class="px-5 py-4" style="border-bottom: 1px solid var(--border-card)">
            <span class="c-muted" style="font-size: 14px"
              >{{ $t(project.typeKey) }} | {{ project.title }}</span
            >
          </div>

          <!-- Preview area -->
          <div class="relative overflow-hidden" style="height: 220px">
            <div
              class="w-full h-full flex items-center justify-center relative"
              :style="`background:${project.bg};`"
            >
              <div class="absolute top-3 left-3 flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full opacity-40" style="background: #fff"></div>
                <div class="w-2.5 h-2.5 rounded-full opacity-40" style="background: #fff"></div>
                <div class="w-2.5 h-2.5 rounded-full opacity-40" style="background: #fff"></div>
              </div>
              <div class="text-center px-4">
                <div class="text-5xl mb-3">{{ project.emoji }}</div>
                <div class="font-bold text-lg text-white">{{ project.title }}</div>
                <div class="text-sm mt-1 opacity-60 text-white">{{ $t(project.descKey) }}</div>
              </div>
            </div>
            <!-- Hover overlay -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              style="background: rgba(0, 229, 204, 0.12); backdrop-filter: blur(4px)"
            >
              <button
                class="px-6 py-2.5 rounded-full font-semibold text-sm"
                :style="`background:var(--neon);color:#07090f;`"
              >
                {{ $t('portfolio.view_project') }}
              </button>
            </div>
          </div>

          <!-- Tags -->
          <div class="px-5 py-3 flex gap-2 flex-wrap">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs px-2.5 py-1 rounded-full"
              :style="`background:rgba(0,229,204,0.08);color:var(--neon);border:1px solid var(--border);`"
              >{{ tag }}</span
            >
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-6"
        style="background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px)"
        @click.self="selectedProject = null"
      >
        <div
          class="card rounded-2xl p-8 max-w-lg w-full"
          style="border-color: rgba(0, 229, 204, 0.25)"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="c-neon" style="font-size: 13px">{{ $t(selectedProject.typeKey) }}</p>
              <h3 class="text-2xl font-bold mt-1">{{ selectedProject.title }}</h3>
            </div>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center c-muted"
              style="background: rgba(128, 128, 128, 0.1); border: none; cursor: pointer"
              @click="selectedProject = null"
            >
              ✕
            </button>
          </div>
          <p class="mb-6 c-muted" style="line-height: 1.7">{{ $t(selectedProject.fullKey) }}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in selectedProject.tags"
              :key="tag"
              class="text-xs px-3 py-1.5 rounded-full"
              :style="`background:rgba(0,229,204,0.08);color:var(--neon);border:1px solid var(--border);`"
              >{{ tag }}</span
            >
          </div>
          <button class="btn-neon w-full text-center">{{ $t('portfolio.view_site') }}</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
usePageSeo('seo.portfolio_title', 'seo.portfolio_desc', '/portfolio')

definePageMeta({ layout: 'default' })

const activeFilter = ref('all')
const selectedProject = ref(null)

const categories = [
  { key: 'all', labelKey: 'portfolio.filter_all' },
  { key: 'landing', labelKey: 'portfolio.filter_landing' },
  { key: 'shop', labelKey: 'portfolio.filter_shop' },
  { key: 'dashboard', labelKey: 'portfolio.filter_dashboard' },
  { key: 'mobile', labelKey: 'portfolio.filter_mobile' },
  { key: 'website', labelKey: 'portfolio.filter_website' },
]

const projects = [
  {
    id: 1,
    typeKey: 'portfolio.type_website',
    title: 'Aura sphere',
    category: 'website',
    emoji: '🌐',
    bg: 'linear-gradient(135deg,#1a0533,#2d1b69)',
    descKey: 'portfolio.p1_desc',
    fullKey: 'portfolio.p1_full',
    tags: ['Vue.js', 'Nuxt', 'GSAP'],
  },
  {
    id: 2,
    typeKey: 'portfolio.type_website',
    title: 'Eagletrans',
    category: 'website',
    emoji: '🚚',
    bg: 'linear-gradient(135deg,#1a2a1a,#2d4a2d)',
    descKey: 'portfolio.p2_desc',
    fullKey: 'portfolio.p2_full',
    tags: ['HTML', 'CSS', 'JS'],
  },
  {
    id: 3,
    typeKey: 'portfolio.type_shop',
    title: 'Stefanel',
    category: 'shop',
    emoji: '👗',
    bg: 'linear-gradient(135deg,#1a1a1a,#2a2a2a)',
    descKey: 'portfolio.p3_desc',
    fullKey: 'portfolio.p3_full',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 4,
    typeKey: 'portfolio.type_landing',
    title: 'CryptoVault',
    category: 'landing',
    emoji: '💎',
    bg: 'linear-gradient(135deg,#0d1a3a,#1a2d5a)',
    descKey: 'portfolio.p4_desc',
    fullKey: 'portfolio.p4_full',
    tags: ['HTML', 'CSS', 'GSAP'],
  },
  {
    id: 5,
    typeKey: 'portfolio.type_shop',
    title: 'AutoParts Pro',
    category: 'shop',
    emoji: '🔧',
    bg: 'linear-gradient(135deg,#1a1208,#2d2010)',
    descKey: 'portfolio.p5_desc',
    fullKey: 'portfolio.p5_full',
    tags: ['Vue.js', 'Tailwind', 'API'],
  },
  {
    id: 6,
    typeKey: 'portfolio.type_website',
    title: 'MedClinic',
    category: 'website',
    emoji: '🏥',
    bg: 'linear-gradient(135deg,#0a1a2a,#1a3a4a)',
    descKey: 'portfolio.p6_desc',
    fullKey: 'portfolio.p6_full',
    tags: ['Nuxt', 'Tailwind', 'Node.js'],
  },
  {
    id: 7,
    typeKey: 'portfolio.type_landing',
    title: 'FitLife',
    category: 'landing',
    emoji: '💪',
    bg: 'linear-gradient(135deg,#1a0a0a,#3a1a1a)',
    descKey: 'portfolio.p7_desc',
    fullKey: 'portfolio.p7_full',
    tags: ['Nuxt', 'Tailwind', 'GSAP'],
  },
  {
    id: 8,
    typeKey: 'portfolio.type_shop',
    title: 'TechStore',
    category: 'shop',
    emoji: '💻',
    bg: 'linear-gradient(135deg,#0d0d1a,#1a1a3a)',
    descKey: 'portfolio.p8_desc',
    fullKey: 'portfolio.p8_full',
    tags: ['Vue.js', 'Pinia', 'API'],
  },
  {
    id: 9,
    typeKey: 'portfolio.type_dashboard',
    title: 'AdminFlow',
    category: 'dashboard',
    emoji: '📊',
    bg: 'linear-gradient(135deg,#0d1a0d,#1a3a1a)',
    descKey: 'portfolio.p9_desc',
    fullKey: 'portfolio.p9_full',
    tags: ['Vue.js', 'Chart.js', 'API'],
  },
  {
    id: 10,
    typeKey: 'portfolio.type_mobile',
    title: 'DeliverApp',
    category: 'mobile',
    emoji: '📱',
    bg: 'linear-gradient(135deg,#1a0d1a,#3a1a3a)',
    descKey: 'portfolio.p10_desc',
    fullKey: 'portfolio.p10_full',
    tags: ['React Native', 'TypeScript', 'Redux'],
  },
  {
    id: 11,
    typeKey: 'portfolio.type_landing',
    title: 'SaaS Pro',
    category: 'landing',
    emoji: '🚀',
    bg: 'linear-gradient(135deg,#0a0a1a,#1a1a3a)',
    descKey: 'portfolio.p11_desc',
    fullKey: 'portfolio.p11_full',
    tags: ['Nuxt', 'GSAP', 'Tailwind'],
  },
  {
    id: 12,
    typeKey: 'portfolio.type_mobile',
    title: 'HealthTrack',
    category: 'mobile',
    emoji: '🏃',
    bg: 'linear-gradient(135deg,#0a1a0a,#1a3a1a)',
    descKey: 'portfolio.p12_desc',
    fullKey: 'portfolio.p12_full',
    tags: ['Ionic', 'Vue.js', 'Capacitor'],
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((p) => p.category === activeFilter.value)
})

function openProject(project) {
  selectedProject.value = project
}

const titleRef = ref(null)
const filtersRef = ref(null)

onMounted(async () => {
  await nextTick()
  const { gsap } = await import('gsap')
  if (titleRef.value) {
    gsap.fromTo(
      titleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    )
  }
  const btns = filtersRef.value ? Array.from(filtersRef.value.children) : []
  if (btns.length) {
    gsap.fromTo(
      btns,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.2 },
    )
  }
})
</script>

<style scoped>
.grid-enter-active,
.grid-leave-active {
  transition: all 0.25s ease;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
