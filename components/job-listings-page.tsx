"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Job } from "@/lib/jobs-data"
import { cn } from "@/lib/utils"

type MaybeString = string | number | null | undefined

export default function JobListingsPage({ jobs }: { jobs: Job[] }) {
  const [q, setQ] = useState("")
  const [jobType, setJobType] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [experience, setExperience] = useState<string>("")
  const [minSalary, setMinSalary] = useState<string>("")
  const [maxSalary, setMaxSalary] = useState<string>("")

  const { types, locations, experiences } = useMemo(() => {
    const t = new Set<string>()
    const l = new Set<string>()
    const e = new Set<string>()
    for (const j of jobs) {
      const jt = toS(j.type)
      if (jt) t.add(jt)
      const jl = toS(j.location)
      if (jl) l.add(jl)
      const je = toS((j as any).experienceLevel) // tolerate missing field
      if (je) e.add(je)
    }
    return {
      types: Array.from(t).sort(),
      locations: Array.from(l).sort(),
      experiences: Array.from(e).sort(),
    }
  }, [jobs])

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase()
    return jobs.filter((j) => {
      const title = toS(j.title).toLowerCase()
      const company = toS(j.company).toLowerCase()
      const loc = toS(j.location).toLowerCase()

      const matchesQuery = ql.length === 0 || title.includes(ql) || company.includes(ql) || loc.includes(ql)
      const matchesType = !jobType || toS(j.type) === jobType
      const matchesLocation = !location || toS(j.location) === location
      const matchesExp = !experience || toS((j as any).experienceLevel) === experience

      const min = safeNumber(minSalary)
      const max = safeNumber(maxSalary)
      const salaryVal = normalizeSalary(j.salary)

      const matchesSalary =
        (min === null && max === null) ||
        (min !== null && max === null && salaryVal !== null && salaryVal >= min) ||
        (min === null && max !== null && salaryVal !== null && salaryVal <= max) ||
        (min !== null && max !== null && salaryVal !== null && salaryVal >= min && salaryVal <= max)

      return matchesQuery && matchesType && matchesLocation && matchesExp && matchesSalary
    })
  }, [jobs, q, jobType, location, experience, minSalary, maxSalary])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 md:flex-shrink-0 border rounded-lg p-4 md:p-5 bg-card text-card-foreground shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Job Type</label>
                <select
                  aria-label="Job Type"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <select
                  aria-label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <select
                  aria-label="Experience Level"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All</option>
                  {experiences.map((ex) => (
                    <option key={ex} value={ex}>
                      {ex}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Salary Range (min - max)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Min"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Minimum salary"
                  />
                  <span className="text-muted-foreground">—</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Max"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Maximum salary"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setJobType("")
                  setLocation("")
                  setExperience("")
                  setMinSalary("")
                  setMaxSalary("")
                }}
                className="mt-1 inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Clear filters
              </button>
            </div>
          </aside>

          {/* Main content */}
          <section className="mt-6 md:mt-0 flex-1">
            {/* Top search bar */}
            <div className="mb-6">
              <label htmlFor="job-search" className="sr-only">
                Search jobs
              </label>
              <input
                id="job-search"
                type="text"
                placeholder="Search by title, company, or location"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-md border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-2 text-xs text-muted-foreground">Live search. Case-insensitive.</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-pretty">Job Listings</h2>
              <span className="text-sm text-muted-foreground">
                {filtered.length} job{filtered.length === 1 ? "" : "s"}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">No jobs found</div>
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
                {filtered.map((job) => (
                  <li key={job.id}>
                    <JobCardModern job={job} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

function toS(v: MaybeString): string {
  return (v ?? "").toString()
}

function safeNumber(v: string): number | null {
  const trimmed = v.trim()
  if (!trimmed) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

// Convert various salary formats to a representative number (best effort)
function normalizeSalary(v: MaybeString): number | null {
  if (v == null) return null
  if (typeof v === "number" && Number.isFinite(v)) return v

  const s = v
    .toString()
    .toLowerCase()
    .replace(/[\s$,]/g, "")
  const rangeMatch = s.match(/(\d+(?:\.\d+)?k?)\s*-\s*(\d+(?:\.\d+)?k?)/)
  if (rangeMatch) {
    const a = parseK(rangeMatch[1])
    const b = parseK(rangeMatch[2])
    if (a !== null && b !== null) return Math.round((a + b) / 2)
  }
  const singleMatch = s.match(/(\d+(?:\.\d+)?k?)/)
  if (singleMatch) {
    const n = parseK(singleMatch[1])
    if (n !== null) return n
  }
  return null
}

function parseK(token: string): number | null {
  const hasK = token.endsWith("k")
  const raw = hasK ? token.slice(0, -1) : token
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return hasK ? Math.round(n * 1000) : n
}

function JobCardModern({ job }: { job: Job }) {
  const title = toS(job.title) || "Untitled role"
  const company = toS(job.company) || "Company"
  const location = toS(job.location) || "Location"
  const salary = toS(job.salary)
  const posted = toS((job as any).postedAt) || toS((job as any).postedDate) || ""
  const logo = (job as any).logoUrl as string | undefined

  return (
    <Link
      href={`/jobs/${job.id}`}
      className={cn(
        "block rounded-lg border bg-card text-card-foreground p-5 shadow-sm transition-all",
        "hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 flex items-center justify-center rounded-md border bg-background overflow-hidden">
          {logo ? (
            <Image
              src={logo || "/placeholder.svg?height=48&width=48&query=company logo square mark"}
              alt={`${company} logo`}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <span className="text-xs text-muted-foreground">Logo</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-pretty">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{company}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5 text-sm">
        <div className="text-muted-foreground">{location}</div>
        {salary && <div className="font-medium">{salary}</div>}
        {posted && <div className="text-muted-foreground">Posted {posted}</div>}
      </div>
    </Link>
  )
}

function SiteNav() {
  return (
    <header className="border-b bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          JobBoard
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link className="hover:underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/#jobs">
                Jobs
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/#companies">
                Companies
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/#about">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:opacity-90"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}
