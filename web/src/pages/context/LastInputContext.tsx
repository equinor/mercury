import { createContext, useContext, useState } from 'react'
import { Multiflash } from '../../api/generated'
import { TLastInput } from '../../types'

const LastInputContext = createContext<
  | { lastInput: Multiflash; setLastInput: (input: TLastInput) => void }
  | undefined
>(undefined)

function LastInputProvider({ children }: { children: React.ReactNode }) {
  const initial = {
    componentComposition: {},
    temperature: 15,
    pressure: 1,
    cubicFeedFlow: 1000,
  }
  const [lastInput, setLastInput] = useState<TLastInput>(initial as TLastInput)

  return (
    <LastInputContext.Provider value={{ lastInput, setLastInput }}>
      {children}
    </LastInputContext.Provider>
  )
}

function useLastInputContext() {
  const context = useContext(LastInputContext)
  if (context === undefined) {
    throw new Error(
      'useLastInputContext must be used within a LastInputProvider'
    )
  }
  return context
}

export { useLastInputContext, LastInputProvider, LastInputContext }
