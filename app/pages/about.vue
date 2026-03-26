<template>
  <div class="pt-32 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <NuxtLink to="/">{{ $t('home.greeting').split(',')[0] }}</NuxtLink>
        <span class="breadcrumb-sep">&#9658;</span>
        <span>{{ $t('about.breadcrumb') }}</span>
      </div>

      <!-- Title -->
      <div ref="titleRef" class="mb-14">
        <h1 class="text-4xl font-bold">
          <span class="title-highlight">{{ $t('about.title') }}</span>
        </h1>
      </div>

      <!-- Main content -->
      <div ref="contentRef" class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Left -->
        <div>
          <h2 class="text-3xl font-bold mb-6 leading-tight">
            {{ $t('about.heading') }}
            <span class="neon-text"> {{ $t('about.heading_accent') }}</span>
            <br />{{ $t('about.heading_end') }}
          </h2>
          <p class="text-base leading-relaxed mb-6 c-muted">{{ $t('about.bio1') }}</p>
          <p class="text-base leading-relaxed mb-8 c-muted">{{ $t('about.bio2') }}</p>

          <!-- Values -->
          <div class="space-y-4">
            <div v-for="value in values" :key="value.titleKey" class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 neon-icon-wrap"
              >
                <span class="text-sm">{{ value.icon }}</span>
              </div>
              <div>
                <h4 class="font-semibold mb-1 c-high">{{ $t(value.titleKey) }}</h4>
                <p class="text-sm c-muted">{{ $t(value.descKey) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right -->
        <div class="space-y-6">
          <!-- Stats cards -->
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="stat in stats"
              :key="stat.labelKey"
              class="card rounded-2xl p-6 text-center"
            >
              <div class="text-3xl font-black neon-text mb-2">{{ stat.value }}</div>
              <div class="text-sm c-muted">{{ $t(stat.labelKey) }}</div>
            </div>
          </div>

          <!-- Experience timeline -->
          <div class="card rounded-2xl p-6">
            <h3 class="font-bold mb-5 text-lg">{{ $t('about.experience_title') }}</h3>
            <div class="space-y-5">
              <div v-for="(exp, idx) in experience" :key="exp.yearKey" class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div
                    class="w-3 h-3 rounded-full shrink-0 mt-1"
                    style="background: var(--neon); box-shadow: 0 0 8px var(--neon-glow)"
                  ></div>
                  <div
                    v-if="idx < experience.length - 1"
                    class="w-px flex-1 mt-2"
                    style="background: var(--timeline-line)"
                  ></div>
                </div>
                <div class="pb-4">
                  <span class="neon-badge mb-2">{{ $t(exp.yearKey) }}</span>
                  <h4 class="font-semibold text-sm c-high mt-1">{{ $t(exp.titleKey) }}</h4>
                  <p class="text-xs mt-1 c-dim">{{ $t(exp.descKey) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Services section -->
      <div ref="servicesRef" class="mt-20">
        <h2 class="text-2xl font-bold mb-8">{{ $t('about.services_title') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="service in services"
            :key="service.titleKey"
            class="card rounded-2xl p-6 cursor-default"
            style="
              transition:
                border-color 0.3s,
                box-shadow 0.3s,
                transform 0.3s;
            "
            @mouseenter="
              (e) => {
                e.currentTarget.style.borderColor = 'rgba(0,229,204,0.35)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }
            "
            @mouseleave="
              (e) => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.transform = ''
              }
            "
          >
            <div class="text-3xl mb-4">{{ service.icon }}</div>
            <h3 class="font-bold text-lg mb-2">{{ $t(service.titleKey) }}</h3>
            <p class="text-sm leading-relaxed c-muted">{{ $t(service.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
usePageSeo('seo.about_title', 'seo.about_desc', '/about')

definePageMeta({ layout: 'default' })

const values = [
  { icon: '⚡', titleKey: 'about.values.speed', descKey: 'about.values.speed_desc' },
  { icon: '💎', titleKey: 'about.values.quality', descKey: 'about.values.quality_desc' },
  { icon: '🔧', titleKey: 'about.values.support', descKey: 'about.values.support_desc' },
]

const stats = [
  { value: '30+', labelKey: 'about.stats.projects' },
  { value: '4+', labelKey: 'about.stats.years' },
  { value: '100%', labelKey: 'about.stats.clients' },
  { value: '15+', labelKey: 'about.stats.technologies' },
]

const experience = [
  { yearKey: 'about.exp0_year', titleKey: 'about.exp0_title', descKey: 'about.exp0_desc' },
  { yearKey: 'about.exp1_year', titleKey: 'about.exp1_title', descKey: 'about.exp1_desc' },
  { yearKey: 'about.exp2_year', titleKey: 'about.exp2_title', descKey: 'about.exp2_desc' },
]

const services = [
  { icon: '🏢', titleKey: 'about.svc0_title', descKey: 'about.svc0_desc' },
  { icon: '🛒', titleKey: 'about.svc1_title', descKey: 'about.svc1_desc' },
  { icon: '🚀', titleKey: 'about.svc2_title', descKey: 'about.svc2_desc' },
  { icon: '📋', titleKey: 'about.svc3_title', descKey: 'about.svc3_desc' },
  { icon: '⚡', titleKey: 'about.svc4_title', descKey: 'about.svc4_desc' },
  { icon: '🎨', titleKey: 'about.svc5_title', descKey: 'about.svc5_desc' },
]

const titleRef = ref(null)
const contentRef = ref(null)
const servicesRef = ref(null)

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
  if (contentRef.value) {
    gsap.fromTo(
      contentRef.value,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 },
    )
  }
  const cards = servicesRef.value?.children ? Array.from(servicesRef.value.children) : []
  if (cards.length) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.4 },
    )
  }
})
</script>
