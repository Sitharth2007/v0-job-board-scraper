import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  salary: string
  postedDate: string
  jobType: string
  shortDescription: string
  applyLink: string
}

export function JobCard({ id, title, company, location, salary, postedDate, jobType, shortDescription }: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`} className="block h-full">
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {company} - {location}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-lg font-semibold mb-2">{salary}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {jobType} | Posted: {postedDate}
          </p>
          <p className="text-sm mb-4 line-clamp-3">{shortDescription}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
