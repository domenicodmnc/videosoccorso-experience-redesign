const baseUrl = import.meta.env.BASE_URL
const usesHashRouting = baseUrl !== '/'

function normalizePath(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized.replace(/\/$/, '') || '/'
}

export function getCurrentPath() {
  if (usesHashRouting) return normalizePath(window.location.hash.slice(1) || '/')
  return normalizePath(window.location.pathname)
}

export function toAppUrl(path: string) {
  const normalized = normalizePath(path)
  return usesHashRouting ? `${baseUrl}#${normalized}` : normalized
}

export function navigate(path: string) {
  const target = toAppUrl(path)
  window.history.pushState({}, '', target)
  window.dispatchEvent(new Event('app:navigate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
