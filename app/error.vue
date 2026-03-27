<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    :style="`background:var(--bg);color:var(--text);`"
  >
    <!-- Background orbs -->
    <div class="bg-orb-1"></div>
    <div class="bg-orb-2"></div>

    <div ref="containerRef" class="relative z-10 text-center max-w-lg w-full">
      <!-- Glitch 404 -->
      <div class="relative mb-6 select-none">
        <div class="text-[10rem] font-black leading-none neon-text glitch" data-text="404">404</div>
      </div>

      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
        :style="`background:rgba(0,229,204,0.1);border:1px solid var(--border);color:var(--neon);`"
      >
        <span class="w-2 h-2 rounded-full" :style="`background:var(--neon);`"></span>
        Page not found
      </div>

      <h1 class="text-3xl font-bold mb-4" :style="`color:var(--text-high);`">
        Oops! This page doesn't exist
      </h1>
      <p class="mb-10 text-base" :style="`color:var(--text-muted);line-height:1.7;`">
        The page you're looking for has been moved, deleted, or never existed in the first place.
      </p>

      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink
          to="/"
          class="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center gap-2 no-underline"
          :style="`background:var(--neon);color:#07090f;box-shadow:0 0 24px var(--neon-glow);`"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          Go Home
        </NuxtLink>
        <button class="btn-neon px-8 py-3.5 text-sm font-semibold" @click="handleError">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    default: null,
  },
})

const containerRef = ref(null)

function handleError() {
  clearError({ redirect: '/' })
}

onMounted(async () => {
  await nextTick()
  const { gsap } = await import('gsap')
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(containerRef.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 })
})
</script>

<style scoped>
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: var(--neon);
  text-shadow:
    0 0 10px var(--neon-glow),
    0 0 20px var(--neon-glow);
}
.glitch::before {
  animation: glitch-1 3s infinite;
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  color: #ff00cc;
  text-shadow: none;
  opacity: 0.7;
}
.glitch::after {
  animation: glitch-2 3s infinite;
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  color: #00ccff;
  text-shadow: none;
  opacity: 0.7;
}
@keyframes glitch-1 {
  0%,
  90%,
  100% {
    transform: translate(0);
  }
  92% {
    transform: translate(-4px, 1px);
  }
  94% {
    transform: translate(4px, -1px);
  }
  96% {
    transform: translate(-2px, 2px);
  }
}
@keyframes glitch-2 {
  0%,
  90%,
  100% {
    transform: translate(0);
  }
  92% {
    transform: translate(4px, -1px);
  }
  94% {
    transform: translate(-4px, 1px);
  }
  96% {
    transform: translate(2px, -2px);
  }
}
</style>
