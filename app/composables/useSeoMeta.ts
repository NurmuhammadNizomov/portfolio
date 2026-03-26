export function usePageSeo(titleKey: string, descKey: string, path: string) {
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const url = `${config.public.siteUrl}${path}`

  useHead({
    title: () => t(titleKey),
    meta: [
      { name: 'description', content: () => t(descKey) },
      { property: 'og:title', content: () => t(titleKey) },
      { property: 'og:description', content: () => t(descKey) },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: `${config.public.siteUrl}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => t(titleKey) },
      { name: 'twitter:description', content: () => t(descKey) },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
