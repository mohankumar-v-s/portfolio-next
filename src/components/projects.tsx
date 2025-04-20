import { ExternalLink, Github, ReceiptText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const projects = [
    {
        id: 1,
        title: "Ficodo - Clinic Management Software",
        description:
            `Ficodo is a cloud-based clinic management system built on the MERN stack with a Next.js frontend. The platform is designed to streamline operations for healthcare providers by offering seamless tools for clinic and doctor data management, online appointment booking, and real-time analytics.`,
        image: "/ficodo.png",
        tags: ["React", "Node.js", "MongoDB", "NextJs", "AWS", "WhatsApp", "AWS End User Messaging"],
        liveUrl: "https://ficodo.com",
        detailUrl: '/project/1'
    },
    {
        id: 2,
        title: "FilmMyMl Project",
        description: `A fully responsive media discovery platform powered by TMDB API, built with React 19, Next.js 15 (App Router), and TailwindCSS.
This project explores cutting-edge features like React Server Components and the Next.js App Directory, providing fast, seamless navigation and optimized data fetching. Users can browse trending movies, explore TV shows, and view detailed media info in a clean, modern UI.`,
        image: "/flimyml.svg",
        tags: ["NextJS", "React", "Tailwind CSS", "Zustand", "Vercel"],
        liveUrl: "https://filmyml.vercel.app",
        githubUrl: "https://github.com/mohankumar-v-s/filmyml-next",
        detailUrl: '/project/2'
    },
]

export default function Projects() {
    return (
        <section id="projects" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Projects Worked On</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Here are some of the projects I&apos;ve worked on. Each project represents different skills and technologies I&apos;ve
                        mastered.
                    </p>
                </div>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-48 cursor-pointer">
                                <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                                        >
                                            <Github size={16} /> Code
                                        </a>
                                    )}
                                    <Link className="text-blue-500 flex items-center gap-1" href={project.detailUrl}>
                                        <ReceiptText size={16} />Details Page
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
