<template>
  <div :style="`min-height:100vh;background:var(--bg);color:var(--text);`">
    <!-- Background orbs -->
    <div class="bg-orb-1"></div>
    <div class="bg-orb-2"></div>

    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="scrolled ? 'py-3' : 'py-3 md:py-0'"
    >
      <div
        class="nav-inner transition-all duration-500 flex items-center justify-between"
        :class="
          scrolled
            ? 'max-w-6xl mx-auto rounded-2xl px-6 py-3 nav-scrolled'
            : 'max-w-6xl mx-auto px-6'
        "
      >
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 no-underline" aria-label="Home">
          <div
            class="w-10 h-10 flex items-center justify-center rounded-lg"
            :style="`background:rgba(0,229,204,0.1);border:1px solid var(--border);`"
            aria-hidden="true"
          >
            <span class="neon-text font-bold text-lg">=N</span>
          </div>
        </NuxtLink>

        <!-- Nav links (desktop) -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/portfolio" class="nav-link">{{ $t('nav.portfolio') }}</NuxtLink>
          <NuxtLink to="/about" class="nav-link">{{ $t('nav.about') }}</NuxtLink>
          <NuxtLink to="/technologies" class="nav-link">{{ $t('nav.technologies') }}</NuxtLink>
          <NuxtLink to="/contacts" class="nav-link">{{ $t('nav.contacts') }}</NuxtLink>
        </nav>

        <!-- Right side: lang + theme + socials -->
        <div class="flex items-center gap-3">
          <!-- Language switcher -->
          <div ref="langMenuRef" class="relative">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all"
              :style="`border:1px solid var(--border);color:var(--text-muted);background:transparent;cursor:pointer;`"
              :aria-label="`Language: ${currentLocaleLabel}`"
              :aria-expanded="langOpen"
              @click="langOpen = !langOpen"
            >
              <span>{{ currentLocaleLabel }}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                :style="`transform:rotate(${langOpen ? 180 : 0}deg);transition:transform 0.2s`"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            <Transition name="dropdown">
              <div
                v-if="langOpen"
                class="absolute right-0 top-full mt-2 rounded-xl overflow-hidden"
                :style="`background:var(--bg-card);border:1px solid var(--border);min-width:130px;box-shadow:0 8px 24px rgba(0,0,0,0.2);z-index:100;`"
              >
                <button
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  class="w-full text-left px-4 py-2.5 text-sm transition-all block"
                  :style="`color:${locale === loc.code ? 'var(--neon)' : 'var(--text-muted)'};background:${locale === loc.code ? 'rgba(0,229,204,0.08)' : 'transparent'};border:none;cursor:pointer;`"
                  @click="setLang(loc.code)"
                >
                  {{ loc.name }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Color mode toggle (ClientOnly to avoid SSR hydration mismatch) -->
          <ClientOnly>
            <button
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              :style="`border:1px solid var(--border);background:transparent;cursor:pointer;color:var(--neon);`"
              :aria-label="
                colorMode.value !== 'light' ? 'Switch to light mode' : 'Switch to dark mode'
              "
              @click="toggleColorMode"
            >
              <svg
                v-if="colorMode.value !== 'light'"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <template #fallback>
              <div class="w-9 h-9 rounded-full" :style="`border:1px solid var(--border);`"></div>
            </template>
          </ClientOnly>

          <!-- Social icons -->
          <a
            href="https://t.me/nizomov_nurmuhammad"
            target="_blank"
            rel="noopener"
            class="social-icon"
            title="Telegram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.238l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.321z"
              />
            </svg>
          </a>
          <a href="mailto:nurmuhammadnizomov@gmail.com" class="social-icon" title="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
          </a>

          <!-- Mobile burger -->
          <button
            class="md:hidden flex flex-col gap-1.5 p-2 ml-1"
            @click="mobileOpen = !mobileOpen"
          >
            <span class="block w-5 h-0.5" :style="`background:var(--neon);`"></span>
            <span class="block w-5 h-0.5" :style="`background:var(--neon);`"></span>
            <span class="block w-5 h-0.5" :style="`background:var(--neon);`"></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div
          v-if="mobileOpen"
          class="md:hidden max-w-5xl mx-auto mt-2 rounded-2xl px-6 py-5 flex flex-col gap-4"
          :style="`background:var(--bg-nav);backdrop-filter:blur(16px);border:1px solid var(--border);`"
        >
          <NuxtLink to="/portfolio" class="nav-link" @click="mobileOpen = false">{{
            $t('nav.portfolio')
          }}</NuxtLink>
          <NuxtLink to="/about" class="nav-link" @click="mobileOpen = false">{{
            $t('nav.about')
          }}</NuxtLink>
          <NuxtLink to="/technologies" class="nav-link" @click="mobileOpen = false">{{
            $t('nav.technologies')
          }}</NuxtLink>
          <NuxtLink to="/contacts" class="nav-link" @click="mobileOpen = false">{{
            $t('nav.contacts')
          }}</NuxtLink>
        </div>
      </Transition>
    </header>

    <!-- Page content -->
    <main class="relative z-10">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative z-10" :style="`border-top:1px solid var(--border);`">
      <div class="max-w-6xl mx-auto px-6 py-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            class="w-10 h-10 flex items-center justify-center rounded-lg"
            :style="`background:rgba(0,229,204,0.1);border:1px solid var(--border);`"
          >
            <span class="neon-text font-bold text-lg">=N</span>
          </div>
          <nav class="flex flex-wrap justify-center gap-6">
            <NuxtLink to="/portfolio" class="nav-link text-sm">{{ $t('nav.portfolio') }}</NuxtLink>
            <NuxtLink to="/about" class="nav-link text-sm">{{ $t('nav.about') }}</NuxtLink>
            <NuxtLink to="/technologies" class="nav-link text-sm">{{
              $t('nav.technologies')
            }}</NuxtLink>
            <NuxtLink to="/contacts" class="nav-link text-sm">{{ $t('nav.contacts') }}</NuxtLink>
          </nav>
          <div class="flex items-center gap-2">
            <a
              href="https://t.me/nizomov_nurmuhammad"
              target="_blank"
              rel="noopener"
              class="social-icon"
              style="width: 32px; height: 32px; font-size: 13px"
              aria-label="Telegram"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.238l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.321z"
                />
              </svg>
            </a>
            <a
              href="mailto:nurmuhammadnizomov@gmail.com"
              class="social-icon"
              style="width: 32px; height: 32px"
              aria-label="Email"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="mt-8 pt-6 text-center" :style="`border-top:1px solid rgba(255,255,255,0.06);`">
          <p style="font-size: 14px" :style="`color:var(--text-muted);`">
            {{ $t('footer.copyright') }}
          </p>
        </div>
      </div>
      <div
        style="
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon), transparent);
        "
      ></div>
    </footer>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const langMenuRef = ref(null)

const availableLocales = computed(() => locales.value)
const currentLocaleLabel = computed(() => {
  const found = locales.value.find((l) => l.code === locale.value)
  return found?.name ?? locale.value.toUpperCase()
})

function setLang(code) {
  setLocale(code)
  langOpen.value = false
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 60
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  const onClickOutside = (e) => {
    if (langMenuRef.value && !langMenuRef.value.contains(e.target)) {
      langOpen.value = false
    }
  }
  document.addEventListener('click', onClickOutside)

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClickOutside)
  })
})
</script>

<style scoped>
@media (max-width: 767px) {
  .nav-inner.nav-scrolled {
    border-radius: 0;
    margin: 0;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
