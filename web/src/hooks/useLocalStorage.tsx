import { useState } from 'react'

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  version: number
): [T, (v: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    const item = window.localStorage.getItem(key)
    if (item === null) return initialValue

    const parsed = (() => {
      try {
        return JSON.parse(item)
      } catch {
        return null
      }
    })()
    if (parsed === null) return initialValue

    if (
      typeof parsed === 'object' &&
      'version' in parsed &&
      'data' in parsed &&
      parsed.version === version
    ) {
      return parsed.data
    } else {
      throw TypeError(
        `The type of stored value "${key}" is outdated. Please reset the application data`
      )
    }
  })

  const setValue = (value: T | ((val: T) => T)): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          key,
          JSON.stringify({ version: version, data: valueToStore })
        )
      }
    } catch (error) {
      console.log(`Failed to store value '${value}' for key '${key}'`)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
