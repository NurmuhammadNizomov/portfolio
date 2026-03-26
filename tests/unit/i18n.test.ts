import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '../../i18n/locales')

function load(lang: string): Record<string, unknown> {
  return JSON.parse(readFileSync(resolve(root, `${lang}.json`), 'utf-8'))
}

function flatKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    return typeof v === 'object' && v !== null ? flatKeys(v as Record<string, unknown>, key) : [key]
  })
}

const en = load('en')
const ru = load('ru')
const uz = load('uz')

const enKeys = flatKeys(en)
const ruKeys = flatKeys(ru)
const uzKeys = flatKeys(uz)

describe('i18n completeness', () => {
  it('ru has all keys from en', () => {
    const missing = enKeys.filter((k) => !ruKeys.includes(k))
    expect(missing, `Missing in ru: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('uz has all keys from en', () => {
    const missing = enKeys.filter((k) => !uzKeys.includes(k))
    expect(missing, `Missing in uz: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('ru has no extra keys vs en', () => {
    const extra = ruKeys.filter((k) => !enKeys.includes(k))
    expect(extra, `Extra in ru: ${extra.join(', ')}`).toHaveLength(0)
  })

  it('uz has no extra keys vs en', () => {
    const extra = uzKeys.filter((k) => !enKeys.includes(k))
    expect(extra, `Extra in uz: ${extra.join(', ')}`).toHaveLength(0)
  })

  it('all locales have required sections', () => {
    const sections = [
      'nav',
      'footer',
      'home',
      'portfolio',
      'technologies',
      'about',
      'contacts',
      'seo',
    ]
    for (const s of sections) {
      expect(en).toHaveProperty(s)
      expect(ru).toHaveProperty(s)
      expect(uz).toHaveProperty(s)
    }
  })

  it('no empty string values in any locale', () => {
    function check(obj: Record<string, unknown>, lang: string, prefix = '') {
      for (const [k, v] of Object.entries(obj)) {
        const key = prefix ? `${prefix}.${k}` : k
        if (typeof v === 'object' && v !== null) {
          check(v as Record<string, unknown>, lang, key)
        } else {
          expect(v, `${lang}: empty at "${key}"`).not.toBe('')
        }
      }
    }
    check(en, 'en')
    check(ru, 'ru')
    check(uz, 'uz')
  })

  it('SEO title and desc exist for all pages in all locales', () => {
    const pages = ['home', 'portfolio', 'technologies', 'about', 'contacts']
    for (const page of pages) {
      for (const [lang, locale] of [
        ['en', en],
        ['ru', ru],
        ['uz', uz],
      ] as const) {
        const seo = (locale as Record<string, Record<string, string>>).seo
        expect(seo, `${lang}: missing seo.${page}_title`).toHaveProperty(`${page}_title`)
        expect(seo, `${lang}: missing seo.${page}_desc`).toHaveProperty(`${page}_desc`)
      }
    }
  })
})
