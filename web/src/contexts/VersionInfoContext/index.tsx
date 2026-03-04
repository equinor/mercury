import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Maybe } from '../../common/types'
import type { CommitInfo } from './types'

const VersionInfoContext = createContext<Maybe<{ commitInfo: CommitInfo }>>(undefined)

export function VersionInfoProvider({ children }: { children: React.ReactNode }) {
  const [commitInfo, setCommitInfo] = useState<CommitInfo>({
    hash: '',
    date: '',
    refs: '',
  })

  useEffect(() => {
    // placeholder values for local dev
    if (import.meta.env.DEV || window.location.hostname === 'localhost') {
      setCommitInfo({
        hash: '',
        date: new Date().toISOString().split('T')[0],
        refs: 'local dev',
      })
      return
    }

    fetch('version.txt')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch version.txt: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const entries = text
          .split('\n')
          .filter((line: string) => line.includes(': '))
          .map((line: string) => line.split(': '))
        if (entries.length > 0) {
          setCommitInfo(Object.fromEntries(entries) as CommitInfo)
        }
      })
      .catch(() => {
        // Keep default commitInfo on failure
      })
  }, [])

  // Memoize the context value
  const contextValue = useMemo(() => ({ commitInfo }), [commitInfo])

  return <VersionInfoContext.Provider value={contextValue}>{children}</VersionInfoContext.Provider>
}

export function useVersionInfoContext() {
  const context = useContext(VersionInfoContext)
  if (!context) {
    throw new Error('useVersionInfoContext must be used within a VersionInfoProvider')
  }
  return context
}
