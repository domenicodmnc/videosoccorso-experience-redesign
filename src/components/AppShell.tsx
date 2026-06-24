import type { ReactNode } from 'react'
import { DemoBanner } from './DemoBanner'
import { Header } from './Header'

export function AppShell({ children, currentPath }: { children: ReactNode; currentPath: string }) {
  return <div className="min-h-screen"><DemoBanner /><Header currentPath={currentPath} /><main>{children}</main></div>
}
