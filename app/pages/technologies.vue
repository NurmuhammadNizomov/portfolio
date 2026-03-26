<template>
  <div class="pt-32 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <NuxtLink to="/">{{ $t('home.greeting').split(',')[0] }}</NuxtLink>
        <span class="breadcrumb-sep">&#9658;</span>
        <span>{{ $t('technologies.breadcrumb') }}</span>
      </div>

      <!-- Title -->
      <div ref="titleRef" class="mb-10">
        <h1 class="text-4xl font-bold">
          <span class="title-highlight">{{ $t('technologies.title') }}</span>
        </h1>
      </div>

      <!-- Category filter -->
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

      <!-- Tech grid -->
      <TransitionGroup
        name="tech-grid"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <div v-for="tech in filteredTech" :key="tech.name" class="tech-card">
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden neon-icon-wrap"
            >
              <img
                :src="tech.icon"
                :alt="tech.name"
                class="w-8 h-8 object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h3 class="text-lg font-bold">{{ tech.name }}</h3>
              <span class="neon-badge text-xs">{{ $t(`technologies.cat_${tech.category}`) }}</span>
            </div>
          </div>
          <p class="text-sm leading-relaxed c-muted">{{ $t(tech.descKey) }}</p>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
usePageSeo('seo.technologies_title', 'seo.technologies_desc', '/technologies')

definePageMeta({ layout: 'default' })

const activeFilter = ref('all')

const categories = [
  { key: 'all', labelKey: 'technologies.filter_all' },
  { key: 'frontend', labelKey: 'technologies.filter_frontend' },
  { key: 'backend', labelKey: 'technologies.filter_backend' },
  { key: 'mobile', labelKey: 'technologies.filter_mobile' },
  { key: 'devops', labelKey: 'technologies.filter_devops' },
]

const technologies = [
  // Frontend — simple to advanced
  {
    name: 'HTML',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    descKey: 'technologies.html_desc',
  },
  {
    name: 'CSS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    descKey: 'technologies.css_desc',
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    descKey: 'technologies.js_desc',
  },
  {
    name: 'Sass',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    descKey: 'technologies.sass_desc',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    descKey: 'technologies.ts_desc',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    descKey: 'technologies.tailwind_desc',
  },
  {
    name: 'Webpack',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
    descKey: 'technologies.webpack_desc',
  },
  {
    name: 'Gulp',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gulp/gulp-plain.svg',
    descKey: 'technologies.gulp_desc',
  },
  {
    name: 'Vue.js',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    descKey: 'technologies.vue_desc',
  },
  {
    name: 'React',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    descKey: 'technologies.react_desc',
  },
  {
    name: 'Nuxt.js',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
    descKey: 'technologies.nuxt_desc',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    descKey: 'technologies.next_desc',
  },
  {
    name: 'Vite',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    descKey: 'technologies.vite_desc',
  },
  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    descKey: 'technologies.node_desc',
  },
  {
    name: 'Express.js',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    descKey: 'technologies.express_desc',
  },
  {
    name: 'NestJS',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
    descKey: 'technologies.nest_desc',
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    descKey: 'technologies.pg_desc',
  },
  {
    name: 'MySQL',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    descKey: 'technologies.mysql_desc',
  },
  {
    name: 'MongoDB',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    descKey: 'technologies.mongo_desc',
  },
  {
    name: 'Redis',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    descKey: 'technologies.redis_desc',
  },
  // Mobile
  {
    name: 'React Native',
    category: 'mobile',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    descKey: 'technologies.rn_desc',
  },
  {
    name: 'Ionic',
    category: 'mobile',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',
    descKey: 'technologies.ionic_desc',
  },
  // DevOps & Git
  {
    name: 'Git',
    category: 'devops',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    descKey: 'technologies.git_desc',
  },
  {
    name: 'Docker',
    category: 'devops',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    descKey: 'technologies.docker_desc',
  },
]

const filteredTech = computed(() => {
  if (activeFilter.value === 'all') return technologies
  return technologies.filter((t) => t.category === activeFilter.value)
})

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
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.2 },
    )
  }
})
</script>

<style scoped>
.tech-grid-enter-active,
.tech-grid-leave-active {
  transition: all 0.25s ease;
}
.tech-grid-enter-from,
.tech-grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
