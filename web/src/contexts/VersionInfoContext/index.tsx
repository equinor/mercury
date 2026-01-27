import axios, { type AxiosResponse } from 'axios'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Maybe } from '../../common/types'
import type { CommitInfo } from './types'

const VersionInfoContext =
  createContext<Maybe<{ commitInfo: CommitInfo }>>(undefined)

export function VersionInfoProvider({
  children,
}: {
  children: React.ReactNode
}) {
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

    axios.get('version.txt').then((res: AxiosResponse<string>) => {
      const entries = res.data
        .split('\n')
        .filter((line) => line.includes(': '))
        .map((line) => line.split(': '))
      setCommitInfo(Object.fromEntries(entries) as CommitInfo)
    })
  }, [])

  // Memoize the context value
  const contextValue = useMemo(() => ({ commitInfo }), [commitInfo])

  return (
    <VersionInfoContext.Provider value={contextValue}>
      {children}
    </VersionInfoContext.Provider>
  )
}

export function useVersionInfoContext() {
  const context = useContext(VersionInfoContext)
  if (!context) {
    throw new Error(
      'useVersionInfoContext must be used within a VersionInfoProvider'
    )
  }
  return context
}
