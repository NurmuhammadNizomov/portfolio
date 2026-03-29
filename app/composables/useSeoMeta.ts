export function usePageSeo(titleKey: string, descKey: string, path: string) {
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const url = `${config.public.siteUrl}${path}`

  useSeoMeta({
    title: () => t(titleKey),
    description: () => t(descKey),
    ogTitle: () => t(titleKey),
    ogDescription: () => t(descKey),
    ogType: 'website',
    ogUrl: url,
    ogImage: `${config.public.siteUrl}/og-image.png`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => t(titleKey),
    twitterDescription: () => t(descKey),
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}
