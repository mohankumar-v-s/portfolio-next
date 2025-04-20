interface Project {
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

export const projects: Project[] = [
    {
        id: 1,
        title: "Ficodo – Clinical Management Software",
        description: "A comprehensive healthcare platform...",
        summary: "Ficodo is a full-featured clinic and healthcare management platform...",
        image: "/ficodo.png",
        tags: ["React", "Node.js", "MongoDB", "AWS"],
        liveUrl: "https://your-live-url.com",
        features: [
            {
                title: "Patient-Facing Booking System",
                description: "Public interface for patients to view doctors and book appointments."
            }
        ],
        contributions: ["Developed full booking workflow", "Integrated WhatsApp"],
        techStack: {
            Frontend: ["React", "Zustand"],
            Backend: ["Node.js", "MongoDB"]
        },
        challenges: "Implementing RBAC and multitenancy routing"
    },
    {
        id: 2,
        title: "FilmMyMl",
        description: "A TMDB-based movie listing app",
        summary: "Built with Next.js and Tailwind",
        image: "/filmyml.svg",
        tags: ["Next.js", "Tailwind", "TMDB"],
        liveUrl: "https://filmyml.vercel.app",
        githubUrl: "https://github.com/...",
        features: [
            {
                title: "Movie Listings",
                description: "Explore content via TMDB API"
            }
        ],
        contributions: ["Built UI", "Integrated TMDB API"],
        techStack: {
            Frontend: ["Next.js", "TailwindCSS"],
            APIs: ["TMDB API"]
        }
    }
]
