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
      <div ref="titleRef" class="mb-10">
        <h1 class="text-4xl font-bold">
          <span class="title-highlight">{{ $t('portfolio.title') }}</span>
        </h1>
      </div>

      <!-- Projects grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
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
          <div class="relative overflow-hidden" style="height: 220px; background: #0d1117">
            <iframe
              v-if="project.liveUrl"
              :src="project.liveUrl"
              scrolling="no"
              class="absolute top-0 left-0 border-0"
              style="
                width: 1280px;
                height: 800px;
                transform: scale(0.296);
                transform-origin: top left;
                pointer-events: none;
              "
              loading="lazy"
            />
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
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-9999 flex items-center justify-center p-6"
          style="background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px)"
          @click.self="selectedProject = null"
        >
          <div
            class="card rounded-2xl overflow-hidden max-w-2xl w-full"
            style="border-color: rgba(0, 229, 204, 0.25)"
          >
            <!-- iframe preview -->
            <div
              v-if="selectedProject.liveUrl"
              class="relative w-full"
              style="height: 340px; background: #0d1117"
            >
              <iframe
                :src="selectedProject.liveUrl"
                scrolling="no"
                class="absolute top-0 left-0 border-0"
                style="
                  width: 1280px;
                  height: 800px;
                  transform: scale(0.525);
                  transform-origin: top left;
                "
                loading="lazy"
              />
            </div>
            <!-- fallback emoji preview -->
            <div
              v-else
              class="w-full flex items-center justify-center"
              :style="`height:180px;background:${selectedProject.bg}`"
            >
              <div class="text-center">
                <div class="text-6xl mb-2">{{ selectedProject.emoji }}</div>
                <div class="font-bold text-white">{{ selectedProject.title }}</div>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
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
              <p class="mb-4 c-muted" style="line-height: 1.7">{{ $t(selectedProject.fullKey) }}</p>
              <div class="flex flex-wrap gap-2 mb-5">
                <span
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  class="text-xs px-3 py-1.5 rounded-full"
                  :style="`background:rgba(0,229,204,0.08);color:var(--neon);border:1px solid var(--border);`"
                  >{{ tag }}</span
                >
              </div>
              <div class="flex gap-3">
                <a
                  v-if="selectedProject.liveUrl"
                  :href="selectedProject.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-neon flex-1 text-center"
                  >{{ $t('portfolio.view_site') }}</a
                >
                <a
                  v-if="selectedProject.githubUrl"
                  :href="selectedProject.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-neon flex-1 text-center"
                  style="background: transparent; color: var(--neon)"
                  >GitHub →</a
                >
                <button
                  v-if="!selectedProject.liveUrl && !selectedProject.githubUrl"
                  class="btn-neon w-full text-center"
                >
                  {{ $t('portfolio.view_site') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
usePageSeo('seo.portfolio_title', 'seo.portfolio_desc', '/portfolio')

definePageMeta({ layout: 'default' })

const selectedProject = ref(null)

const projects = [
  {
    id: 1,
    typeKey: 'portfolio.type_dashboard',
    title: 'Task Manager',
    category: 'dashboard',
    emoji: '✅',
    bg: 'linear-gradient(135deg,#0d1a2d,#1a3a5a)',
    descKey: 'portfolio.p13_desc',
    fullKey: 'portfolio.p13_full',
    tags: ['Nuxt 4', 'MongoDB', 'JWT', 'Tailwind'],
    liveUrl: 'https://task-manager-nuxt.netlify.app',
    githubUrl: 'https://github.com/NurmuhammadNizomov/task-manager',
  },
]

function openProject(project) {
  selectedProject.value = project
}

const titleRef = ref(null)

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
