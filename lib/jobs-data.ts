export type Job = {
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

export function getJobs(count = 60): Job[] {
  const titles = [
    "Software Engineer",
    "Marketing Intern",
    "Data Scientist",
    "UX Designer",
    "Product Manager",
    "DevOps Engineer",
    "Content Writer",
    "Sales Executive",
    "HR Manager",
    "Graphic Designer",
  ]
  const companies = [
    "TechNova Pvt. Ltd.",
    "Global Corp",
    "Data Insights",
    "Design Studio",
    "Innovate Inc.",
    "Cloud Solutions",
    "Content Hub",
    "SalesForce",
    "PeopleFirst",
    "Creative Minds",
  ]
  const locations = [
    "Bangalore, Remote",
    "New York",
    "Remote",
    "San Francisco",
    "London",
    "Mumbai",
    "Dallas",
    "Chicago",
    "Berlin",
    "Toronto",
  ]
  const salaries = [
    "₹6–8 LPA",
    "$60k–75k",
    "$100k–120k",
    "$80k–95k",
    "£70k–90k",
    "$90k–110k",
    "₹4–6 LPA",
    "$50k–70k",
    "$70k–85k",
    "$55k–70k",
  ]
  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"]
  const experienceLevels = ["0-1 year", "1-3 years", "2-4 years", "3-5 years", "5+ years"]
  const perks = [
    "Health Insurance",
    "Remote Work",
    "Flexible Hours",
    "Learning & Development",
    "Performance Bonus",
    "Paid Time Off",
    "Stock Options",
  ]
  const hrNames = [
    "Alice Smith",
    "Bob Johnson",
    "Charlie Brown",
    "Diana Prince",
    "Eve Adams",
    "Frank Green",
    "Grace Hopper",
    "Harry Potter",
    "Ivy Green",
    "Jack White",
  ]

  const today = new Date()

  const jobs: Job[] = Array.from({ length: count }, (_, idx) => {
    const i = idx + 1
    const t = titles[idx % titles.length]
    const c = companies[idx % companies.length]
    const loc = locations[idx % locations.length]
    const sal = salaries[idx % salaries.length]
    const jt = jobTypes[idx % jobTypes.length]
    const exp = experienceLevels[idx % experienceLevels.length]
    const hrName = hrNames[idx % hrNames.length]
    const posted = new Date(today)
    posted.setDate(today.getDate() - idx)
    const deadline = new Date(today)
    deadline.setDate(today.getDate() + 30 + (idx % 7))

    const format = (d: Date) => d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })

    return {
      id: String(i),
      title: `${t}`,
      company: c,
      location: loc,
      salary: sal,
      postedDate: format(posted),
      jobType: jt,
      shortDescription: `We’re hiring a ${t} to join ${c}. Work on impactful projects in a collaborative environment.`,
      applyLink: "#",
      fullDescription: `Join ${c} as a ${t}. You will collaborate with cross-functional teams, ship features, and help improve our ${t.toLowerCase()} workflows. We value curiosity, ownership, and clear communication.`,
      requiredSkills: [
        "Communication",
        "Problem Solving",
        "Team Collaboration",
        "Time Management",
        "Git",
        ...(t.includes("Engineer") || t.includes("DevOps")
          ? ["JavaScript", "TypeScript", "React", "Node.js", "CI/CD"]
          : t.includes("Data")
            ? ["Python", "SQL", "Machine Learning", "Data Visualization"]
            : t.includes("Designer")
              ? ["Figma", "Prototyping", "User Research"]
              : t.includes("Writer")
                ? ["Content Strategy", "SEO", "Editing"]
                : t.includes("Sales")
                  ? ["CRM", "Negotiation", "Prospecting"]
                  : t.includes("HR")
                    ? ["Recruitment", "Employee Relations", "HRIS"]
                    : t.includes("Marketing")
                      ? ["Social Media", "Copywriting", "Analytics"]
                      : []),
      ],
      experienceLevel: exp,
      educationRequirement: "Bachelor’s degree or equivalent practical experience",
      perksBenefits: perks.slice(0, 3 + (idx % 3)),
      applicationDeadline: format(deadline),
      hrRecruiterContact: { name: hrName, email: `${hrName.toLowerCase().replace(/\\s+/g, ".")}@example.com` },
    }
  })

  return jobs
}
