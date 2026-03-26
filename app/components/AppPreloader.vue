<template>
  <Transition name="preloader">
    <div v-if="visible" class="preloader-wrap">
      <div class="preloader-content">
        <!-- Battery shell -->
        <div class="battery-shell">
          <div class="battery-nub"></div>
          <div class="battery-body">
            <div class="battery-fill" :style="`width:${progress}%`"></div>
            <div class="battery-segments">
              <div v-for="i in 4" :key="i" class="battery-seg"></div>
            </div>
          </div>
        </div>

        <!-- Percentage -->
        <div class="battery-pct">{{ progress }}<span>%</span></div>

        <!-- Label -->
        <div class="battery-label">Loading...</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const visible = ref(true)
const progress = ref(0)

onMounted(() => {
  let current = 0
  const target = 100
  const duration = 1800
  const steps = 60
  const increment = target / steps
  const interval = duration / steps

  const timer = setInterval(() => {
    current = Math.min(current + increment + Math.random() * 2, target)
    progress.value = Math.floor(current)
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(timer)
      setTimeout(() => {
        visible.value = false
      }, 400)
    }
  }, interval)
})
</script>

<style scoped>
.preloader-wrap {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #07090f;
}

html.light .preloader-wrap {
  background: #f0f5fa;
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* ── Battery ── */
.battery-shell {
  display: flex;
  align-items: center;
  gap: 0;
  filter: drop-shadow(0 0 16px rgba(0, 229, 204, 0.5));
}

.battery-body {
  width: 160px;
  height: 72px;
  border: 2px solid #00e5cc;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background: rgba(0, 229, 204, 0.04);
}

.battery-nub {
  width: 10px;
  height: 30px;
  background: #00e5cc;
  border-radius: 0 4px 4px 0;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(0, 229, 204, 0.6);
}

.battery-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0, 229, 204, 0.3) 0%, #00e5cc 100%);
  transition: width 0.05s linear;
  border-radius: 8px 0 0 8px;
  box-shadow:
    inset 0 0 20px rgba(0, 229, 204, 0.2),
    4px 0 20px rgba(0, 229, 204, 0.4);
}

.battery-segments {
  position: absolute;
  inset: 0;
  display: flex;
  pointer-events: none;
}

.battery-seg {
  flex: 1;
  border-right: 1px solid rgba(0, 229, 204, 0.15);
}
.battery-seg:last-child {
  border-right: none;
}

/* ── Text ── */
.battery-pct {
  font-size: 48px;
  font-weight: 900;
  color: #00e5cc;
  text-shadow: 0 0 20px rgba(0, 229, 204, 0.6);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.battery-pct span {
  font-size: 24px;
  font-weight: 700;
  opacity: 0.8;
}

.battery-label {
  font-size: 13px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(0, 229, 204, 0.55);
}

/* ── Transition ── */
.preloader-enter-active,
.preloader-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.preloader-enter-from,
.preloader-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
