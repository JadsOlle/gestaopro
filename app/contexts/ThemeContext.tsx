'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeContextType = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Carregar preferência salva
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newValue = !isDarkMode
    setIsDarkMode(newValue)
    localStorage.setItem('darkMode', String(newValue))
    
    if (newValue) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

