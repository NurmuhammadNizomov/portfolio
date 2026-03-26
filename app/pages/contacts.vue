<template>
  <div class="pt-32 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <NuxtLink to="/">{{ $t('home.greeting').split(',')[0] }}</NuxtLink>
        <span class="breadcrumb-sep">&#9658;</span>
        <span>{{ $t('contacts.breadcrumb') }}</span>
      </div>

      <!-- Title -->
      <div ref="titleRef" class="mb-14">
        <h1 class="text-4xl font-bold">
          <span class="title-highlight">{{ $t('contacts.title') }}</span>
        </h1>
      </div>

      <!-- Running text banner -->
      <div class="overflow-hidden mb-16 rounded-xl py-4 card-soft">
        <div class="flex gap-8 animate-marquee whitespace-nowrap">
          <span v-for="n in 8" :key="n" class="text-sm font-medium c-neon">
            {{ $t('contacts.title') }} ↗ &nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <!-- Content -->
      <div ref="formRef" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Form -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-semibold text-center mb-10 c-high">
            {{ $t('contacts.form_title') }}
          </h2>

          <form class="space-y-8" @submit.prevent="submitForm">
            <!-- Honeypot: hidden from real users, bots fill it in -->
            <div
              aria-hidden="true"
              style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden"
            >
              <label for="f-website">Website</label>
              <input
                id="f-website"
                v-model="form.website"
                type="text"
                name="website"
                autocomplete="off"
                tabindex="-1"
              />
            </div>
            <!-- Row 1 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="f-name" class="form-label"
                  >{{ $t('contacts.name') }} <span class="req">*</span></label
                >
                <input
                  id="f-name"
                  v-model="form.name"
                  class="form-input"
                  placeholder="Nurmuhammad"
                  type="text"
                  required
                />
              </div>
              <div>
                <label for="f-email" class="form-label"
                  >{{ $t('contacts.email') }} <span class="req">*</span></label
                >
                <input
                  id="f-email"
                  v-model="form.email"
                  class="form-input"
                  placeholder="mail@example.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <!-- Row 2 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="f-budget" class="form-label"
                  >{{ $t('contacts.budget') }} <span class="req">*</span></label
                >
                <input
                  id="f-budget"
                  v-model="form.budget"
                  class="form-input"
                  placeholder="50 000"
                  type="text"
                  required
                />
              </div>
              <div class="relative">
                <label for="f-site-type" class="form-label"
                  >{{ $t('contacts.site_type') }} <span class="req">*</span></label
                >
                <div class="relative">
                  <select id="f-site-type" v-model="form.siteType" class="form-select" required>
                    <option value="" disabled>{{ $t('contacts.site_type_placeholder') }}</option>
                    <option value="landing">{{ $t('portfolio.filter_landing') }}</option>
                    <option value="shop">{{ $t('portfolio.filter_shop') }}</option>
                    <option value="website">{{ $t('portfolio.filter_website') }}</option>
                    <option value="dashboard">{{ $t('portfolio.filter_dashboard') }}</option>
                    <option value="mobile">{{ $t('portfolio.filter_mobile') }}</option>
                  </select>
                  <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none c-neon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 3 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label block mb-3">{{ $t('contacts.deadline') }}</label>
                <div class="flex gap-6">
                  <label class="radio-item">
                    <input v-model="form.urgent" type="radio" value="urgent" />
                    {{ $t('contacts.deadline_urgent') }}
                  </label>
                  <label class="radio-item">
                    <input v-model="form.urgent" type="radio" value="noturgent" />
                    {{ $t('contacts.deadline_noturgent') }}
                  </label>
                </div>
              </div>
              <div>
                <label class="form-label block mb-3">{{ $t('contacts.has_tz') }}</label>
                <div class="flex gap-6">
                  <label class="radio-item">
                    <input v-model="form.hasTz" type="radio" value="yes" />
                    {{ $t('contacts.has_tz_yes') }}
                  </label>
                  <label class="radio-item">
                    <input v-model="form.hasTz" type="radio" value="no" />
                    {{ $t('contacts.has_tz_no') }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label for="f-desc" class="form-label">{{ $t('contacts.description') }}</label>
              <textarea
                id="f-desc"
                v-model="form.description"
                class="form-textarea"
                :placeholder="$t('contacts.description_placeholder')"
              ></textarea>
            </div>

            <!-- Submit -->
            <div class="text-center pt-4">
              <p v-if="submitError" class="text-sm mb-4" style="color: #ff5555">
                {{ $t(submitError) }}
              </p>
              <button
                type="submit"
                :disabled="submitting"
                class="text-sm font-semibold tracking-widest uppercase transition-all duration-200 c-neon"
                style="
                  background: transparent;
                  border: none;
                  border-bottom: 2px solid var(--neon);
                  padding: 8px 32px;
                  cursor: pointer;
                  letter-spacing: 3px;
                "
              >
                {{ submitting ? '...' : $t('contacts.submit') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-8">
          <div>
            <p class="text-center mb-2 c-neon" style="font-size: 15px">
              {{ $t('contacts.contact_title') }}
            </p>
            <p class="text-center text-sm mb-8 c-muted">{{ $t('contacts.contact_subtitle') }}</p>

            <!-- Social icons -->
            <div class="flex justify-center gap-4 mb-10">
              <a
                href="https://t.me/nizomov_nurmuhammad"
                target="_blank"
                rel="noopener"
                class="social-icon"
                title="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.238l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.321z"
                  />
                </svg>
              </a>
              <a href="mailto:nurmuhammadnizomov@gmail.com" class="social-icon" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
            </div>

            <a
              href="https://t.me/nizomov_nurmuhammad"
              target="_blank"
              rel="noopener"
              class="btn-neon w-full text-center font-semibold block"
            >
              {{ $t('contacts.discuss_tg') }}
            </a>
          </div>

          <!-- Quick info cards -->
          <div class="space-y-3">
            <div
              v-for="info in contactInfo"
              :key="info.labelKey"
              class="card-soft flex items-center gap-4 p-4 rounded-xl"
            >
              <div class="text-2xl">{{ info.icon }}</div>
              <div>
                <div class="text-xs mb-0.5 c-dim">{{ $t(info.labelKey) }}</div>
                <div class="text-sm font-medium c-high">{{ $t(info.valueKey) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success modal -->
    <Transition name="modal">
      <div
        v-if="submitted"
        class="fixed inset-0 z-50 flex items-center justify-center p-6"
        style="background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px)"
      >
        <div
          class="card rounded-2xl p-10 max-w-sm w-full text-center"
          style="border-color: rgba(0, 229, 204, 0.3)"
        >
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-2xl font-bold mb-3">{{ $t('contacts.success_title') }}</h3>
          <p class="mb-6 c-muted">{{ $t('contacts.success_desc') }}</p>
          <button class="btn-neon px-8 py-3" @click="submitted = false">
            {{ $t('contacts.close') }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
usePageSeo('seo.contacts_title', 'seo.contacts_desc', '/contacts')

definePageMeta({ layout: 'default' })

const form = reactive({
  name: '',
  email: '',
  budget: '',
  siteType: '',
  urgent: 'urgent',
  hasTz: 'yes',
  description: '',
  website: '', // honeypot — must stay empty
})

const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

async function submitForm() {
  submitting.value = true
  submitError.value = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    submitted.value = true
    Object.assign(form, {
      name: '',
      email: '',
      budget: '',
      siteType: '',
      urgent: 'urgent',
      hasTz: 'yes',
      description: '',
      website: '',
    })
  } catch {
    submitError.value = 'contacts.submit_error'
  } finally {
    submitting.value = false
  }
}

const contactInfo = [
  { icon: '📍', labelKey: 'contacts.info_location', valueKey: 'contacts.info_location_val' },
  { icon: '⏰', labelKey: 'contacts.info_hours', valueKey: 'contacts.info_hours_val' },
  { icon: '💬', labelKey: 'contacts.info_reply', valueKey: 'contacts.info_reply_val' },
]

const titleRef = ref(null)
const formRef = ref(null)

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
  if (formRef.value) {
    gsap.fromTo(
      formRef.value,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 },
    )
  }
})
</script>

<style scoped>
.animate-marquee {
  animation: marquee 12s linear infinite;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
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
