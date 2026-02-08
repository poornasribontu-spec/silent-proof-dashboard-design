"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { User, UserRole } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const DEMO_USERS: Array<User & { password: string }> = [
  { id: "1", name: "Dr. Sarah Chen", email: "admin@silentproof.io", password: "admin123", role: "admin" },
  { id: "2", name: "James Wilson", email: "invigilator@silentproof.io", password: "inv123", role: "invigilator" },
]

const STORAGE_KEY = "silentproof_user"
const USERS_KEY = "silentproof_users"

function getStoredUsers(): Array<User & { password: string }> {
  if (typeof window === "undefined") return DEMO_USERS
  try {
    const stored = localStorage.getItem(USERS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return [...DEMO_USERS, ...parsed]
    }
  } catch {}
  return DEMO_USERS
}

function saveCustomUser(user: User & { password: string }) {
  if (typeof window === "undefined") return
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const existing = stored ? JSON.parse(stored) : []
    existing.push(user)
    localStorage.setItem(USERS_KEY, JSON.stringify(existing))
  } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {}
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600))
    const allUsers = getStoredUsers()
    const found = allUsers.find((u) => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...userData } = found
      setUser(userData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      return true
    }
    return false
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600))
    const allUsers = getStoredUsers()
    if (allUsers.some((u) => u.email === email)) return false
    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
    }
    saveCustomUser(newUser)
    const { password: _, ...userData } = newUser
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
