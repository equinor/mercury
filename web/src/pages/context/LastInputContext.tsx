import { createContext, useContext, useState } from 'react'
import { Multiflash } from '../../api/generated'

const LastInputContext = createContext<
  | { lastInput: Multiflash; setLastInput: (input: Multiflash) => void }
  | undefined
>(undefined)

function LastInputProvider({ children }: { children: React.ReactNode }) {
  const initial = {
    componentComposition: {},
    temperature: 15,
    pressure: 1,
  }
  const [lastInput, setLastInput] = useState<Multiflash>(initial as Multiflash)

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
