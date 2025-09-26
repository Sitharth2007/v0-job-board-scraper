"use client"

import React from "react"
import { JobCard } from "@/components/job-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import type { Job } from "@/lib/jobs-data"

type Props = {
  allJobs: Job[]
  page: number
  perPage: number
}

export function SearchableJobList({ allJobs, page, perPage }: Props) {
  const [q, setQ] = React.useState("")

  const query = q.trim().toLowerCase()
  const isSearching = query.length > 0

  const filtered = React.useMemo(() => {
    if (!isSearching) return allJobs
    return allJobs.filter((job) => {
      const title = job.title.toLowerCase()
      const company = job.company.toLowerCase()
      const location = job.location.toLowerCase()
      return title.includes(query) || company.includes(query) || location.includes(query)
    })
  }, [allJobs, isSearching, query])

  // When not searching, use pagination; when searching, show all matches and hide pagination
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const start = (safePage - 1) * perPage
  const end = Math.min(start + perPage, total)
  const pageJobs = isSearching ? filtered : filtered.slice(start, end)

  const linkFor = (p: number) => `/?page=${p}&perPage=${perPage}`

  // windowed pagination: first, last, and window around current
  const windowSize = 1
  const pages = new Set<number>([1, totalPages])
  for (let p = safePage - windowSize; p <= safePage + windowSize; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p)
  }
  const pageList = Array.from(pages).sort((a, b) => a - b)

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="job-search" className="sr-only">
          Search jobs
        </label>
        <input
          id="job-search"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, company, or location..."
          className="w-full p-3 border rounded-md bg-background text-foreground"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageJobs.length > 0 ? (
          pageJobs.map((job) => <JobCard key={job.id} {...job} />)
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-muted-foreground">No jobs found</div>
        )}
      </div>

      {!isSearching && total > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={safePage > 1 ? linkFor(safePage - 1) : undefined}
                  aria-disabled={safePage <= 1}
                  className={safePage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pageList.map((p, idx) => {
                const prev = pageList[idx - 1]
                const needsEllipsis = prev !== undefined && p - prev > 1
                return (
                  <React.Fragment key={p}>
                    {needsEllipsis ? (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : null}
                    <PaginationItem>
                      <PaginationLink href={linkFor(p)} isActive={p === safePage}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  href={safePage < totalPages ? linkFor(safePage + 1) : undefined}
                  aria-disabled={safePage >= totalPages}
                  className={safePage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
