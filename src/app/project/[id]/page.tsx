import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { getProjectById } from "@/lib/projects"

export default function ProjectPage({ params }: { params: { id: string } }) {
    const project = getProjectById(Number.parseInt(params.id))

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white pt-20 pb-16">
            <div className="container mx-auto px-4">
                {/* Back button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
                >
                    <ArrowLeft size={16} /> Back to Portfolio
                </Link>

                {/* Project header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{project.title}</h1>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 mb-8">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            <ExternalLink size={16} /> View Live Demo
                        </a>
                        {project.githubUrl && <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-200 text-black px-4 py-2 rounded-md transition-colors"
                        >
                            <Github size={16} /> View Code
                        </a>}
                    </div>

                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Project content */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Project Summary */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Summary</h2>
                            <div className="prose max-w-none text-gray-600">
                                <p>{project.summary}</p>
                            </div>
                        </section>

                        {/* Key Features */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                            <ul className="space-y-4">
                                {project.features.map((feature, index) => (
                                    <li key={index} className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Key Contributions */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Contributions</h2>
                            <ul className="space-y-2 list-disc text-gray-600 pl-3">
                                {project.contributions.map((contribution, index) => (
                                    <li key={index}>{contribution}</li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div>
                        {/* Tech Stack */}
                        <section className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Tech Stack</h2>

                            {Object.entries(project.techStack).map(([category, technologies]) => (
                                <div key={category} className="mb-4 last:mb-0">
                                    <h3 className="font-medium text-gray-800 mb-2">{category}</h3>
                                    <div className="flex flex-wrap gap-2 cursor-pointer">
                                        {technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-white text-gray-800 px-3 py-1 rounded-md text-sm border border-gray-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {project.challenges && (
                                <>
                                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Challenges</h2>
                                    <p className="text-gray-600">{project.challenges}</p>
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
