import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Read the actual source files — tests break if someone changes the data incorrectly
const portfolioSource = readFileSync(resolve(__dirname, '../../app/pages/portfolio.vue'), 'utf-8')
const techSource = readFileSync(resolve(__dirname, '../../app/pages/technologies.vue'), 'utf-8')
const enLocale = JSON.parse(readFileSync(resolve(__dirname, '../../i18n/locales/en.json'), 'utf-8'))

// Extract all descKey/fullKey values referenced in portfolio.vue
const portfolioDescKeys = [...portfolioSource.matchAll(/descKey:\s*'(portfolio\.p\d+_desc)'/g)].map(
  (m) => m[1],
)
const portfolioFullKeys = [...portfolioSource.matchAll(/fullKey:\s*'(portfolio\.p\d+_full)'/g)].map(
  (m) => m[1],
)

// Extract all descKey values referenced in technologies.vue
const techDescKeys = [...techSource.matchAll(/descKey:\s*'(technologies\.\w+_desc)'/g)].map(
  (m) => m[1],
)

// Extract all typeKey values
const typeKeys = [...portfolioSource.matchAll(/typeKey:\s*'(portfolio\.type_\w+)'/g)].map(
  (m) => m[1],
)

// Extract category values from portfolio.vue
const portfolioCategories = [...portfolioSource.matchAll(/category:\s*'(\w+)'/g)].map((m) => m[1])

describe('portfolio.vue → en.json', () => {
  it('every descKey used in portfolio.vue exists in en.json', () => {
    portfolioDescKeys.forEach((key) => {
      const [, subKey] = key.split('portfolio.')
      expect(enLocale.portfolio, `Missing en.json key: portfolio.${subKey}`).toHaveProperty(subKey)
    })
  })

  it('every fullKey used in portfolio.vue exists in en.json', () => {
    portfolioFullKeys.forEach((key) => {
      const [, subKey] = key.split('portfolio.')
      expect(enLocale.portfolio, `Missing en.json key: portfolio.${subKey}`).toHaveProperty(subKey)
    })
  })

  it('every typeKey used in portfolio.vue exists in en.json', () => {
    const uniqueTypeKeys = [...new Set(typeKeys)]
    uniqueTypeKeys.forEach((key) => {
      const [, subKey] = key.split('portfolio.')
      expect(enLocale.portfolio, `Missing en.json key: portfolio.${subKey}`).toHaveProperty(subKey)
    })
  })

  it('portfolio has exactly 12 projects (p1_desc through p12_desc)', () => {
    expect(portfolioDescKeys).toHaveLength(12)
  })

  it('portfolio category values are all valid', () => {
    const valid = ['landing', 'shop', 'dashboard', 'mobile', 'website']
    const invalid = portfolioCategories.filter((c) => !valid.includes(c))
    expect(invalid, `Invalid categories found: ${invalid.join(', ')}`).toHaveLength(0)
  })
})

describe('technologies.vue → en.json', () => {
  it('every descKey used in technologies.vue exists in en.json', () => {
    techDescKeys.forEach((key) => {
      const [, subKey] = key.split('technologies.')
      expect(enLocale.technologies, `Missing en.json key: technologies.${subKey}`).toHaveProperty(
        subKey,
      )
    })
  })

  it('technologies.vue has exactly 24 tech items', () => {
    expect(techDescKeys).toHaveLength(24)
  })

  it('all tech categories in the source are valid', () => {
    const techCategories = [
      ...techSource.matchAll(/category:\s*'(frontend|backend|mobile|devops)'/g),
    ].map((m) => m[1])
    const valid = ['frontend', 'backend', 'mobile', 'devops']
    techCategories.forEach((c) => {
      expect(valid).toContain(c)
    })
  })
})
