"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SilentProofLogo } from "@/components/silent-proof-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, LogIn, UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { UserRole } from "@/lib/types"

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("invigilator")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isSignup) {
        if (!name.trim()) { setError("Name is required"); setLoading(false); return }
        const ok = await signup(name, email, password, role)
        if (!ok) { setError("Email already in use"); setLoading(false); return }
      } else {
        const ok = await login(email, password)
        if (!ok) { setError("Invalid email or password"); setLoading(false); return }
      }
      router.push("/dashboard")
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(217 91% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-3">
            <SilentProofLogo size={48} />
            <span className="text-xl font-bold text-foreground">SilentProof</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            {isSignup ? "Create your monitoring account" : "Sign in to your monitoring dashboard"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-border/50 bg-card p-8">
          {/* Toggle tabs */}
          <div className="flex items-center gap-1 mb-6 p-1 rounded-xl bg-secondary/50">
            <button
              onClick={() => { setIsSignup(false); setError("") }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                !isSignup ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
            <button
              onClick={() => { setIsSignup(true); setError("") }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isSignup ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignup && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  className="h-11 rounded-xl bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                required
                className="h-11 rounded-xl bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-11 rounded-xl bg-secondary/50 border-border/50 pr-10 text-foreground placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">Role</Label>
                <div className="flex items-center gap-2">
                  {(["admin", "invigilator"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                        role === r
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-secondary/30 border-border/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r === "admin" ? <Shield className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="capitalize">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {isSignup ? "Creating account..." : "Signing in..."}
                </span>
              ) : (
                isSignup ? "Create Account" : "Sign In"
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          {!isSignup && (
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs font-medium text-primary mb-2">Demo Credentials</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Admin:</span>
                  <code className="text-[11px] font-mono text-foreground/80">admin@silentproof.io / admin123</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Invigilator:</span>
                  <code className="text-[11px] font-mono text-foreground/80">invigilator@silentproof.io / inv123</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
