import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function githubPagesBase() {
  const runtime = globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }
  const repositoryName = runtime.process?.env?.GITHUB_REPOSITORY?.split('/').pop()
  return repositoryName ? `/${repositoryName}/` : '/'
}

export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? githubPagesBase() : '/',
  plugins: [react()],
}))
