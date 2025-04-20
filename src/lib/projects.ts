export interface Project {
    id: number
    title: string
    description: string
    summary: string
    image: string
    tags: string[]
    liveUrl: string
    githubUrl?: string
    features: { title: string; description: string }[]
    contributions: string[]
    techStack: Record<string, string[]>
    challenges?: string
}

const projectsData: Project[] = [
    {
        id: 1,
        title: "Ficodo – Clinical Management Software",
        description:
            "A comprehensive multitenant healthcare platform enabling appointment bookings, role-based dashboards, third-party integrations, and analytics.",
        summary:
            "Ficodo is a full-featured clinic and healthcare management platform tailored for patients, doctors, and clinic staff. It includes a patient-facing appointment booking system, role-specific dashboards, source analytics for bookings, and integrations with WhatsApp and Google My Business. The system is built to scale with custom branding for clinics and doctors, featuring a multitenant architecture.",
        image: "/ficodo.png",
        tags: ["React", "Node.js", "MongoDB", "AWS", "Google API", "WhatsApp API"],
        liveUrl: "https://your-live-url.com",
        features: [
            {
                title: "Patient-Facing Booking System",
                description: "Public interface for patients to view doctors, check availability, and book appointments for self or family members.",
            },
            {
                title: "Appointment Source Analytics",
                description: "Track appointment origins including website, Google search, GMB, ads, and social media.",
            },
            {
                title: "Role-Based Dashboards",
                description: "Dedicated dashboards for Admin, Doctor, Receptionist, Pharmacy, and Lab users.",
            },
            {
                title: "Third-Party Integrations",
                description: "Integrated WhatsApp and Google My Business APIs to enhance patient engagement and visibility.",
            },
            {
                title: "Authentication & Authorization",
                description: "Secure OTP-based login system, JWT authentication, and password reset flows.",
            },
            {
                title: "Cloud Infrastructure & CI/CD",
                description: "Managed deployments using GitHub Actions and handled cloud services across AWS, Digital Ocean, and Google Cloud.",
            },
        ],
        contributions: [
            "Developed the full appointment booking workflow with family support",
            "Implemented analytics for appointment source tracking",
            "Created and maintained role-specific dashboards",
            "Integrated WhatsApp messaging for post-booking communication",
            "Connected Google My Business to the internal system via APIs",
            "Built a background remover for doctor profile images",
            "Managed CI/CD pipelines and production deployments",
            "Worked on multitenancy to serve multiple clinics and doctor pages",
            "Handled database seeding and system environment setups",
            "Oversaw GitHub PR management and code merging processes",
        ],
        techStack: {
            Frontend: ["React", "Zustand", "Tailwind CSS", "React Router", "NextJS"],
            Backend: ["Node.js", "Express", "MongoDB", "Mongoose"],
            Integrations: ["Google My Business API", "WhatsApp Business API"],
            Cloud: ["AWS", "Google Cloud", "Digital Ocean"],
            DevOps: ["GitHub Actions", "Docker", "CI/CD Pipeline"],
            Auth: ["JWT", "OTP"],
        },
        challenges:
            `Implementing a robust role-based access control system was initially challenging due to the need to support multiple user roles (Admin, Doctor, Receptionist, Lab, Pharmacy) with separate dashboards and permissions. I built a middleware-based RBAC system to manage access and ensure clear separation of concerns.  
            The biggest architectural challenge was enabling multitenancy for clinics and doctor pages. I explored various strategies, read through many community blogs, and eventually adopted Vercel’s subdomain routing strategy using their domain management API. This allowed dynamic domain assignment per clinic/doctor, significantly simplifying the onboarding process and custom branding.`,
    },
    {
        id: 2,
        title: "FilmMyMl Project",
        description: "An integrated movie and TV show listing platform using TMDB, built with React, Next.js, and TailwindCSS.",
        summary:
            "FilmMyMl is a sleek OTT content listing platform that displays movies and series sourced from the TMDB API. Built using React and Next.js, it features dynamic routing, intuitive filtering, and responsive design with TailwindCSS. Users can explore trending titles, search for specific content, and view detailed pages for each film or show. It supports dynamic contribution-based expansion and offers a clean, scalable codebase ideal for future features like user ratings and watchlists.",
        image: "/flimyml.svg",
        tags: ["React", "Next.js", "TailwindCSS", "TMDB API"],
        liveUrl: "https://filmyml.vercel.app",
        githubUrl: "https://github.com/mohankumar-v-s/filmyml-next",
        features: [
            {
                title: "Movie & Series Listings",
                description: "Browse a curated list of movies and TV shows fetched from TMDB API.",
            },
            {
                title: "Content Details View",
                description: "Detailed information pages for each title, including release date, genres, synopsis, cast, and more.",
            },
            {
                title: "Browse By OTT",
                description: "Filter movies and series based on the OTT platform they are available on, such as Netflix, Amazon Prime, Disney+, and more. Users can view curated lists per platform for better discoverability.",
            },
            {
                title: "Responsive UI",
                description: "Optimized for mobile, tablet, and desktop using TailwindCSS with dynamic layouts and transitions.",
            },
            {
                title: "Contributions Dashboard",
                description: "Enable users or developers to contribute by submitting new content ideas or metadata corrections.",
            },
        ],
        contributions: [
            "Integrated TMDB API for dynamic movie and series content",
            "Implemented client-side routing and server-side rendering with Next.js",
            "Built responsive UI using TailwindCSS components",
            "Structured modular components for reusability and scalability",
            "Set up SEO-friendly routing and dynamic metadata for better discoverability",
        ],
        techStack: {
            Frontend: ["React", "Next.js", "TailwindCSS"],
            APIs: ["TMDB API"],
            "State Management": ["Zustand"],
            Deployment: ["Vercel", "GitHub"],
        },
        challenges:
            "A key challenge was optimizing API calls to TMDB while maintaining responsive load times. I used server-side rendering for initial content and client-side hydration for interactivity, along with caching strategies to minimize redundant fetches.",
    }

]

export function getAllProjects(): Project[] {
    return projectsData
}

export function getProjectById(id: number): Project | undefined {
    return projectsData.find((project) => project.id === id)
}
