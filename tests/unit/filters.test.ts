import { describe, it, expect } from 'vitest'

const projects = [
  { id: 1, category: 'website', title: 'Aura Sphere' },
  { id: 2, category: 'website', title: 'Eagletrans' },
  { id: 3, category: 'shop', title: 'Stefanel' },
  { id: 4, category: 'landing', title: 'CryptoVault' },
  { id: 5, category: 'shop', title: 'AutoParts Pro' },
  { id: 6, category: 'website', title: 'MedClinic' },
  { id: 7, category: 'landing', title: 'FitLife' },
  { id: 8, category: 'shop', title: 'TechStore' },
  { id: 9, category: 'dashboard', title: 'AdminFlow' },
  { id: 10, category: 'mobile', title: 'DeliverApp' },
  { id: 11, category: 'landing', title: 'SaaS Pro' },
  { id: 12, category: 'mobile', title: 'HealthTrack' },
]

const technologies = [
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Sass', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Webpack', category: 'frontend' },
  { name: 'Gulp', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Nuxt.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'NestJS', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MySQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'React Native', category: 'mobile' },
  { name: 'Ionic', category: 'mobile' },
  { name: 'Git', category: 'devops' },
  { name: 'Docker', category: 'devops' },
]

function filterProjects(category: string) {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

function filterTech(category: string) {
  if (category === 'all') return technologies
  return technologies.filter((t) => t.category === category)
}

describe('Portfolio filter', () => {
  it('returns all 12 projects for "all"', () => {
    expect(filterProjects('all')).toHaveLength(12)
  })

  it('filters landing — 3 items', () => {
    const r = filterProjects('landing')
    expect(r).toHaveLength(3)
    expect(r.every((p) => p.category === 'landing')).toBe(true)
  })

  it('filters shop — 3 items', () => {
    expect(filterProjects('shop')).toHaveLength(3)
  })

  it('filters dashboard — 1 item (AdminFlow)', () => {
    const r = filterProjects('dashboard')
    expect(r).toHaveLength(1)
    expect(r[0].title).toBe('AdminFlow')
  })

  it('filters mobile — 2 items', () => {
    const r = filterProjects('mobile')
    expect(r).toHaveLength(2)
    expect(r.map((p) => p.title)).toContain('DeliverApp')
    expect(r.map((p) => p.title)).toContain('HealthTrack')
  })

  it('unknown category returns empty', () => {
    expect(filterProjects('unknown')).toHaveLength(0)
  })

  it('all projects have id, category, title', () => {
    projects.forEach((p) => {
      expect(p.id).toBeDefined()
      expect(p.category).toBeTruthy()
      expect(p.title).toBeTruthy()
    })
  })
})

describe('Technologies filter', () => {
  it('returns all 24 techs for "all"', () => {
    expect(filterTech('all')).toHaveLength(24)
  })

  it('frontend — 13 items', () => {
    expect(filterTech('frontend')).toHaveLength(13)
  })

  it('backend — 7 items', () => {
    expect(filterTech('backend')).toHaveLength(7)
  })

  it('mobile — React Native and Ionic', () => {
    const r = filterTech('mobile')
    expect(r).toHaveLength(2)
    expect(r.map((t) => t.name)).toEqual(['React Native', 'Ionic'])
  })

  it('devops — Git then Docker', () => {
    const r = filterTech('devops')
    expect(r).toHaveLength(2)
    expect(r.map((t) => t.name)).toEqual(['Git', 'Docker'])
  })

  it('frontend order: HTML before Vue.js before Nuxt.js', () => {
    const names = filterTech('frontend').map((t) => t.name)
    expect(names.indexOf('HTML')).toBeLessThan(names.indexOf('Vue.js'))
    expect(names.indexOf('Vue.js')).toBeLessThan(names.indexOf('Nuxt.js'))
  })
})
