<template>
  <div class="min-h-screen flex flex-col justify-center pt-24 pb-16">
    <div class="max-w-6xl mx-auto px-6 w-full">
      <!-- Hero section -->
      <div class="flex flex-col lg:flex-row items-center justify-between gap-16">
        <!-- Left text -->
        <div class="flex-1 max-w-xl">
          <div
            ref="tagRef"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
            :style="`background:rgba(0,229,204,0.1);border:1px solid var(--border);color:var(--neon);`"
          >
            <span
              class="w-2 h-2 rounded-full animate-pulse"
              :style="`background:var(--neon);`"
            ></span>
            {{ $t('home.badge') }}
          </div>

          <h1 ref="titleRef" class="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {{ $t('home.greeting') }}
            <br />
            <span class="neon-text">{{ $t('home.name') }}</span>
            <br />
            <span :style="`color:var(--text);`">{{ $t('home.role') }}</span>
          </h1>

          <p
            ref="descRef"
            class="text-lg mb-10"
            :style="`color:var(--text-muted);line-height:1.7;`"
          >
            {{ $t('home.description') }}
          </p>

          <div ref="btnsRef" class="flex flex-wrap gap-4">
            <NuxtLink to="/portfolio">
              <button
                class="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
                :style="`background:var(--neon);color:#07090f;box-shadow:0 0 24px var(--neon-glow);`"
              >
                {{ $t('home.btn_portfolio') }}
              </button>
            </NuxtLink>
            <NuxtLink to="/contacts">
              <button class="btn-neon px-8 py-3.5 text-sm font-semibold">
                {{ $t('home.btn_order') }}
              </button>
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div ref="statsRef" class="flex flex-wrap gap-8 mt-14">
            <div class="text-center">
              <div class="text-3xl font-bold neon-text">30+</div>
              <div class="text-sm mt-1" :style="`color:var(--text-muted);`">
                {{ $t('home.stats.projects') }}
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold neon-text">4</div>
              <div class="text-sm mt-1" :style="`color:var(--text-muted);`">
                {{ $t('home.stats.years') }}
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold neon-text">100%</div>
              <div class="text-sm mt-1" :style="`color:var(--text-muted);`">
                {{ $t('home.stats.clients') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right visual -->
        <div ref="avatarRef" class="relative shrink-0">
          <div
            class="w-72 h-72 lg:w-96 lg:h-96 rounded-full relative overflow-hidden"
            :style="`background:linear-gradient(135deg,rgba(0,229,204,0.15) 0%,rgba(124,58,237,0.15) 100%);border:2px solid var(--border);`"
          >
            <div
              class="absolute inset-0 rounded-full animate-ping"
              style="border: 1px solid rgba(0, 229, 204, 0.15); animation-duration: 3s"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-8xl lg:text-9xl font-black neon-text select-none">=N</div>
            </div>
          </div>
          <!-- Floating tech badges -->
          <div
            v-for="badge in floatingBadges"
            :key="badge.name"
            class="absolute px-3 py-1.5 rounded-lg text-sm font-semibold"
            :style="`${badge.pos};background:var(--bg-card);border:1px solid var(--border);color:var(--neon);`"
          >
            {{ badge.name }}
          </div>
        </div>
      </div>

      <!-- Skills row -->
      <div ref="skillsRowRef" class="mt-20 flex flex-wrap gap-3 justify-center">
        <span
          v-for="skill in quickSkills"
          :key="skill"
          class="px-4 py-2 rounded-full text-sm"
          :style="`background:rgba(0,229,204,0.06);border:1px solid var(--border);color:var(--text-muted);`"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

useHead({
  title: () => t('seo.home_title'),
  meta: [
    { name: 'description', content: () => t('seo.home_desc') },
    { property: 'og:title', content: () => t('seo.home_title') },
    { property: 'og:description', content: () => t('seo.home_desc') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => t('seo.home_title') },
    { name: 'twitter:description', content: () => t('seo.home_desc') },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
  ],
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nurmuhammad Nizomov',
        url: siteUrl,
        email: 'nurmuhammadnizomov@gmail.com',
        telephone: '+998940622042',
        jobTitle: 'Full Stack Web Developer',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Fergana',
          addressCountry: 'UZ',
        },
        sameAs: ['https://t.me/nizomov_nurmuhammad'],
        knowsAbout: [
          'Vue.js',
          'React',
          'Node.js',
          'Express.js',
          'MySQL',
          'PostgreSQL',
          'Docker',
          'TypeScript',
        ],
      }),
    },
  ],
})

definePageMeta({ layout: 'default' })

const floatingBadges = [
  { name: 'Nuxt', pos: 'top:10%;right:-20px' },
  { name: 'Tailwind', pos: 'bottom:20%;right:-30px' },
  { name: 'GSAP', pos: 'bottom:10%;left:-20px' },
  { name: 'HTML/CSS', pos: 'top:15%;left:-30px' },
]

const quickSkills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Nuxt.js',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Docker',
]

const tagRef = ref(null)
const titleRef = ref(null)
const descRef = ref(null)
const btnsRef = ref(null)
const statsRef = ref(null)
const avatarRef = ref(null)
const skillsRowRef = ref(null)

onMounted(async () => {
  await nextTick()
  const { gsap } = await import('gsap')
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(tagRef.value, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(titleRef.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .fromTo(descRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .fromTo(btnsRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .fromTo(
      statsRef.value?.children ? Array.from(statsRef.value.children) : [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
      '-=0.2',
    )
    .fromTo(
      avatarRef.value,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      0.3,
    )
    .fromTo(
      skillsRowRef.value?.children ? Array.from(skillsRowRef.value.children) : [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
      '-=0.4',
    )
})
</script>
