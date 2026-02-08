"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { ClassroomConfig } from "@/lib/types"

interface ClassroomStoreType {
  classrooms: ClassroomConfig[]
  addClassroom: (classroom: ClassroomConfig) => void
  removeClassroom: (id: string) => void
  getClassroom: (id: string) => ClassroomConfig | undefined
}

const ClassroomStoreContext = createContext<ClassroomStoreType | null>(null)

const CLASSROOMS_KEY = "silentproof_classrooms"

export function ClassroomStoreProvider({ children }: { children: React.ReactNode }) {
  const [classrooms, setClassrooms] = useState<ClassroomConfig[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CLASSROOMS_KEY)
      if (stored) setClassrooms(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((updated: ClassroomConfig[]) => {
    setClassrooms(updated)
    localStorage.setItem(CLASSROOMS_KEY, JSON.stringify(updated))
  }, [])

  const addClassroom = useCallback((classroom: ClassroomConfig) => {
    setClassrooms((prev) => {
      const updated = [...prev, classroom]
      localStorage.setItem(CLASSROOMS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeClassroom = useCallback((id: string) => {
    setClassrooms((prev) => {
      const updated = prev.filter((c) => c.id !== id)
      localStorage.setItem(CLASSROOMS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getClassroom = useCallback((id: string) => {
    return classrooms.find((c) => c.id === id)
  }, [classrooms])

  return (
    <ClassroomStoreContext.Provider value={{ classrooms, addClassroom, removeClassroom, getClassroom }}>
      {children}
    </ClassroomStoreContext.Provider>
  )
}

export function useClassroomStore() {
  const ctx = useContext(ClassroomStoreContext)
  if (!ctx) throw new Error("useClassroomStore must be used within ClassroomStoreProvider")
  return ctx
}
