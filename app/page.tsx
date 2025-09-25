import Link from "next/link"
import { JobCard } from "@/components/job-card"

// Placeholder data for job listings
const jobListings = [
  {
    id: "1",
    title: "Software Engineer",
    company: "TechNova Pvt. Ltd.",
    location: "Bangalore, Remote",
    salary: "₹6–8 LPA",
    postedDate: "23 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Looking for a full-stack developer with React + Node.js…",
    applyLink: "#",
  },
  {
    id: "2",
    title: "Marketing Intern",
    company: "Global Corp",
    location: "New York",
    salary: "$60k–75k",
    postedDate: "22 Sept 2025",
    jobType: "Internship",
    shortDescription: "Seeking a creative marketing intern to assist with campaigns.",
    applyLink: "#",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Data Insights",
    location: "Remote",
    salary: "$100k–120k",
    postedDate: "21 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Experienced data scientist for advanced analytics projects.",
    applyLink: "#",
  },
  {
    id: "4",
    title: "UX Designer",
    company: "Design Studio",
    location: "San Francisco",
    salary: "$80k–95k",
    postedDate: "20 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Passionate UX designer to create intuitive user experiences.",
    applyLink: "#",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "Innovate Inc.",
    location: "London",
    salary: "£70k–90k",
    postedDate: "19 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Lead product development for our next-gen platform.",
    applyLink: "#",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "Cloud Solutions",
    location: "Remote",
    salary: "$90k–110k",
    postedDate: "18 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Build and maintain scalable infrastructure.",
    applyLink: "#",
  },
  {
    id: "7",
    title: "Content Writer",
    company: "Content Hub",
    location: "Mumbai",
    salary: "₹4–6 LPA",
    postedDate: "17 Sept 2025",
    jobType: "Contract",
    shortDescription: "Create engaging content for various platforms.",
    applyLink: "#",
  },
  {
    id: "8",
    title: "Sales Executive",
    company: "SalesForce",
    location: "Dallas",
    salary: "$50k–70k",
    postedDate: "16 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Drive sales and expand customer base.",
    applyLink: "#",
  },
  {
    id: "9",
    title: "HR Manager",
    company: "PeopleFirst",
    location: "Chicago",
    salary: "$70k–85k",
    postedDate: "15 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Manage human resources operations and talent acquisition.",
    applyLink: "#",
  },
  {
    id: "10",
    title: "Graphic Designer",
    company: "Creative Minds",
    location: "Remote",
    salary: "$55k–70k",
    postedDate: "14 Sept 2025",
    jobType: "Full-Time",
    shortDescription: "Design visually appealing graphics for marketing materials.",
    applyLink: "#",
  },
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobListings.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <Link href="#" className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            {"<"} Previous
          </Link>
          <Link href="#" className="px-4 py-2 border rounded-md bg-primary text-primary-foreground">
            1
          </Link>
          <Link href="#" className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            2
          </Link>
          <Link href="#" className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            3
          </Link>
          <Link href="#" className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Next {">"}
          </Link>
        </nav>
      </div>
    </div>
  )
}
