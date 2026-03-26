// In-memory rate limiter: max 3 requests per IP per 10 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()

  // Remove expired entries to prevent unbounded memory growth
  for (const [key, val] of rateMap) {
    if (now > val.resetAt) rateMap.delete(key)
  }

  const entry = rateMap.get(ip)

  if (!entry) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  entry.count++
  return true
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Honeypot: bots fill this hidden field, humans don't
  if (body.website) {
    return { ok: true }
  }

  // Rate limit by IP
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, message: 'Too many requests. Please wait a few minutes.' })
  }

  const { name, email, budget, siteType, urgent, hasTz, description } = body

  if (!name || !email || !budget || !siteType) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const lines = [
    '📩 *New order from portfolio*',
    `👤 Name: ${name}`,
    `📧 Email: ${email}`,
    `💰 Budget: ${budget}`,
    `🌐 Site type: ${siteType}`,
    `⚡ Urgent: ${urgent === 'urgent' ? 'Yes' : 'No'}`,
    `📋 Has TZ: ${hasTz === 'yes' ? 'Yes' : 'No'}`,
    description ? `📝 Description:\n${description}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
    method: 'POST',
    body: {
      chat_id: config.telegramChatId,
      text: lines,
      parse_mode: 'Markdown',
    },
  })

  return { ok: true }
})
