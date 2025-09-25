import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface JobDetailProps {
  id: string
  title: string
  company: string
  location: string
  salary: string
  postedDate: string
  jobType: string
  shortDescription: string
  applyLink: string
  fullDescription: string
  requiredSkills: string[]
  experienceLevel: string
  educationRequirement: string
  perksBenefits: string[]
  applicationDeadline: string
  hrRecruiterContact: { name: string; email: string }
}

export function JobDetail({
  title,
  company,
  location,
  salary,
  postedDate,
  jobType,
  applyLink,
  fullDescription,
  requiredSkills,
  experienceLevel,
  educationRequirement,
  perksBenefits,
  applicationDeadline,
  hrRecruiterContact,
}: JobDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <div className="text-lg text-muted-foreground">
          {company} - {location}
        </div>
        <div className="text-md text-muted-foreground">
          {jobType} | Posted: {postedDate}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-2xl font-bold">{salary}</p>

        <div>
          <h3 className="text-xl font-semibold mb-2">Job Description</h3>
          <p className="text-base leading-relaxed">{fullDescription}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
          <ul className="list-disc list-inside space-y-1">
            {requiredSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Experience Level</h3>
          <p className="text-base">{experienceLevel}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Education Requirement</h3>
          <p className="text-base">{educationRequirement}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Perks & Benefits</h3>
          <ul className="list-disc list-inside space-y-1">
            {perksBenefits.map((perk, index) => (
              <li key={index}>{perk}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Application Details</h3>
          <p className="text-base">
            Application Deadline: <span className="font-medium">{applicationDeadline}</span>
          </p>
          <p className="text-base">
            Contact HR: <span className="font-medium">{hrRecruiterContact.name}</span> (
            <a href={`mailto:${hrRecruiterContact.email}`} className="text-blue-600 hover:underline">
              {hrRecruiterContact.email}
            </a>
            )
          </p>
        </div>

        <Link href={applyLink} target="_blank" rel="noopener noreferrer">
          <Button className="w-full py-3 text-lg">Apply Now</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
