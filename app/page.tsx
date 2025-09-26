import { getJobs } from "@/lib/jobs-data"
import JobListingsPage from "@/components/job-listings-page"

type Search = { page?: string; perPage?: string }

export default function HomePage({ searchParams }: { searchParams: Search }) {
  const allJobs = getJobs(60)

  return <JobListingsPage jobs={allJobs} />
}
